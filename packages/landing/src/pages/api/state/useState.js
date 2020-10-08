import useUnion from '@uniono/react'

const state = {
	UI: useUnion.inject('ui')
}

export default () => useUnion(state)