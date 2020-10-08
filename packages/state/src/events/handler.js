export default class Handler {
	constructor (target) {
		this.target = target
	}

	setInterceptor (interceptor) {
		this.interceptor = interceptor
	}

	notify (...args) {
		if (typeof this.interceptor === 'function') {
			this.interceptor(...args)
			return
		}
		
		this.target.recalc(...args)
	}
}