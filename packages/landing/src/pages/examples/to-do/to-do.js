import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import DoneIcon from '@material-ui/icons/Done';
import ListAltIcon from '@material-ui/icons/ListAlt';
import React from 'react'

import useToDo from './useToDo'

export default () => {
	const classes = useStyles()
	const toDo = useToDo()

	return (
		<div className={classes.root}>
			<TextField 
				label="What needs to be done?" 
				variant="outlined" 
				value={toDo.input}
				onChange={({ target }) => toDo.setInput(target.value)}
				onKeyUp={onKeySwitch({ 'Enter': toDo.addTask })}
				fullWidth
			/>
			<List className={classes.list}>
				{toDo.visibleTasks.map(({ done, title, index }) => (
					<ListItem key={index}>
						<Checkbox 
							checked={done}
							onChange={() => toDo.toggleTaskDone(index)}
						/>
						{toDo.editableTask && toDo.editableTask.index === index
							? (
								<TextField 
									value={toDo.editableTask.title} 
									onChange={({ target }) => toDo.setEditableTaskTitle(target.value)} 
									onKeyUp={onKeySwitch({ 'Enter': toDo.applyEdit, 'Escape': toDo.cancelEdit })}
									onBlur={toDo.applyEdit}
									autoFocus
									fullWidth
								/>
							)
							: (
								<ListItemText 
									primary={title} 
									onDoubleClick={() => toDo.setEditableTask(index)}
								/>
							)
						}
						<IconButton onClick={() => toDo.deleteTask(index)}>
							<DeleteIcon />
						</IconButton>
					</ListItem>
				))}
			</List>
			<BottomNavigation showLabels className={classes.navigation}>
				<BottomNavigationAction 
					label="All" 
					icon={<ListAltIcon color={toDo.tab === 'all' ? 'secondary' : 'inherit'} />} 
					onClick={() => toDo.setTab('all')} 
				/>
				<BottomNavigationAction 
					label="Active" 
					icon={<CheckBoxOutlineBlankIcon color={toDo.tab === 'active' ? 'secondary' : 'inherit'} />} 
					onClick={() => toDo.setTab('active')} 
				/>
				<BottomNavigationAction 
					label="Completed" 
					icon={<DoneIcon color={toDo.tab === 'completed' ? 'secondary' : 'inherit'} />} 
					onClick={() => toDo.setTab('completed')} 
				/>
			</BottomNavigation>
		</div>
	)
}

const onKeySwitch = (meta) => (e) => {
	const fn = meta[e.key]
	if (typeof fn !== 'function') {
		return
	}

	fn(e)
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		height: '100%',
		flexDirection: 'column',
	},
	list: {
		flex: 1,
		overflowY: 'auto',
		marginBottom: 64
	},
	navigation: {
		position: 'absolute',
		left: 0,
		bottom: 0,
		width: '100vw'
	}
}))