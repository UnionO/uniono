import Union from '@uniono/core'

class StateUnion extends Union {
	constructor() {
		super((a) => this.classes.find((StateClass) => a instanceof StateClass) != null)

		this.classes = []
	}

	registerClass (...StateClasses) {
		this.classes.push(...StateClasses)
	}

	shadow (union, shadows) {
		return this.map(
			union,
			(instance) => instance.shadow(shadows),
			shadows
		)
	}
}

export default new StateUnion()