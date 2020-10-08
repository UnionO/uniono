import Grid from '@material-ui/core/Grid'
import React from 'react'

import Header from '../header'
import GameOfLife from './game-of-life'

export default () => (
	<Grid container direction="column">
		<Header 
			title="Conway's Game of Life" 
			description="Сan a framework be considered complete if a Todo List not implemented on it?"
		/>
		<GameOfLife />
	</Grid>
)