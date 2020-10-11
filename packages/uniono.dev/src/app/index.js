import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react'

import useAppState from './useAppState'

const App = () => {
	const { Layouts, theme, PageComponent } = useAppState()

	React.useEffect(
		() => {
			const content = document.getElementById('main-content')
			if (content == null) {
				return
			}
			
			content.scrollTo(0, 0)
		}, 
		[ PageComponent ]
	)

	return (
		<ThemeProvider theme={theme}>
			<Layouts.Main>
				<PageComponent />
			</Layouts.Main>
		</ThemeProvider>
	)
}

export default App