import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import React from 'react'

import useArticle from '../../unions/article'

export default () => {
	const { UI } = useArticle()
	const classes = useStyles()

	return (
		<UI.Article>
			<Typography variant="h5">
				Getting Started
			</Typography>
			<Typography variant="h6">
				Create React Application
			</Typography>
			<UI.Install>
				npx create-react-app uniono-react-example
			</UI.Install>
			<Typography variant="h6">
				Install @uniono/react
			</Typography>
			<UI.Install>
				npm i @uniono/core @uniono/state @uniono/react
			</UI.Install>
			<Typography variant="h6">
				Create first union
			</Typography>
			<Typography variant="body1">
				Create file src/useApp.js
			</Typography>
			<UI.Code value={examples.useApp} />
			<Typography variant="body1">
				Use useApp in src/App.js
			</Typography>
			<UI.Code value={examples.app} />
			<div className={classes.more}>
				<Button variant="text" href="/#!/api/react" color="secondary">
					READ MORE
				</Button>
			</div>
		</UI.Article>
	)
}

const useStyles = makeStyles((theme) => ({
	more: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: theme.spacing(4)
	}
}))

const examples = {
	useApp: `import useUnion from '@uniono/react;'

const app = {
	value: 0,
	inc: ({ mutations }) => mutations.value.inc(),
	dec: ({ mutations }) => mutations.value.dec(),
};

export default () => useUnion(app);`,
	app: `import React from 'react';
import './App.css';

import useApp from './useApp';

function App() {
	const { value, inc, dec } = useApp()

	return (
		<div className="App">
			{value}
			<button onClick={inc}>
				inc
			</button>
			<button onClick={dec}>
				dec
			</button>
		</div>
	);
}

export default App;`
}