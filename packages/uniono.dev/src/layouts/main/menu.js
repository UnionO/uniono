import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AdjustIcon from '@material-ui/icons/Adjust';
import AccessTimeSharpIcon from '@material-ui/icons/AccessTimeSharp'
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import CodeIcon from "@material-ui/icons/Code"
import DoneIcon from '@material-ui/icons/Done';
import EventNoteIcon from '@material-ui/icons/EventNote'
import EcoIcon from '@material-ui/icons/Eco'
import LaptopIcon from '@material-ui/icons/Laptop'
import PowerSettingsIcon from "@material-ui/icons/PowerSettingsNew"
import React from 'react'

import ReactIcon from '../../icons/react'

export default ({ menu, onClose }) => {
	const classes = useStyles()
	
	return (
		<Drawer anchor="left" open={menu.visible} onClose={menu.hide}>
			<a href="/#!/" className={classes.link} onClick={menu.hide}>
				<AppBar position="relative" className={classes.appBar} color="inherit">
					<Toolbar className={classes.toolbar}>
						<div className={classes.appBarIcon}>
							<AdjustIcon />
						</div>
						<Typography variant="h6">
							UnionO
						</Typography>
					</Toolbar>
				</AppBar>
			</a>
			<Divider />
			<List className={classes.list}>
				<MenuItem 
					link="#!/getting-started" 
					text="Getting Started" 
					icon={PowerSettingsIcon} 
					classes={classes}
					onClick={menu.hide}
				/>
				<MenuItem 
					text="Examples" 
					icon={CodeIcon} 
					classes={classes}
					onClick={menu.toggleSectionExamples}
				/>
				<Collapse in={menu.openSections.examples} timeout="auto" unmountOnExit>
					<List className={classes.childList}>
						<MenuItem 
							link="#!/examples/to-do" 
							text="ToDo" 
							icon={DoneIcon} 
							classes={classes}
							onClick={menu.hide}
						/>
						<MenuItem 
							link="#!/examples/game-of-life" 
							text="CGoL" 
							icon={EcoIcon} 
							classes={classes}
							onClick={menu.hide}
						/>
						<MenuItem 
							link="#!/examples/watches" 
							text="Watches" 
							icon={AccessTimeSharpIcon} 
							classes={classes}
							onClick={menu.hide}
						/>
					</List>
				</Collapse>
				<MenuItem 
					text="API" 
					icon={LaptopIcon} 
					classes={classes}
					onClick={menu.toggleSectionApi}
				/>
				<Collapse in={menu.openSections.api} timeout="auto" unmountOnExit>
					<List className={classes.childList}>
						<MenuItem 
							link="#!/api/core" 
							text="Core" 
							icon={AdjustIcon} 
							classes={classes}
							onClick={menu.hide}
						/>
						<MenuItem 
							link="#!/api/state" 
							text="State" 
							icon={BubbleChartIcon} 
							classes={classes}
							onClick={menu.hide}
						/>
						<MenuItem 
							link="#!/api/react" 
							text="React" 
							icon={ReactIcon} 
							classes={classes}
							onClick={menu.hide}
						/>
					</List>
				</Collapse>
				<MenuItem 
					link="#!/blog" 
					text="Blog" 
					icon={EventNoteIcon} 
					classes={classes}
					onClick={menu.hide}
				/>
			</List>
		</Drawer>
	)
}

const MenuItem = ({ link, icon: Icon, text, classes, onClick }) => (
  <a href={link} className={classes.link} onClick={onClick}>
    <ListItem button>
      <ListItemIcon className={classes.icon}>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  </a>
)

const useStyles = makeStyles((theme) => ({
	appBar: {
		cursor: 'pointer',
		boxShadow: 'none'
	},
	toolbar: {
		padding: `0 ${theme.spacing(2)}px`
	},
	appBarIcon: {
		margin: `0 ${theme.spacing(2)}px 0 0`
	},
	list: {
		width: 210,
		maxWidth: 'min(100vw - 64px, 420px)'
	},
	childList: {
		paddingLeft: theme.spacing(2)
	},
	link: {
    textDecoration: 'none',
    color: theme.palette.background.contrastText
	},
	icon: {
		minWidth: 40
	}
}))