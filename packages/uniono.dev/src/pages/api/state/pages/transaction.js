import Typography from '@material-ui/core/Typography'
import React from 'react'

import useArticle from '../../../../unions/article'
import Page from '../page'

export default () => {
	const { UI } = useArticle()

	return (
		<Page breadcrumb="transaction">
			<Typography variant="h5">
				Transaction
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
						defaultValue: '', 
						description: 'Transaction function'
					}
				]}
				description="Creates new Transaction"
			>
				<UI.Code value={examples.constructor} />
			</UI.Method>
			<Typography variant="h6">
				Methods
			</Typography>
			<UI.Method
				title="execute"
				args={[
					{ 
						argument: '...args', 
						type: 'any', 
						defaultValue: 'undefined', 
						description: 'Fn arguments'
					}
				]}
				description="Executes transaction"
			>
				<UI.Code value={examples.execute} />
			</UI.Method>
			<Typography variant="h5">
				TransactionEnvironment
			</Typography>
			<Typography variant="body1">
				TransactionEnvironment injects into transaction function as first argument, when trasnaction called
			</Typography>
			<UI.Code value={examples.transactionEnvironment} />
			<UI.Method
				title="transaction"
				description="Link to transaction"
			>
				<UI.Code value={examples.envTransaction} />
			</UI.Method>
			<UI.Method
				title="value"
				description="Function without arguments. Returns actual shadow state"
			>
				<UI.Code value={examples.envValue} />
			</UI.Method>
			<UI.Method
				title="mutations"
				description="Mapped transaction union, where all stores changed to mutations and transactions changed to execute function"
			>
				<UI.Code value={examples.envMutations} />
			</UI.Method>
			<UI.Method
				title="apply"
				description="Function without arguments, applies shadow stores to main"
			>
				<UI.Code value={examples.envApply} />
			</UI.Method>
			<UI.Method
				title="cancel"
				description="Function without arguments, cancels shadow stores mutations"
			>
				<UI.Code value={examples.envCancel} />
			</UI.Method>
		</Page>
	)
}

const examples = {
	constructor: `const x = new Store(0)
const y = new Store(0)
	
const setXY = new Transaction(
	{ x, y },
	({ mutations }, coord) => {
		mutations.x.setValue(coord.x)
		mutations.y.setValue(coord.y)
	}
)`,
	execute: `const x = new Store(0)
const y = new Store(0)

const setXY = new Transaction(
	{ x, y },
	({ mutations }, coord) => {
		mutations.x.setValue(coord.x)
		mutations.y.setValue(coord.y)
	}
)

setXY.execute({ x: 2, y: 5 })`,
	transactionEnvironment: `const x = new NumberStore(0)
const y = new Store(0)

const setXY = new Transaction(
	{ x, y },
	(env, coord) => {
		...
	}
)`,
	envTransaction: `const x = new Store(0)
const y = new Store(0)

const setXY = new Transaction(
	{ x, y },
	(env, coord) => {
		console.log(env.transaction === setXY) // true
	}
)`,
	envValue: `const x = new Store(0)
const y = new Store(1)

const setX = new Transaction(
	{ x },
	(env, newX) => env.mutations.x.setValue(newX)
)
const setY = new Transaction(
	{ y },
	(env, newY) => env.mutations.y.setValue(newY)
)
const setXY = new Transaction(
	{ x, y, setX, setY },
	(env, coord) => {
		console.log(env.value()) // { x: 0, y: 1, setX: setX.execute, setY: setY.execute }
	}
)`,
	envMutations: `const x = new NumberStore(0)
const y = new Store(1)

const setX = new Transaction(
	{ x },
	(env, newX) => env.mutations.x.setValue(newX)
)
const setY = new Transaction(
	{ y },
	(env, newY) => env.mutations.y.setValue(newY)
)
const setXY = new Transaction(
	{ x, y, setX, setY },
	(env, coord) => {
		console.log(env.mutations) 
		// { 
		//	 x: { setValue: fninc: fn, dec: fn }, 
		//   y: { setValue }, 
		//   setX: setX.execute, 
		//   setY: setY.execute 
	  // }
	}
)`,
	envApply: `const isLoading = new BooleanStore(false)
const q = new Store('')
	
const loadItems = new Transaction(
	{ isLoading, q },
	async (env) => {
		env.mutations.isLoading.setTrue()
		env.apply()
		...
	}
)`,
	envCancel: `const isLoading = new BooleanStore(false)
const q = new Store('')
	
const loadItems = new Transaction(
	{ isLoading, q },
	async (env) => {
		... 
		if (error) {
			env.cancel()
		}
		...
	}
)`
}