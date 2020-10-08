import Grid from '@material-ui/core/Grid'
import React from 'react'

import Header from '../header'
import Watches from './watches'

export default () => (
	<Grid container direction="column">
		<Header 
			title="Watches" 
			description="Tick tack, tick tack, tick tack"
		/>
		<Watches />
	</Grid>
)