import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import GitHubIcon from '@material-ui/icons/GitHub'
import React from 'react'

import useExampleHeader from './useHeader' 

export default ({ title, description, link, children }) => {
	const classes = useStyles()
	const { articleVisible, showArticle, hideArticle, Layouts } = useExampleHeader()

	return (
		<>
			<Grid container>
				<Grid item xs={9}>
					<Typography variant="h3">
						{title}
					</Typography>
				</Grid>
				<Grid 
					item 
					container
					xs={3}
					justify="flex-end"
					alignItems="center"
				>
					<Button 
						variant="text" 
						color="secondary"
						disabled={!children}
						onClick={showArticle} 
					>
						ARTICLE
					</Button>
					<IconButton
						href={link}
            target="_blank"
            rel="noopener noreferrer"
					>
						<GitHubIcon />
					</IconButton>
				</Grid>
			</Grid>
			<Grid 
				item
				container 
				xs={12} 
				className={classes.description}
				justify="flex-end"
				alignItems="center"
			>
				<Typography variant="subtitle2">
					{description}
				</Typography>
			</Grid>
			<Dialog 
				fullScreen 
				open={articleVisible} 
				onClose={hideArticle} 
				TransitionComponent={Transition}
			>
				<AppBar position="relative" className={classes.articleAppBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.articleTitle}>
              {title}
            </Typography>
            <IconButton color="inherit" onClick={hideArticle}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
				<Layouts.Content>
					{children}
				</Layouts.Content>
			</Dialog>
		</>
	)
}

const useStyles = makeStyles((theme) => ({
	description: {
		marginBottom: theme.spacing(2)
	},
	articleTitle: {
		flex: 1
	}
}))

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />)