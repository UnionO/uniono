import Mutations from '../mutations'

export default class ArrayMutations extends Mutations {
	constructor (target) {
		super(target)
	}

	fill = (...args) => {
		this.target.value.fill(...args)
		return this.setValue(this.target.value)
	}

	filter = (...args) => this.setValue(this.target.value.filter(...args))
	flat = (...args) => this.setValue(this.target.value.flat(...args))
	flatMap = (...args) => this.setValue(this.target.value.flatMap(...args))
	map = (...args) => this.setValue(this.target.value.map(...args))
	pop = (...args) => {
		const result = this.target.value.pop(...args)
		this.setValue(this.target.value)

		return result
	}
	push = (...args) => {
		const result = this.target.value.push(...args)
		this.setValue(this.target.value)

		return result
	}
	reverse = (...args) => this.setValue(this.target.value.reverse(...args))
	shift = (...args) => {
		const result = this.target.value.shift(...args)
		this.setValue(this.target.value)

		return result
	}
	sort = (...args) => this.setValue(this.target.value.sort(...args))
	splice = (...args) => {
		const result = this.target.value.splice(...args)
		this.setValue(this.target.value)

		return result
	}
	unshift = (...args) => {
		const result = this.target.value.unshift(...args)
		this.setValue(this.target.value)

		return result
	}
}