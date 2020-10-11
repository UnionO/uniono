import Typography from '@material-ui/core/Typography'
import React from 'react'

import useArticle from '../../../../unions/article'
import Page from '../page'

export default () => {
	const { UI } = useArticle()

	return (
		<Page breadcrumb="MapStore">
			<Typography variant="h4">
				Map Store
			</Typography>
			<UI.Method 
				title="Constructor"
				args={[
					{ 
						argument: 'value', 
						type: 'Map', 
						defaultValue: 'new Map()', 
						description: 'Store value'
					}
				]}
				description="Creates new MapStore instance"
			>
				<UI.Code value={samples.constructor} />
			</UI.Method>
			<Typography variant="h5">
				Mutations
			</Typography>
			<Typography variant="body1">
				All mutation methods change store values and notify subscribers
			</Typography>
			<UI.Method 
				title="setValue"
				args={[
					{ 
						argument: 'newValue', 
						type: 'any', 
						defaultValue: 'undefined', 
						description: 'New value'
					}
				]}
				description="Sets new value and notifies subscribers"
			>
				<UI.Code value={samples.setValue} />
			</UI.Method>
			<UI.Method 
				title="clear"
				description="The clear() method removes all elements from a Map object"
			>
				<UI.Code value={samples.clear} />
			</UI.Method>
			<UI.Method 
				title="delete"
				args={[
					{ 
						argument: 'key', 
						type: 'any', 
						defaultValue: 'undefined', 
						description: 'The key of the element to remove from the Map object'
					}
				]}
				description="The delete() method removes the specified element from a Map object by key"
			>
				<UI.Code value={samples.delete} />
			</UI.Method>
			<UI.Method 
				title="set"
				args={[
					{ 
						argument: 'key', 
						type: 'any', 
						defaultValue: 'undefined', 
						description: 'The key of the element to add to the Map object'
					},
					{ 
						argument: 'value', 
						type: 'any', 
						defaultValue: 'undefined', 
						description: 'The value of the element to add to the Map object'
					}
				]}
				description="The set() method adds (or updates) an element with a specified key and a value to a Map object"
			>
				<UI.Code value={samples.set} />
			</UI.Method>
		
		</Page>
	)
}

const samples = {
	constructor: `import MapStore from '@union/state/lib/store/array'

new MapStore()          // new MapStore(new Map())
new MapStore(10)        // new MapStore(new Map())
new MapStore(new Map()) // new MapStore(new Map())
new MapStore(new Map([ [ 'key', 'key-value' ] ]))`,
	setValue: `store.mutations.setValue(new Map())

console.log(store.value) // Map {}`,
	clear: `store.mutations.clear()

console.log(store.value) // Map {}`,
	delete: `const store = new MapStore([ [ 'bar', 'foo' ] ])
	
console.log(store.mutations.delete('bar')) // true (indicates successful removal)
	
console.log(store.value.has('bar')) // false`,
	set: `const store = new MapStore()
	
store.mutations.set('bar', 'foo')
	
console.log(store.value.get('bar')) // "foo"`
}