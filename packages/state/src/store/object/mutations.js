import Mutations from '../mutations'

export default class ObjectMutations extends Mutations {
	constructor (target) {
		super(target)
	}

	merge = (part) => {
		Object.keys(part).forEach((key) => this.target.value[key] = part[key])
		this.setValue(this.target.value)
	}

	setNull = () => {
		this.setValue(null)
	}

	setUndefined = () => {
		this.setValue(undefined)
	}
}