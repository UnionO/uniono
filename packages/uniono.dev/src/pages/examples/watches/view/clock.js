import { makeStyles } from '@material-ui/core/styles';
import React from 'react'

export default ({ parsed }) => {
	const classes = useClasses()

	return (
		<div className={classes.root}>
			<div 
				className={`${classes.hand} ${classes.hour}`} 
				style={{ transform: `rotate(${parsed.hours.angle}deg)` }} 
			/>
			<div 
				className={`${classes.hand} ${classes.minutes}`} 
				style={{ transform: `rotate(${parsed.minutes.angle}deg)` }} 
			/>
			<div 
				className={`${classes.hand} ${classes.seconds}`} 
				style={{ transform: `rotate(${parsed.seconds.angle}deg)` }} 
			/>
		</div>
	)
}

const useClasses = makeStyles(() => ({
	root: {
		position: 'relative',
		backgroundColor: 'rgb(210, 210, 210)',
		width: 300,
		height: 300,
		margin: 'auto',
		borderRadius: '100%',
		'&::before': {
			content: 'A',
			display: 'block',
			position: 'absolute',
			left: '47.5%',
			top: '47.5%',
			width: '5%',
			height: '5%',
			backgroundColor: 'rgba(0, 0, 0, 0.75)'
		}
	},
	hand: {
		position: 'absolute',
		width: 0,
		border: 'solid 3px rgba(0, 0, 0, 0.75)',
		borderRadius: '100%',
		transformOrigin: '50% 100%'
	},
	hour: {
		height: '25%',
		left: '50%',
		top: '25%'
	},
	minutes: {
		height: '35%',
		left: '50%',
		top: '15%'
	},
	seconds: {
		height: '45%',
		left: '50%',
		top: '5%'
	}
}))