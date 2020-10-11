import Grid from '@material-ui/core/Grid'
import React from 'react'

import Header from '../header'
import ToDo from './to-do'

export default () => (
	<Grid container direction="column">
		<Header 
			title="Todo" 
			description="Сan a framework be considered complete without a Todo List implemented?"
			link="https://github.com/UnionO/uniono/blob/master/packages/landing/src/pages/examples/to-do/useToDo.js"
		/>
		<ToDo />
	</Grid>
)