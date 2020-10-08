import Dispatcher from '../events/dispatcher'
import StateUnion from '../unions/state'
import StoreMutations from './mutations'

export default class Store extends Dispatcher {
	constructor (value, MutationsClass = StoreMutations) {
		super()

		this.value = value
		this.MutationsClass = MutationsClass
		this.mutations = new MutationsClass(this)
		this.transactionLevel = 0
	}

	shadow (shadows = new Map()) {
		if (shadows.has(this)) {
			return shadows.get(this)
		}
		
		return new ShadowStore(this)
	}

	recalc () {
		this.notify(this.value, this.value, this)
	}
}

export class ShadowStore extends Store {
	constructor (parent) {
		super(parent.mutations.clone(parent.value), parent.MutationsClass)

		this.parent = parent
		this.isChanged = false

		// TODO test it
		Object.keys(this.mutations).forEach((key) => {
			if (typeof this.mutations[key] === 'function') {
				const fn = this.mutations[key]
				this.mutations[key] = (...args) => {
					this.isChanged = true
					return fn(...args)
				}
			}
		})
	}

	apply () {
		if (!this.isChanged) {
			return
		}

		this.parent.mutations.setValue(this.value)
		// TODO test it
		this.isChanged = false
	}

	cancel () {
		if (!this.isChanged) {
			return
		}

		this.mutations.setValue(this.parent.mutations.clone(this.parent.value))
		// TODO test it
		this.isChanged = false
  }
}

StateUnion.registerClass(Store)