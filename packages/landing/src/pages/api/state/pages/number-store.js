import Typography from '@material-ui/core/Typography'
import React from 'react'

import useArticle from '../../../../unions/article'
import Page from '../page'

export default () => {
	const { UI } = useArticle()

	return (
		<Page breadcrumb="NumberStore">
			<Typography variant="h4">
				Number store
			</Typography>
			<UI.Method 
				title="Constructor"
				args={[
					{ 
						argument: 'value', 
						type: 'number', 
						defaultValue: '0', 
						description: 'Store value'
					}
				]}
				description="Creates new NumberStore instance"
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
						type: 'number', 
						defaultValue: '', 
						description: 'New value'
					}
				]}
				description="Sets new value and notifies subscribers"
			>
				<UI.Code value={samples.setValue} />
			</UI.Method>
			<UI.Method 
				title="inc"
				args={[
					{ 
						argument: 'delta', 
						type: 'number', 
						defaultValue: '1', 
						description: 'Delta'
					}
				]}
				description="Increments value"
			>
				<UI.Code value={samples.inc} />
			</UI.Method>
			<UI.Method 
				title="dec"
				args={[
					{ 
						argument: 'delta', 
						type: 'number', 
						defaultValue: '1', 
						description: 'Delta'
					}
				]}
				description="Decrements value"
			>
				<UI.Code value={samples.dec} />
			</UI.Method>
		</Page>
	)
}

const samples = {
	constructor: `import NumberStore from '@union/state/lib/store/number'

new NumberStore() // new NumberStore(0)
new NumberStore(42)`,
	setValue: `store.mutations.setValue(42)

console.log(store.value) // 42`,
	inc: `const store = new NumberStore(38)

console.log(store.inc(3))	// 41
console.log(store.inc())	// 42

console.log(store.value)	// 42`,
	dec: `const store = new NumberStore(50)

console.log(store.dec(7))	// 43
console.log(store.dec())	// 42

console.log(store.value)	// 42`
}