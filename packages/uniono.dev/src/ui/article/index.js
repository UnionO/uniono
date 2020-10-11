import { makeStyles } from '@material-ui/core/styles';
import React from 'react'

export default ({ className, ...props }) => {
	const classes = useStyles()
	
	return <div className={`${classes.root} ${className}`} {...props} />
}

const useStyles = makeStyles((theme) => ({
	root: {
		'& > h1': { margin: `${theme.spacing(2)}px 0` },
		'& > h2': { margin: `${theme.spacing(2)}px 0` },
		'& > h3': { margin: `${theme.spacing(2)}px 0` },
		'& > h4': { margin: `${theme.spacing(2)}px 0` },
		'& > h5': { margin: `${theme.spacing(2)}px 0` },
		'& > h6': { margin: `${theme.spacing(1)}px 0` },
		'& li': { fontSize: '1rem' },
		'& a': { 
			color: theme.palette.secondary.light,
			margin: `0 ${theme.spacing(1)}px` 
		},
	}
}))