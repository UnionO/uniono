import Typography from '@material-ui/core/Typography'
import React from 'react'

import useArticle from '../../../../unions/article'
import Page from '../page'

export default () => {
	const { UI } = useArticle()

	return (
		<Page breadcrumb="BooleanStore">
			<Typography variant="h4">
				Boolean store
			</Typography>
			<UI.Method 
				title="Constructor"
				args={[
					{ 
						argument: 'value', 
						type: 'boolean', 
						defaultValue: 'false', 
						description: 'Store value'
					}
				]}
				description="Creates new BooleanStore instance"
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
				title="setTrue"
				description="Sets value to true and notifies subscribers"
			>
				<UI.Code value={samples.setTrue} />
			</UI.Method>
			<UI.Method 
				title="setFalse"
				description="Sets value to false and notifies subscribers"
			>
				<UI.Code value={samples.setFalse} />
			</UI.Method>
			<UI.Method 
				title="toggle"
				description="Toggles value"
			>
				<UI.Code value={samples.toggle} />
			</UI.Method>
		</Page>
	)
}

const samples = {
	constructor: `import BooleanStore from '@union/state/lib/store/boolean'

new BooleanStore(false)
new BooleanStore(true)`,
	setTrue: `store.mutations.setTrue()

console.log(store.value) // true`,
	setFalse: `store.mutations.setFalse()

console.log(store.value) // false`,
	toggle: `store.mutations.setTrue()

store.mutations.toggle()
console.log(store.value) // false

store.mutations.toggle()
console.log(store.value) // true`
}