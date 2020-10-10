import Typography from '@material-ui/core/Typography'
import React from 'react'

import useArticle from '../../../../unions/article'
import Page from '../page'

export default () => {
	const { UI } = useArticle()

	return (
		<Page breadcrumb="mart">
			<Typography variant="h5">
				Mart
			</Typography>
			<UI.Method
				title="Constructor"
				args={[
					{ 
						argument: 'union', 
						type: 'any', 
						defaultValue: 'undefined', 
						description: 'Mart union'
					},
					{
						argument: 'fn', 
						type: 'function', 
						defaultValue: '(x) => x', 
						description: 'Mart function'
					}
				]}
				description="Creates new Mart"
			>
				<Typography variant="body1">
					At the time of creation mart searches for all stores and marts in union and subscribes to their changes
				</Typography>
				<UI.Code value={examples.constructor} />
			</UI.Method>
		</Page>
	)
}

const examples = {
	constructor: `const store = new Store(1)
	
const q2 = new Mart(
	{ store }, 
	({ store }) => store * 2
)
const q3 = new Mart(
	{ store, q2 }, 
	({ store, q2 }) => 2 * store * (q2 + store - 2)
)

console.log(q2.value) // 2
console.log(q3.value) // 2

store.mutations.setValue(3)

console.log(q2.value) // 6
console.log(q3.value) // 42`
}