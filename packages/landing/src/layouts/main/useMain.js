import useUnion from '@uniono/react'

const state = {
	settings: useUnion.inject('settings'),
	menu: useUnion.from({
		visible: false,
		openSections: {},
		show: ({ mutations }) => mutations.visible.setTrue(),
		hide: ({ mutations }) => mutations.visible.setFalse(),
		toggleSectionExamples: ({ value, mutations }) => 
			mutations.openSections.merge({ examples: !value().openSections.examples }),
		toggleSectionApi: ({ value, mutations }) => 
			mutations.openSections.merge({ api: !value().openSections.api }),
	})
}

export default () => useUnion(state)