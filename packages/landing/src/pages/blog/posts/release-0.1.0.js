import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/lab/Alert'
import CakeIcon from '@material-ui/icons/Cake'
import FiberNewIcon from '@material-ui/icons/FiberNew'
import React from 'react'

export default {
	id: 'release-0.1.0',
	icon: <CakeIcon />,
	date: new Date('Fri, 09 Oct 2020 06:17:15 GMT'),
	title: 'Release 0.1.0',
	short: (
		<>
			<Typography variant="h4">
				Release 0.1.0
			</Typography>	
			<Alert severity="warning">
			  Beta (not ready for production) <br />
				Version 0.1.* is intended to demonstrate the idea itself. <br />
				Both external api and implementation can be changed greatly
			</Alert>
		</>
	),
	data: (
		<>
			<Typography variant="body1">
				The purpose of this release is to showcase an idea to start a discussion with the community about the library API
			</Typography>		
			<Typography variant="h6">
				Changes
			</Typography>
			<Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
				<FiberNewIcon />
				@uniono/core
			</Typography>
			<Typography variant="body1">
				Library contains Union manipulations class
			</Typography>
			<Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
				<FiberNewIcon />
				@uniono/state
			</Typography>
			<Typography variant="body1">
				State management implementation
			</Typography>
			<Typography variant="h6" style={{ display: 'flex', alignItems: 'center' }}>
				<FiberNewIcon />
				@uniono/react
			</Typography>
			<Typography variant="body1">
				The library is designed to work with @uniono/state in React
			</Typography>
		</>
	)
}