import Typography from '@material-ui/core/Typography'
import React from 'react'

import useArticle from '../../../../unions/article'
import Page from '../page'

export default () => {
	const { UI } = useArticle()

	return (
		<Page breadcrumb="effect">
			<Typography variant="h5">
				Effect
			</Typography>
			<UI.Method
				title="Constructor"
				args={[
					{ 
						argument: 'trigger', 
						type: 'any', 
						defaultValue: 'undefined', 
						description: 'Triggers union (any changes of stores or marts in this union calls transaction)'
					},
					{
						argument: 'transaction', 
						type: 'Transaction', 
						defaultValue: '(x) => x', 
						description: 'Mart function'
					}
				]}
				description="Creates new Effect"
			>
				<Typography variant="body1">
					At the time of creation effect searches for all stores, marts in union and subscribes to their changes
				</Typography>
				<UI.Code value={examples.constructor} />
			</UI.Method>
		</Page>
	)
}

const examples = {
	constructor: `const q = new Store('')

const items = new ArrayStore([])
const loadItems = new Transaction(
	{ items }, 
	async ({ q }) => {
		...
	}
)

const effect = new Effect({ q }, loadItems)`
}