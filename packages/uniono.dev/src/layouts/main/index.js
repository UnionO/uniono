import { makeStyles } from '@material-ui/core/styles';
import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Brightness4Icon from "@material-ui/icons/Brightness4"
import Brightness5Icon from "@material-ui/icons/Brightness5"
import GitHubIcon from "@material-ui/icons/GitHub"
import MenuIcon from "@material-ui/icons/Menu"

import Content from "../content"
import Menu from "./menu"
import useMain from "./useMain"

export default ({ children }) => {
	const { settings, menu } = useMain()
  const classes = useStyles()
  
	return (
		<div className={classes.root}>
      <AppBar color="primary" position="relative">
        <Toolbar>
          <IconButton color="inherit" onClick={menu.show}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.appBarHeader}>
            UnionO
          </Typography>
          <IconButton color="inherit" onClick={settings.themeToggle}>
            {settings.theme === 'dark' ? <Brightness5Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton 
            color="inherit" 
            href="https://github.com/UnionO/uniono"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Menu menu={menu} />
      <Content id="main-content">
        {children}
      </Content>
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.background.contrastText,
    backgroundColor: theme.palette.background.main
	},
	appBarHeader: {
    flex: 1
  },
  contentWrapper: {
    display: 'flex',
    flex: 1,
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  content: {
    flex: 1,
    minWidth: `min(100vw - 64px, 1024px)`,
    maxWidth: `min(100vw - 64px, 1024px)`,
    margin: `${theme.spacing(2)}px auto 0 auto`,
  }
}))