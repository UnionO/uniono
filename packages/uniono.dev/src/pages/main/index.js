import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AdjustIcon from '@material-ui/icons/Adjust';
import React from 'react'

import { sampleSimple, sampleControlled, sampleTestable } from './samples'
import Code from '../../ui/code'

export default () => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<div className={classes.slide}>
				<div className={classes.slideContent}>
					<AdjustIcon className={classes.slideIcon} />
					<Typography variant="h2" className={classes.title}>
						Union <AdjustIcon className={classes.slideTitleIcon} />
					</Typography>
					<Typography variant="h6" className={classes.slideSubtitle}>
						Transaction based state manager
					</Typography>
				</div>
			</div>
			<Alert severity="warning" className={classes.alert}>
				Beta (not ready for production) <br />
				Version 0.1.* is intended to demonstrate the idea itself. <br />
				Both external api and implementation can be changed greatly
			</Alert>
			<Typography variant="h4">
				Simple
			</Typography>
			<Typography variant="body1">
				We believe that one of the most important things in any library is developer experience,
				since this determines not only development speed, but also the amount of bugs.<br />
				Based on this factor, we strive to make using the UnionO as simple and comfortable as possible.
			</Typography>
			<Code value={sampleSimple} />
			<Typography variant="h4">
				Controlled
			</Typography>
			<Typography variant="body1">
				Transactions make possible to bulk-mutate an arbitrary set of stores
			</Typography>
			<Code value={sampleControlled} />
			<Typography variant="h4">
				Testable
			</Typography>
			<Typography variant="body1">
				A much more simplier and natural for JavaScript testing model
			</Typography>
			<Code value={sampleTestable} />
			<div className={classes.gettingStarted}>
				<Button variant="text" color="secondary" href="#!/getting-started">
					GETTING STARTED
				</Button>
			</div>
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
		top: -theme.spacing(2)
	},
	slide: {
		position: 'relative',
		left: '50%',
		width: 0,
		height: '25vw',
		overflow: 'visible',
		marginBottom: theme.spacing(2),
		userSelect: 'none'
	},
	slideContent: {
		position: 'absolute',
		left: '-50vw',
		width: '100vw',
		height: '100%',
		padding: `${theme.spacing(2)}px 0 0 25vw`
	},
	slideIcon: {
		width: '50vw',
		height: '50vw',
		position: 'absolute',
		left: '-25vw',
		top: '-25vw',
		opacity: 0.15
	},
	alert: {
		marginBottom: theme.spacing(2)
	},
	title: {
		fontSize: '8vw',
	},
	slideSubtitle: {
		fontSize: '4vw'
	},
	slideTitleIcon: {
		position: 'relative',
		width: '8vw',
		height: '8vw',
		left: '-2vw',
		top: '1vw'
	},
	gettingStarted: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: 120
	}
}))