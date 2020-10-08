export default class Union {
	constructor (isAtom) {
		this.isAtom = isAtom
	}

	map = (union, fn, resultMap = new Map()) => {
		if (resultMap.has(union)) {
			return resultMap.get(union)
		}

		let result
		if (this.isAtom(union)) {
			result = fn(union)
			resultMap.set(union, result)
			return result
		}

		if (union == null) {
			return union
		}

		if (Array.isArray(union)) {
			result = []
			resultMap.set(union, result)
			union.forEach((item, index) =>  result[index] = this.map(item, fn, resultMap))
			return result
		}

		if (union instanceof Map) {
			result = new Map()
			resultMap.set(union, result)
			Array
				.from(union.entries())
				.forEach(([ key, value ]) => result.set(this.map(key, fn, resultMap), this.map(value, fn, resultMap)))
			
			return result
		}

		if (typeof union === 'object') {
			result = {}
			resultMap.set(union, result)
			Object.keys(union).forEach((key) => result[key] = this.map(union[key], fn, resultMap))
			
			return result
		}

		return union
	}

	forEach = (union, fn, processed = new Map()) => {
		if (processed.has(union)) {
			return
		}
		processed.set(union, true)

		if (this.isAtom(union)) {
			fn(union)
			return
		}

		if (union == null) {
			return union
		}

		if (Array.isArray(union)) {
			union.forEach((item) => this.forEach(item, fn, processed))
			return
		}

		if (union instanceof Map) {
			Array
				.from(union.entries())
				.forEach(([ key, value ]) => { 
					this.forEach(key, fn, processed) 
					this.forEach(value, fn, processed) 
				})
			return
		}

		if (typeof union === 'object') {
			Object.keys(union).forEach((key) => this.forEach(union[key], fn, processed), {})
		}
	}

	flat (union) {
		const result = []
		this.forEach(union, (i) => result.push(i))

		return result
	}
}