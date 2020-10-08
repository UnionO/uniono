import useUnion from '@uniono/react'

const method = {
	open: false,
	toggle: ({ value, mutations }) => mutations.open.setValue(!value().open)
}

export default () => useUnion(method)