import Dispatcher from '../events/dispatcher'
import StateUnion from '../unions/state'
import Handler from '../events/handler'

export default class Mart extends Dispatcher {
	constructor (union, mapFn) {
		super()
		this.union = union
		this.mapFn = typeof mapFn === 'function' ? mapFn : (x) => x

		this.start()
	}

	start () {
		this.recalc()
		this.handler = new Handler(this)

		const instances = StateUnion.flat(this.union)
		this.transactionLevel = Math.max(0, ...instances.map(({ transactionLevel }) => transactionLevel || 0)) + 1

		instances.forEach((instance) => {
			if (typeof instance.on !== 'function') {
				return
			}

			instance.on(this.handler)
		})
	}

	end () {
		const instances = StateUnion.flat(this.union)

		instances.forEach((instance) => {
			if (typeof instance.unsubscribe !== 'function') {
				return
			}

			instance.unsubscribe(this.handler)
		})
		this.handler = null
	}

	recalc = () => {
		const newValue = this.mapFn(StateUnion.map(this.union, ({ value }) => value))
		const args = [ newValue, this.value, this ]
		this.value = newValue

		this.notify(...args)
	}

	shadow (shadows = new Map()) {
		if (shadows.has(this)) {
			return shadows.get(this)
		}

		const result = new Mart()
		shadows.set(this, result)

		result.union = StateUnion.shadow(this.union, shadows)
		result.mapFn = this.mapFn
		result.start()

		return result
	}
}

StateUnion.registerClass(Mart)