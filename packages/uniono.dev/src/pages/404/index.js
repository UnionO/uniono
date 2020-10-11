import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import React from 'react'

export default () => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<MeetingRoomIcon className={classes.icon} />
			<Typography variant="h3">
				You are outside the union
			</Typography>
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	icon: {
		width: 64,
		height: 64,
		marginBottom: theme.spacing(2)
	}
}))