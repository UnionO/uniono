import Typography from '@material-ui/core/Typography'
import React from 'react'

import useArticle from '../../../../unions/article'
import Page from '../page'

export default () => {
	const { UI } = useArticle()

	return (
		<Page breadcrumb="ObjectStore">
			<Typography variant="h4">
				Object store
			</Typography>
			<UI.Method 
				title="Constructor"
				args={[
					{ 
						argument: 'value', 
						type: 'object', 
						defaultValue: 'undefined', 
						description: 'Store value'
					}
				]}
				description="Creates new ObjectStore instance"
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
						type: 'object', 
						defaultValue: '', 
						description: 'New value'
					}
				]}
				description="Sets new value and notifies subscribers"
			>
				<UI.Code value={samples.setValue} />
			</UI.Method>
			<UI.Method 
				title="merge"
				args={[
					{ 
						argument: 'part', 
						type: 'object', 
						defaultValue: '', 
						description: 'Source'
					}
				]}
				description="Merge part"
			>
				<UI.Code value={samples.merge} />
			</UI.Method>
			<UI.Method 
				title="setNull"
				description="Set value to null"
			>
				<UI.Code value={samples.setNull} />
			</UI.Method>
			<UI.Method 
				title="setUndefined"
				description="Set value to undefined"
			>
				<UI.Code value={samples.setUndefined} />
			</UI.Method>
		</Page>
	)
}

const samples = {
	constructor: `import ObjectStore from '@union/state/lib/store/object'

new ObjectStore({})`,
	setValue: `store.mutations.setValue({ answer: 42 })

console.log(store.value) // { answer: 42 }`,
	merge: `const store = new ObjectStore({ bar: 'foo', answer: 21 })
	
store.mutations.merge({ answer: 42, new: true })

console.log(store.value) // { bar: 'foo', answer: 42, new: true }`,
	setNull: `store.mutations.setNull()

console.log(store.value) // null`,
setUndefined: `store.mutations.setUndefined()

console.log(store.value) // undefined`
}