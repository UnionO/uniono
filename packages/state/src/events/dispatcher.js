import Handler from './handler'

export default class Dispatcher {
	constructor () {
		this.handlers = new Map()
	}

	on (handler, filter) {
		this.handlers.set(handler, filter)
	}

	unsubscribe (handler) {
		this.handlers.delete(handler)
	}

	notify (...args) {
		for (const [ handler, filter ] of this.handlers.entries()) {
			if (typeof filter === 'function' && !filter(...args)) {
				continue
			}

			if (handler instanceof Handler) {
				handler.notify(...args)
				continue
			}

			handler(...args)
		}
	}
}