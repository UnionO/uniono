import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import ShareIcon from '@material-ui/icons/Share'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import React from 'react'

import useBlogPost from './useBlogPost'

export default ({
	icon,
	date,
	title,
	short,
	children
}) => {
	const classes = useStyles()
	const { 
		UI, 
		open, 
		openToggle, 
		shareOpen, 
		shareOpenToggle,
		shareCopy,
	} = useBlogPost()

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar>
						{icon}
					</Avatar>
				}
				title={title}
				subheader={date.toLocaleString()}
			/>
			<CardContent>
				{short}
				<Collapse 
					in={open} 
					timeout="auto" 
					unmountOnExit
					className={classes.content}
				>
					<UI.Article>
						{children}
					</UI.Article>
				</Collapse>
			</CardContent>
			<CardActions>
				<IconButton onClick={shareOpenToggle}>
					<ShareIcon />
				</IconButton>
				<div className={`${classes.share} ${shareOpen ? '' : classes.shareClosed}`}>
					<IconButton onClick={shareCopy}>
						<FileCopyIcon />
					</IconButton>
					<IconButton 
						href={`https://twitter.com/intent/tweet?url=${encodeURI('https://uniono.dev/blog')}`}
						target="_blank"
					>
						<TwitterIcon />
					</IconButton>
					<IconButton
						href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI('https://uniono.dev/blog')}`}
						target="_blank"
					>
						<FacebookIcon />
					</IconButton>
				</div>
				<div className={classes.actionsDivider} />
				<Button size="small" color="secondary" onClick={openToggle}>
					{open ? 'CLOSE' : 'MORE'}
        </Button>
			</CardActions>
		</Card>
	)
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: `${theme.spacing(2)}px 0`
	},
	share: {
		display: 'flex',
		transition: theme.transitions.create([ 'width', 'opacity' ]),
		overflow: 'hidden',
		width: 146,
		opacity: 1,
	},
	shareClosed: {
		width: 0,
		opacity: 0
	},
	actionsDivider: {
		flex: 1
	},
	content: {
		marginTop: theme.spacing(2)
	}
}))