import { makeStyles } from '@material-ui/core/styles';
import React from 'react'

export default ({ children }) => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			{children}
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: '#292d3e',
		borderRadius: 3,
		padding: theme.spacing(2)
	}
}))