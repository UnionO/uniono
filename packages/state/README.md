# @uniono/state

State management implementation

## Stores

- [Store](https://uniono.dev/#!/api/state/store)
- [ArrayStore](https://uniono.dev/#!/api/state/array-store)
- [MapStore](https://uniono.dev/#!/api/state/map-store)
- [BooleanStore](https://uniono.dev/#!/api/state/boolean-store)
- [NumberStore](https://uniono.dev/#!/api/state/number-store)
- [ObjectStore](https://uniono.dev/#!/api/state/object-store)

## Mart

Marts allow to store pre-calculated data

```javascript
// ToDo Example
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
						throw new Error(`Unsupported tab ${JSON.stringify(tab)}`)
				}
		}),
		({ tab, tasks }) => ({ tab, tasks })
	),
	...
}
```

[More](https://uniono.dev/#!/api/state/mart)

## Transaction

Transactions allow you to batch-change the state of arbitrary stores

```javascript
// ToDo Example
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
}
```

[More](https://uniono.dev/#!/api/state/transaction)