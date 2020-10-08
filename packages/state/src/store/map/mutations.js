import Mutations from '../mutations'

export default class MapMutations extends Mutations {
	constructor (target) {
		super(target)
	}

	clear = (...args) => {
		this.target.value.clear(...args)
		this.setValue(this.target.value)
	}

	delete = (...args) => {
		this.target.value.delete(...args)
		this.setValue(this.target.value)
	}

	set = (...args) => {
		this.target.value.set(...args)
		this.setValue(this.target.value)
	}
}