import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import React from 'react'

import useArticle from '../../../unions/article'

export default () => {
	const { UI } = useArticle()

	return (
		<>
			<Breadcrumbs aria-label="breadcrumb">
				<Link color="inherit" href="#!/api/react">
					@uniono/react
				</Link>
			</Breadcrumbs>
			<UI.Article>
				<Typography variant="body1">
					The library is designed to work with 
					<a href="/#!/api/state">
						@uniono/state 
					</a>
					in React
				</Typography>
				<Typography variant="h5">
					useUnion
				</Typography>
				<Typography variant="h6">
					Import
				</Typography>
				<UI.Code value="import useUnion from '@uniono/react'" />
				<Typography variant="h6">
					Description
				</Typography>
				<Typography variant="body1">
					Hook useUnion has one required argument (template: Object). Based on this template a union will be created.
					A similar key (for each key of the template) will be created in the union with value result of function
				</Typography>
				<UI.Code value="useUnion.atom(env, template[key])" inline />
				<UI.Code value={examples.atom} />
				<Typography variant="h6">
					Examples
				</Typography>
				<UI.Code value={examples.atomAll} />
				<Typography variant="body1">
					Template, which is used to create the next union
				</Typography>
				<UI.Code value={examples.atomUnion} />
				<Typography variant="h6">
					Dependency Injection
				</Typography>
				<Typography variant="body1">
					Dependency Injection based on 
					<a 
						href="https://ru.reactjs.org/docs/context.html" 
						target="_blank"
						rel="noopener noreferrer"
					>
						React Context
					</a>
					The application must be wrapped in DIProvider
				</Typography>
				<UI.Code value={examples.di} />
				<Typography variant="body1">
					After this, you can use <UI.Code value="useUnion.global" inline /> & <UI.Code value="useUnion.inject" inline />
				</Typography>
				<UI.Method 
					title="useUnion.global"
					args={[
						{ 
							argument: 'id', 
							type: 'any', 
							defaultValue: '', 
							description: 'Injection id'
						},
						{ 
							argument: 'atomTemplate', 
							type: 'any', 
							defaultValue: '', 
							description: 'Injection atom template'
						}
					]}
					description='Allows to set new value in DI'
				>
					<UI.Code value={examples.global} />
				</UI.Method>
				<UI.Method 
					title="useUnion.inject"
					args={[
						{ 
							argument: 'id', 
							type: 'any', 
							defaultValue: '', 
							description: 'Injection id'
						}
					]}
					description='Allow to inject atom from DI'
				>
					<UI.Code value={examples.inject} />
				</UI.Method>
				<Typography variant="h6">
					Template mutations
				</Typography>
				<UI.Method 
					title="useUnion.mutate"
					args={[
						{ 
							argument: 'fn', 
							type: 'function', 
							defaultValue: '', 
							description: 'Atom factory'
						}
					]}
					description={(
						<>
							useUnion.mutate designed to create an atom based on union & dependency injection state.<br />
							Function fn will be called at the time of union creation with one argument {'{'} union, diMap {'}'}, 
							where union is actual union, and diMap is Map (key -> diValue)
						</>
					)}
				>
					<UI.Code value={examples.mutate} />
				</UI.Method>
				<UI.Method 
					title="useUnion.asIs"
					args={[
						{ 
							argument: 'atom', 
							type: 'any', 
							defaultValue: '', 
							description: 'Atom'
						}
					]}
					description="Allows to set value to union without any mutations"
				>
					<UI.Code value={examples.asIs} />
				</UI.Method>
				<UI.Method 
					title="useUnion.from"
					args={[
						{ 
							argument: 'template', 
							type: 'object', 
							defaultValue: '', 
							description: 'Union template'
						}
					]}
					description="Creates new union from template"
				>
					<UI.Code value={examples.from} />
				</UI.Method>
				<Typography variant="h6">
					State fabrics
				</Typography>
				<UI.Method 
					title="useUnion.store"
					args={[
						{ 
							argument: 'value', 
							type: 'any', 
							defaultValue: '', 
							description: 'Store value'
						}
					]}
					description={(
						<div>
							Creates new 
							<a href="/#!/api/state/store">
								Store 
							</a>
							in union.
						</div>
					)}
				>
					<UI.Code value={examples.store} />
				</UI.Method>
				<UI.Method 
					title="useUnion.mart"
					args={[
						{ 
							argument: 'martFn', 
							type: 'function', 
							defaultValue: '', 
							description: 'Function to calculate mart value'
						},
						{ 
							argument: 'unionMap', 
							type: 'function', 
							defaultValue: '(x) => x', 
							description: 'Function to map mart union (With this argument you can control when to recalculate mart)'
						}
					]}
					description={(
						<div>
							Creates new 
							<a href="/#!/api/state/mart">
								Mart 
							</a>
							in union
						</div>
					)}
				>
					<UI.Code value={examples.mart} />
				</UI.Method>
				<UI.Method 
					title="useUnion.transaction"
					args={[
						{ 
							argument: 'fn', 
							type: 'function', 
							defaultValue: '', 
							description: 'Transaction function'
						},
						{ 
							argument: 'unionMap', 
							type: 'function', 
							defaultValue: '(x) => x', 
							description: 'Function to map transaction union'
						}
					]}
					description={(
						<div>
							Creates new 
							<a href="/#!/api/state/transaction">
								Transaction 
							</a>
							in union
						</div>
					)}
				>
					<UI.Code value={examples.transaction} />
				</UI.Method>
				<UI.Method 
					title="useUnion.effect"
					args={[
						{ 
							argument: 'fn', 
							type: 'function', 
							defaultValue: '', 
							description: 'Effect function'
						},
						{ 
							argument: 'unionMap', 
							type: 'function', 
							defaultValue: '(x) => x', 
							description: 'Function to map effect union'
						}
					]}
					description={(
						<div>
							Creates new 
							<a href="/#!/api/state/effect">
								Effect
							</a>
							in union
						</div>
					)}
				>
					<UI.Code value={examples.effect} />
				</UI.Method>
				<UI.Method 
					title="useUnion.arrayStore"
					args={[
						{ 
							argument: 'atom', 
							type: 'Array', 
							defaultValue: '[ ]', 
							description: 'Store value'
						}
					]}
					description={(
						<div>
							Creates new 
							<a href="/#!/api/state/array-store">
								ArrayStore 
							</a>
							in union
						</div>
					)}
				>
					<UI.Code value={examples.arrayStore} />
				</UI.Method>
				<UI.Method 
					title="useUnion.mapStore"
					args={[
						{ 
							argument: 'atom', 
							type: 'Map', 
							defaultValue: 'new Map()', 
							description: 'Store value'
						}
					]}
					description={(
						<div>
							Creates new 
							<a href="/#!/api/state/map-store">
								MapStore 
							</a>
							in union
						</div>
					)}
				>
					<UI.Code value={examples.mapStore} />
				</UI.Method>
				<UI.Method 
					title="useUnion.booleanStore"
					args={[
						{ 
							argument: 'atom', 
							type: 'Boolean', 
							defaultValue: 'false', 
							description: 'Store value'
						}
					]}
					description={(
						<div>
							Creates new 
							<a href="/#!/api/state/boolean-store">
								BooleanStore 
							</a>
							in union
						</div>
					)}
				>
					<UI.Code value={examples.booleanStore} />
				</UI.Method>
				<UI.Method 
					title="useUnion.numberStore"
					args={[
						{ 
							argument: 'atom', 
							type: 'Number', 
							defaultValue: '0', 
							description: 'Store value'
						}
					]}
					description={(
						<div>
							Creates new 
							<a href="/#!/api/state/number-store">
								NumberStore 
							</a>
							in union
						</div>
					)}
				>
					<UI.Code value={examples.numberStore} />
				</UI.Method>
				<UI.Method 
					title="useUnion.objectStore"
					args={[
						{ 
							argument: 'atom', 
							type: 'Object or null', 
							defaultValue: '', 
							description: 'Store value'
						}
					]}
					description={(
						<div>
							Creates new 
							<a href="/#!/api/state/object-store">
								ObjectStore 
							</a>
							in union
						</div>
					)}
				>
					<UI.Code value={examples.objectStore} />
				</UI.Method>
			</UI.Article>
		</>
	)
}

