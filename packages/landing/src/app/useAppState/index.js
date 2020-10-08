import useUnion from '@uniono/react'
import React from 'react'

import layouts from '../../layouts' 
import ui from '../../ui' 
import pages from '../../pages' 
import router from '../../unions/hash-router' 
import settings from './settings'
import themes from './themes'

const state = {
	settings: useUnion.global('settings', useUnion.from(settings)),
	Layouts: useUnion.global('layouts', useUnion.asIs(layouts)),
	UI: useUnion.global('ui', useUnion.asIs(ui)),
	router: useUnion.from(router()),
	theme: useUnion.mart(({ settings }) => themes[settings.theme]()),
	Pages: useUnion.asIs(pages),
	PageComponent: useUnion.mart(({ Pages, router }) => Pages[router.url.hash.substr(3)] || Pages['404']),
}

export default () => {
	const union = useUnion(state)

	React.useEffect(() => {
		union.router.start()

		return () => {
			union.router.end()
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ ])

	return union
}