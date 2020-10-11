import { makeStyles } from '@material-ui/core/styles';
import React from 'react'

export default ({ children, className, ...props }) => {
	const classes = useStyles()

	return (
		<div className={`${classes.root} ${className}`} {...props}>
			<div className={classes.content}>
				{children}
			</div>
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
  root: {
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