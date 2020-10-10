import Typography from '@material-ui/core/Typography'
import React from 'react'

import useArticle from '../../../../unions/article'
import Page from '../page'

export default () => {
	const { UI } = useArticle()

	return (
		<Page breadcrumb="Store">
			<Typography variant="h4">
				Store
			</Typography>
			<UI.Method 
				title="Constructor"
				args={[
					{ 
						argument: 'value', 
						type: 'any', 
						defaultValue: 'undefined', 
						description: 'Store value'
					},
					{ 
						argument: 'MutationsClass', 
						type: 'function', 
						defaultValue: 'StoreMutations', 
						description: 'Store mutations class'
					}
				]}
				description="Creates new Store instance"
			>
				<UI.Code value={samples.constructor} />
			</UI.Method>
			<Typography variant="h5">
				Mutations
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
		</Page>
	)
}

const samples = {
	constructor: `import Store from '@union/state/lib/store'

new Store()   									// [value=undefined, MutationsClass=StoreMutations]
new Store(42) 									// [value=42, MutationsClass=StoreMutations]
new Store(42, MyMutationsClass) // [value=42, MutationsClass=MyMutationsClass]`,
	setValue: `store.mutations.setValue(42)

store.mutations.setValue()`
}