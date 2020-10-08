import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react'

import useAppState from './useAppState'

const App = () => {
	const { Layouts, theme, PageComponent } = useAppState()

	return (
		<ThemeProvider theme={theme}>
			<Layouts.Main>
				<PageComponent />
			</Layouts.Main>
		</ThemeProvider>
	)
}

export default App