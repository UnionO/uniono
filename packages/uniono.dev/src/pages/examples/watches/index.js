import Grid from '@material-ui/core/Grid'
import React from 'react'

import Header from '../header'
import Watches from './watches'

export default () => (
	<Grid container direction="column">
		<Header 
			title="Watches" 
			description="Tick tock, tick tock, tick tock"
			link="https://github.com/UnionO/uniono/blob/master/packages/landing/src/pages/examples/watches/useWatches.js"
		/>
		<Watches />
	</Grid>
)