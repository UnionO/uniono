import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Filter9PlusIcon from '@material-ui/icons/Filter9Plus';
import HdrWeakIcon from '@material-ui/icons/HdrWeak';
import IsoIcon from '@material-ui/icons/Iso';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import StorageIcon from '@material-ui/icons/Storage';
import LinearScaleIcon from '@material-ui/icons/LinearScale';
import React from 'react'

import Page from './page'
import useState from './useState'

export default () => {
	const { UI } = useState()
	const goTo = {
		store: {
			main: React.useCallback(() => window.location.hash = '#!/api/state/store', []),
			array: React.useCallback(() => window.location.hash = '#!/api/state/array-store', []),
			map: React.useCallback(() => window.location.hash = '#!/api/state/map-store', []),
			boolean: React.useCallback(() => window.location.hash = '#!/api/state/boolean-store', []),
			number: React.useCallback(() => window.location.hash = '#!/api/state/number-store', []),
			object: React.useCallback(() => window.location.hash = '#!/api/state/object-store', []),
		}
	}

	return (
		<Page>
			<Typography variant="h5">
				About
			</Typography>
			<Typography variant="body1">
				State management implementation
			</Typography>
			<Typography variant="h5">
				Stores
			</Typography>
			<Typography variant="body1">
				Classes to store data
			</Typography>
			<List>
				<ListItem button onClick={goTo.store.main}>
					<ListItemAvatar>
						<StorageIcon />
					</ListItemAvatar>
					<ListItemText 
						primary="Store" 
						secondary="Store any data"
					/>
				</ListItem>
				<ListItem button onClick={goTo.store.array}>
					<ListItemAvatar>
						<LinearScaleIcon />
					</ListItemAvatar>
					<ListItemText 
						primary="ArrayStore" 
						secondary="Store array data"
					/>
				</ListItem>
				<ListItem button onClick={goTo.store.map}>
					<ListItemAvatar>
						<HdrWeakIcon />
					</ListItemAvatar>
					<ListItemText 
						primary="MapStore" 
						secondary="Store map data"
					/>
				</ListItem>
				<ListItem button onClick={goTo.store.boolean}>
					<ListItemAvatar>
						<IsoIcon />
					</ListItemAvatar>
					<ListItemText 
						primary="BooleanStore" 
						secondary="Store boolean data"
					/>
				</ListItem>
				<ListItem button onClick={goTo.store.number}>
					<ListItemAvatar>
						<Filter9PlusIcon />
					</ListItemAvatar>
					<ListItemText 
						primary="NumberStore" 
						secondary="Store number data"
					/>
				</ListItem>
				<ListItem button onClick={goTo.store.object}>
					<ListItemAvatar>
						<SettingsEthernetIcon />
					</ListItemAvatar>
					<ListItemText 
						primary="ObjectStore" 
						secondary="Store object data"
					/>
				</ListItem>
			</List>
			<Typography variant="h5">
				Mart
			</Typography>
			<Typography variant="body">
				Marts allow to store pre-calculated data
			</Typography>
			<UI.Code value={examples.mart} />
			<Grid 
				item 
				container
				justify="flex-end"
				alignItems="center"
			>
				<Button color="secondary" href="#!/api/state/mart">
					READ MORE
				</Button>
			</Grid>
			<Typography variant="h5">
				Transaction
			</Typography>
			<Typography variant="body">
				Transactions allow you to batch-change the state of arbitrary stores
			</Typography>
			<UI.Code value={examples.transactions} />
			<Grid 
				item 
				container
				justify="flex-end"
				alignItems="center"
			>
				<Button color="secondary" href="#!/api/state/transaction">
					READ MORE
				</Button>
			</Grid>
			<Typography variant="h5">
				Effect
			</Typography>
			<Typography variant="body">
				Effects allow you to react to changes in stores or marts
			</Typography>
			<UI.Code value={examples.effect} />
			<Grid 
				item 
				container
				justify="flex-end"
				alignItems="center"
			>
				<Button color="secondary" href="#!/api/state/effect">
					READ MORE
				</Button>
			</Grid>
		</Page>
	)
}

const examples = {
	mart: `// ToDo Example
{
	input: '',
	tab: 'all',
	tasks: [],
	editableTask: null,
	visibleTasks: useUnion.mart(
		({ tab, tasks }) => tasks
			.map((task, index) => ({ ...task, index }))
			.filter((task) => {
				switch (tab) {
					case 'all':
						return true

					case 'active':
						return task.done === false

					case 'completed':
						return task.done === true
					
					default:
						throw new Error(\`Unsupported tab \${JSON.stringify(tab)}\`)
				}
		}),
		({ tab, tasks }) => ({ tab, tasks })
	),
	...
}`,
	transactions: `// ToDo Example
{
	...,
	addTask: ({ value, mutations }) => {
		const { input } = value()
		const title = input.trim()
		if (title.length === 0) {
			return
		}

		mutations.input.setValue('')
		mutations.tasks.unshift({ done: false, title })
	},
	...
}`,
	effect: `{
	q: '',
	qEffect: useUnion.effect(
		debounce(({ mutations }, q) => mutations.loadEntities(q), 300),
		({ q }) => q
	)
}`
}