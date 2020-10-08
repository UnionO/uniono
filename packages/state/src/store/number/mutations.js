import Mutations from '../mutations'

export default class NumberMutations extends Mutations {
	constructor (target) {
		super(target)
	}

	inc = (delta = 1) => this.setValue(this.target.value + delta)
	dec = (delta = 1) => this.setValue(this.target.value - delta)
}