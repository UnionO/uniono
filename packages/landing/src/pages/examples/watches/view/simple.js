import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import React from 'react'

export default ({ parsed }) => {
	const classes = useClasses()

	return (
		<Typography variant="h3" className={classes.root}>
			{parsed.hours.stringValue}:{parsed.minutes.stringValue}:{parsed.seconds.stringValue}
		</Typography>
	)
}

const useClasses = makeStyles(() => ({
	root: {
		margin: 'auto'
	}
}))