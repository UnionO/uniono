# @uniono/react

The library is designed to work with [@uniono/state](https://uniono.dev/#!/api/state) in React.

## useUnion

### Import

```javascript
import useUnion from '@uniono/react'
```

### Description

Hook useUnion has one required argument (template: Object). Based on this template a union will be created. 
A similar key (for each key of the template) will be created in the union with value result of 
function useUnion.atom(env, template[key]).

```javascript
import useUnion from '@uniono/react'

const template = {
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
```

### Examples

```javascript
const template = {
	description: useUnion.mutate(({ union, diMap }) => 
		`Union keys count: ${Object.keys(union)}. Global keys: ${Array.from(diMap.keys()).length}`
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
	// Dependency Injection
	user: useUnion.global('user', useUnion.from({ 
		userName: '',
		setUserName: ({ mutations }, value) => mutations.userName.setValue(value)
	})),
	injection: useUnion.inject('user')
}
```

Template, which is used to create the next union

```javascript
const union = {}
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
union.user = {
	userName: new Store(''),
	setUserName: new Transaction(union.user, ({ mutations }, value) => mutations.userName.setValue(value))
}
union.injection = union.user
```

### Dependency Injection

Dependency Injection based on [React Context](https://ru.reactjs.org/docs/context.html).
The application must be wrapped in DIProvider.

```javascript
import { DIProvider } from '@uniono/react'
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
);
```

#### useUnion.global

Allows to set new value in DI

| Argument      | Type  | Default  | Description              |
|---------------|-------|----------|--------------------------|
| id            | any   |          | Injection id             |
| atomTemplate  | any   |          | Injection atom template  |

```javascript
{
	user: useUnion.global('user', useUnion.from({ 
		userName: '',
		setUserName: ({ mutations }, value) => mutations.userName.setValue(value)
	})),
	api: useUnion.global('api', useUnion.asIs(api))
}
```

#### useUnion.inject

Allow to inject atom from DI

| Argument     | Type      | Default   | Description    |
|--------------|-----------|-----------|----------------|
| id           | any       |           | Injection id   |
| map          | function  | (x) => x  | Map injection  |

```javascript
{
	usersApi: useUnion.inject('api', ({ users }) => users)
}
```

### Template mutations

#### useUnion.mutate

useUnion.mutate designed to create an atom based on union & dependency injection state.
Function fn will be called at the time of union creation with one argument { union, diMap }, where union is actual union, and diMap is Map (key -> diValue)

| Argument  | Type      | Default   | Description   |
|-----------|-----------|-----------|---------------|
| fn        | function  |           | Atom factory  |

```javascript
{
	description: useUnion.mutate(({ union, diMap }) => myTemplateAtom)
}
```

#### useUnion.asIs

Allows to set value to union without any mutations

| Argument | Type      | Default   | Description    |
|----------|-----------|-----------|----------------|
| atom     | any       |           | Template atom  |

```javascript
{
	getMe: useUnion.asIs(api.users.getMe)
}
```

#### useUnion.from

Creates new union from template

| Argument  | Type                | Default   | Description     |
|-----------|---------------------|-----------|-----------------|
| template  | object or function  |           | Union template  |

```javascript
{
	menu: useUnion.from({
		open: false,
		toggle: ({ value, mutations }) => mutations.open.toggle()
	})
}
```

### State fabrics

#### useUnion.store

Creates new [Store](https://uniono.dev/#!/api/state/store) in union

| Argument  | Type  | Default  | Description  |
|-----------|-------|----------|--------------|
| value     | any   |          | Store value  |

```javascript
{
  str: useUnion.store(''),
  num: useUnion.store(42),
}
```

#### useUnion.mart

Creates new [Mart](https://uniono.dev/#!/api/state/mart) in union

| Argument  | Type      | Default   | Description                                                                               |
|-----------|-----------|-----------|-------------------------------------------------------------------------------------------|
| martFn    | function  |           | Function to calculate mart value                                                          |
| unionMap  | function  | (x) => x  | Function to map mart union (With this argument you can control when to recalculate mart)  |

```javascript
{
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
						throw new Error(`Unsupported tab ${JSON.stringify(tab)}`)
				}
		}),
		({ tab, tasks }) => ({ tab, tasks })
	)
}
```

#### useUnion.transaction

Creates new [Transaction](https://uniono.dev/#!/api/state/transaction) in union

| Argument  | Type      | Default   | Description                        |
|-----------|-----------|-----------|------------------------------------|
| fn        | function  |           | Transaction function               |
| unionMap  | function  | (x) => x  | Function to map transaction union  |

```javascript
{
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
}
```

#### useUnion.arrayStore

Creates new [ArrayStore](https://uniono.dev/#!/api/state/array-store) in union

| Argument  | Type   | Default  | Description  |
|-----------|--------|----------|--------------|
| value     | Array  | []       | Store value  |

```javascript
{
	items: useUnion.arrayStore([ 2, 4, 8, 16 ]) 
	// or items: [ 2, 4, 8, 16 ]
}
```

#### useUnion.mapStore

Creates new [MapStore](https://uniono.dev/#!/api/state/map-store) in union

| Argument  | Type   | Default    | Description  |
|-----------|--------|------------|--------------|
| value     | Map    | new Map()  | Store value  |

```javascript
{
	map: useUnion.mapStore(new Map())
	// or map: new Map()
}
```

#### useUnion.booleanStore

Creates new [BooleanStore](https://uniono.dev/#!/api/state/boolean-store) in union

| Argument  | Type     | Default  | Description  |
|-----------|----------|----------|--------------|
| atom      | Boolean  | false    | Store value  |

```javascript
{
	visible: useUnion.booleamStore(true)
	// or visible: true
}
```

#### useUnion.numberStore

Creates new [NumberStore](https://uniono.dev/#!/api/state/number-store) in union

| Argument  | Type    | Default  | Description  |
|-----------|---------|----------|--------------|
| atom      | Number  | 0        | Store value  |

```javascript
{
	answer: useUnion.numberStore(42)
	// or answer: 42
}
```

#### useUnion.objectStore

Creates new [ObjectStore](https://uniono.dev/#!/api/state/object-store) in union

| Argument  | Type            | Default  | Description  |
|-----------|-----------------|----------|--------------|
| atom      | Object or null  |          | Store value  |

```javascript
{
	user: useUnion.objectStore({ id: 42, login: 'vpupkin' })
	// or user: { id: 42, login: 'vpupkin' }
}
```