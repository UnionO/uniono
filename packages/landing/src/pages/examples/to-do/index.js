import Grid from '@material-ui/core/Grid'
import React from 'react'

import Header from '../header'
import Article from './article'
import ToDo from './to-do'

export default () => (
	<Grid container direction="column">
		<Header 
			title="Todo" 
			description="Сan a framework be considered complete if a Todo List not implemented on it?"
		/>
		<ToDo />
	</Grid>
)