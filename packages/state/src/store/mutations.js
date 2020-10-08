export default class Mutations {
	constructor (target) {
		this.target = target
	}

	clone (value) {
		if (value == null) {
			return value
		}

		if (Array.isArray(value)) {
			return value.map((i) => this.clone(i))
		}

		if (value instanceof Map) {
			return new Map(
				Array.from(value.entries())
					.map(([ key, value ]) => [ this.clone(key), this.clone(value) ])
			)
		}

		if (value instanceof Date) {
			return new Date(value)
		}

		if (typeof value === 'object') {
			return Object.keys(value)
				.reduce((agg, key) => {
					agg[key] = this.clone(value[key])

					return agg
				}, {})
		}

		return value
	}

	isChanged (newValue) {
		return this.target.value !== newValue
	}

	setValue = (newValue) => {
		if (!this.isChanged(newValue)) {
			return newValue
		}
		
		const args = [ newValue, this.target.value, this.target ]
		this.target.value = newValue
		this.target.notify(...args)
		
		return newValue
	}
}