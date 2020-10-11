import { makeStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import React from 'react'

import useMethod from './useMethod'

export default ({ 
	title, 
	args,
	children,
	description
}) => {
	const { open, toggle } = useMethod()
	const classes = useStyles()

	return (
		<>
			<Typography variant="h6" className={classes.header} onClick={toggle}>
				<IconButton 
					className={`${classes.icon} ${!open ? classes.closed : ''}`}
					size="small"
				>
					<ArrowDropDownIcon />
				</IconButton>
				{title}
			</Typography>
			<Collapse in={open}>
				<div className={classes.content}>
					<Typography variant="body1">
						{description}
					</Typography>
					<Args args={args} />
					{children}
				</div>
			</Collapse>
		</>
	)
}

const Args = ({ args }) => {
	if (args == null) {
		return null
	}

	return (
		<TableContainer>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Argument</TableCell>
						<TableCell>Type</TableCell>
						<TableCell>Default</TableCell>
						<TableCell>Description</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{args.map(({ argument, type, defaultValue, description }) => (
						<TableRow key={argument}>
							<TableCell>{argument}</TableCell>
							<TableCell>{type}</TableCell>
							<TableCell>{defaultValue}</TableCell>
							<TableCell>{description}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

const useStyles = makeStyles((theme) => ({
	header: {
		cursor: 'pointer'
	},
	icon: {
		transition: theme.transitions.create([ 'transform' ])
	},
	closed: {
		transform: 'rotate(-90deg)'
	},
	content: {
		marginLeft: theme.spacing(4)
	}
}))