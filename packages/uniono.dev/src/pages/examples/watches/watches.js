import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react'

import useWatches from './useWatches' 
import view from './view' 

const Watches = () => {
	const watches = useWatches()
	const classes = useClasses()
	const ActualComponent = view[watches.view]

	return (
		<div className={classes.root}>
			<Select
				fullWidth
				value={watches.view}
				onChange={({ target }) => watches.setView(target.value)}
				className={classes.select}
			>
				<MenuItem value="simple">Simple</MenuItem>
				<MenuItem value="clock">Clock</MenuItem>
			</Select>
			<div className={classes.content}>
				<ActualComponent {...watches} />
			</div>
		</div>
	)
}

const useClasses = makeStyles((theme) => ({
	root: {
		width: '100%',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
		minWidth: 400,
		minHeight: 400,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 'auto auto'
	},
	select: {
		color: 'white',
		marginBottom: theme.spacing(2),
		'&:before': {
			borderBottomColor: 'white !important'
		},
		'& > svg': {
			color: 'white',
		}
	},
	content: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		height: '100%',
		flex: 1
	}
}))

export default Watches