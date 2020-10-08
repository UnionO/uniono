import Mart from '../mart';
import StateUnion from '../unions/state'
import TransactionPlan from './plan'

export default class Transaction {
	constructor (union, fn) {
		this.mart = new Mart(union)
		this.fn = fn

		this.plan = new TransactionPlan(union)
	}

	execute = (...args) => {
		const shadow = this.mart.shadow()
		const env = {
			transaction: this,
			value: () => shadow.value,
			mutations: StateUnion.map(shadow.union, ({ mutations }) => mutations),
			apply: () => this.transactionApply(shadow),
			cancel: () => this.transactionCancel(shadow)
		}

		try {
			const result = this.fn(env, ...args)
			if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
				return result
					.then(() => this.transactionApply(shadow))
					.catch((e) => {
						this.transactionCancel(shadow)
						throw e
					})
			}

			this.transactionApply(shadow)
			return result
		} catch (e) {
			this.transactionCancel(shadow)
			throw e
		}
	}
	value = this.execute
	mutations = this.execute

	transactionApply (shadow) {
		const changed = []
		this.plan.setInterceptor(() => {})
		StateUnion.flat(shadow.union).forEach((instance) => {
			if (!(typeof instance.apply === 'function')) {
				return
			}

			if (instance.isChanged && instance.parent) {
				changed.push(instance.parent)
			}

			instance.apply()
		})
		
		this.plan.recalc(changed)
		this.plan.setInterceptor(null)
	}

	transactionCancel (shadow) {
		StateUnion.flat(shadow.union).forEach((instance) => {
			if (!(typeof instance.cancel === 'function')) {
				return
			}

			instance.cancel()
		})
	}

	use (fn) {
		this.fn = fn
	}

	shadow (shadows = new Map()) {
		if (shadows.has(this)) {
			return shadows.get(this)
		}

		const result = new Transaction()
		shadows.set(this, result)

		result.mart = StateUnion.shadow(this.mart, shadows)
		result.fn = this.fn
		result.plan = new TransactionPlan(result.mart.union)

		return result
	}
}

StateUnion.registerClass(Transaction)