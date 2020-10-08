import useUnion from '@uniono/react'

export default () => ({
	href: window.location.href,
	listener: null,
	url: useUnion.mart(({ href }) => new URL(href)),
	start: ({ mutations, apply }) => {
		const listener = (event) => {
			mutations.href.setValue(event.newURL)
			apply()
		}

		mutations.end()
		window.addEventListener("hashchange", listener, false)
		
		mutations.listener.setValue(listener)
	},
	end: ({ value, mutations }) => {
		const { listener } = value()
		if (!listener) {
			return
		}

		window.removeEventListener("hashchange", listener)
		mutations.listener.setValue(null)
	},
})