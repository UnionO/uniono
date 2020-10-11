import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import React from 'react'

import useBlog from './useBlog'
import posts from './posts'

export default () => {
	const classes = useStyles()
	const { UI } = useBlog()

	return (
		<div className={classes.root}>
			<Typography variant="h5">
				Blog
			</Typography>
			{posts.map((post) => (
				<UI.BlogPost 
					key={post.id} 
					id={post.id} 
					icon={post.icon}
					date={post.date}
					title={post.title}
					short={post.short}
				>
					{post.data}
				</UI.BlogPost>
			))}
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%'
	}
}))