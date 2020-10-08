import Handler from '../events/handler'
import StateStore from '../unions/state'

export default class TransactionPlan {
	constructor (union) {
		this.union = union
		this.plan = null
	}

	prepare () {
		if (this.plan != null) {
			return
		}

		const byLevels = new Map()
		let transactionLevel = 0
	
		const processed = new Map()
		const forProcessing = StateStore.flat(this.union)
		while (forProcessing.length > 0) {
			const instance = forProcessing.shift()
			if (processed.has(instance)) {
				continue
			}

			processed.set(instance, true)
			if (instance.transactionLevel != null) {
				transactionLevel = Math.max(transactionLevel, instance.transactionLevel || 0)
				
				let levelInstances = byLevels.get(instance.transactionLevel)
				if (levelInstances == null) {
					levelInstances = []
					byLevels.set(instance.transactionLevel, levelInstances)
				}
				levelInstances.push(instance)
			}

			if (instance.handlers instanceof Map) {
				const instanceHandlers = Array.from(instance.handlers.keys())
				for (let i = 0; i < instanceHandlers.length; i++) {
					const handler = instanceHandlers[i]
					if (handler instanceof Handler && !processed.has(handler.target)) {
						forProcessing.push(handler.target)
					}
				}
			}
		}

		this.plan = { 
			transactionLevel,
			byLevels, 
			marts: Array.from(byLevels.keys())
				.map((key) => byLevels.get(key))
				.flat(Infinity)
				.filter((a) => a && a.handler instanceof Handler)
		}
	}

	setInterceptor (interceptor) {
		this.prepare()

		this.plan.marts.forEach(({ handler }) => {
			if (handler == null) {
				return
			}
			
			handler.setInterceptor(interceptor)
		})
	}

	recalc (changed) {
		const changedMap = new Map()
		const toProcess = [ ...changed ]
		while (toProcess.length > 0) {
			const unit = toProcess.shift()
			if (!unit || changedMap.has(unit)) {
				continue
			}

			changedMap.set(unit, true)
			if (unit.handlers instanceof Map) {
				toProcess.push(...Array.from(unit.handlers.keys()).map(({ target }) => target))
			}
		}

		this.prepare()

		for (let i = 1; i <= this.plan.transactionLevel; i++) {
			const wave = this.plan.byLevels.get(i)

			if (!Array.isArray(wave)) {
				continue
			}

			wave.forEach((instance) => {
				if (typeof instance.recalc !== 'function' || !changedMap.has(instance)) {
					return
				}

				instance.recalc()
			})
		}
	}
}