const examples = {
	atom: `const template = {
	name: '',
	setName: ({ mutations }, newName) => mutations.name.setValue(newName)
}

// Union
// const union = {}
// union.name = new Store('')
// union.setName = new Transaction(union, ({ mutations }, event) => mutations.name.setValue(event.target.value))

const MyComponent = () => {
	const state = useUnion(template)
	const name = state.name       // Value of store union.name
	const setName = state.setName // Method execute of transaction union.setName

	return <input value={name} onChange={setName} />
}
`,
	atomAll: `const template = {
	description: useUnion.mutate(({ union, diMap }) => 
		\`Union keys count: \${Object.keys(union)}. Global keys: \${Array.from(diMap.keys()).length}\`
	),
	getMe: useUnion.asIs(api.users.getMe),
	menu: useUnion.from({
		open: false,
		toggle: ({ value, mutations }) => mutations.open.toggle()
	}),
	store: '',                 // or useUnion.store('')
	undefinedStore: undefined, // or useUnion.store(),
	arrayStore: [],            // or useUnion.arrayStore([ ]),
	mapStore: new Map(),       // or useUnion.mapStore(new Map()),
	numberStore: 42,           // or useUnion.numberStore(42),
	booleanStore: true,        // or useUnion.booleanStore(true),
	objectStore: {},           // or useUnion.objectStore(42),
	nullStore: null,           // or useUnion.objectStore(null),
	mart: useUnion.mart(       // create mart 
		(value) => value * 2,
		({ numberStore }) => numberStore
	),
	transaction: ({ mutations }, value) => // create transaction
		mutations.numberStore.setValue(value),
	anotherTransaction: useUnion.transaction(
		({ mutations }, value) => mutations.setValue(value),
		({ numberStore }) => numberStore
	),
	effect: useUnion.effect( // create effect
		({ q }) => console.log(\`store changed (value=\${q})\`),
		({ store }) => { q: store }
	),
	// Dependency Injection
	user: useUnion.global('user', useUnion.from({ 
		userName: '',
		setUserName: ({ mutations }, value) => mutations.userName.setValue(value)
	})),
	injection: useUnion.inject('user')
}`,
	atomUnion: `const union = {}
union.description = 'Union keys count: 0. Global keys: 0'
union.getMe = api.users.getMe
union.menu = {}
union.menu.open = new BooleanStore(false)
union.menu.toggle = new Transaction(union.menu, ({ mutations }) => mutations.open.toggle())
union.store = new Store('')
union.undefinedStore = new Store()
union.arrayStore = new ArrayStore([])
union.mapStore = new MapStore(new Map())
union.numberStore = new NumberStore(42)
union.booleanStore = new BooleanStore(true)
union.objectStore = new ObjectStore({})
union.nullStore = new ObjectStore(null)
union.mart = new Mart(union.numberStore, (value) => value * 2)
union.transaction = new Transaction(union, ({ mutations }, value) => mutations.numberStore.setValue(value))
union.anotherTransaction = new Transaction(union.numberStore, ({ mutations }, value) => mutations.setValue(value))
union.effect = new Effect({ q: union.store }, ({ q }) => console.log(\`store changed (value=\${q})\`))
union.user = {
	userName: new Store(''),
	setUserName: new Transaction(union.user, ({ mutations }, value) => mutations.userName.setValue(value))
}
union.injection = union.user`,
	di: `import { DIProvider } from '@uniono/react'
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

ReactDOM.render(
	<React.StrictMode>
		<DIProvider>
			<App />
		</DIProvider>
	</React.StrictMode>,
	document.getElementById('root')
);`,
	global: `{
	user: useUnion.global('user', useUnion.from({ 
		userName: '',
		setUserName: ({ mutations }, value) => mutations.userName.setValue(value)
	})),
	api: useUnion.global('api', useUnion.asIs(api))
}`,
	inject: `{
	api: useUnion.inject('api')
}`,
	mutate: `description: useUnion.mutate(({ union, diMap }) => 
	\`Union keys count: \${Object.keys(union)}. Global keys: \${Array.from(diMap.keys()).length}\`
)`,
	asIs: `{
	getMe: useUnion.asIs(api.users.getMe)
}`,
	from: `{
	menu: useUnion.from({
		open: false,
		toggle: ({ value, mutations }) => mutations.open.toggle()
	})
}`,
	store: `{
  str: useUnion.store(''),
  num: useUnion.store(42),
}`,
	mart: `{
	tab: 'all',
	tasks: [],
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
	)
}`,
	transaction: `{
	input: '',
	tasks: [],
	addTask: useUnion.transaction(
		({ value, mutations }) => {
			const { input } = value()
			const title = input.trim()
			if (title.length === 0) {
				return
			}
	
			mutations.input.setValue('')
			mutations.tasks.unshift({ done: false, title })
		}
	)
}`,
effect: `{
	q: '',
	qEffect: useUnion.effect(
		debounce(({ mutations }, q) => mutations.loadEntities(q), 300),
		({ q }) => q
	)
}`,
	arrayStore: `{
	items: useUnion.arrayStore([ 2, 4, 8, 16 ]) 
	// or items: [ 2, 4, 8, 16 ]
}`,
	mapStore: `{
	map: useUnion.mapStore(new Map())
	// or map: new Map()
}`,
	booleanStore: `{
	visible: useUnion.booleamStore(true)
	// or visible: true
}`,
	numberStore: `{
	answer: useUnion.numberStore(42)
	// or answer: 42
}`,
	objectStore: `{
	user: useUnion.objectStore({ id: 42, login: 'vpupkin' })
	// or user: { id: 42, login: 'vpupkin' }
}`
}