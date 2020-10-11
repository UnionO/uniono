import useUnion from '@uniono/react'

export const article = {
	UI: useUnion.inject('ui'),
}

export default () => useUnion(article)