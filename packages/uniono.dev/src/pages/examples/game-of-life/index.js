import Grid from '@material-ui/core/Grid'
import React from 'react'

import Header from '../header'
import GameOfLife from './game-of-life'

export default () => (
	<Grid container direction="column">
		<Header 
			title="Conway's Game of Life" 
			description={(
				<>
				A Computer is a state machine. Threats are for people who can't program state machine. <br /> 
				<Grid container justify="flex-end">© Alan Cox</Grid>
				</>
			)}
			link="https://github.com/UnionO/uniono/blob/master/packages/landing/src/pages/examples/game-of-life/useLife.js"
		/>
		<GameOfLife />
	</Grid>
)