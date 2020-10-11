import useUnion from '@uniono/react'

export const exampleHeader = {
	articleVisible: false,
	showArticle: ({ mutations }) => mutations.articleVisible.setTrue(),
	hideArticle: ({ mutations }) => mutations.articleVisible.setFalse(),
	Layouts: useUnion.inject('layouts'),
}

export default () => useUnion(exampleHeader)