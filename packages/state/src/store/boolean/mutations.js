import Mutations from '../mutations'

export default class BooleanMutations extends Mutations {
	constructor (target) {
		super(target)
	}

	setTrue = () => {
		return this.setValue(true)
	}

	setFalse = () => {
		return this.setValue(false)
	}

	toggle = () => {
		return this.setValue(!this.target.value)
	}
}