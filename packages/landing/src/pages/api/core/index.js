import Typography from '@material-ui/core/Typography'
import React from 'react'

import useArticle from '../../../unions/article'

export default () => {
	const { UI } = useArticle()

	return (
		<UI.Article>
			<Typography variant="h5">
				@uniono/core
			</Typography>
			<Typography variant="body1">
				Library contains one class - Union. This class is intended to manipulate any structure or object.
			</Typography>
			<Typography variant="h5">
				Class Union
			</Typography>
			<UI.Method 
				title="Constructor"
				args={[
					{ 
						argument: 'isAtom', 
						type: 'function', 
						defaultValue: '', 
						description: 'Function is a predicate to test each part of the union'
					}
				]}
				description="Creates new Union instance"
			>
				<UI.Code value={samples.constructor} />
			</UI.Method>
			<UI.Method 
				title="union.map"
				args={[
					{ 
						argument: 'union', 
						type: 'any', 
						defaultValue: '', 
						description: 'Union'
					},
					{ 
						argument: 'mapFn', 
						type: 'function', 
						defaultValue: '', 
						description: ''
					}
				]}
				description="Creates new union with mapped atoms"
			>
				<UI.Code value={samples.map} />
			</UI.Method>
			<UI.Method 
				title="union.forEach"
				args={[
					{ 
						argument: 'union', 
						type: 'any', 
						defaultValue: '', 
						description: 'Union'
					},
					{ 
						argument: 'fn', 
						type: 'function', 
						defaultValue: '', 
						description: ''
					}
				]}
				description="Executes a provided function once for each union atom"
			>
				<UI.Code value={samples.forEach} />
			</UI.Method>
			<UI.Method 
				title="union.flat"
				args={[
					{ 
						argument: 'union', 
						type: 'any', 
						defaultValue: '', 
						description: 'Union'
					}
				]}
				description="Returns array of all union atoms"
			>
				<UI.Code value={samples.flat} />
			</UI.Method>
		</UI.Article>
	)
}

const samples = {
	constructor: `const arrayUnion = new Union((a) => Array.isArray(a))`,
	map: `const booleanUnion = new Union((a) => typeof a === 'boolean')

console.log(booleanUnion.map({ a: true, b: 'true' }, (x) => !x)) // { a: false, b: 'true' }`,
	forEach: `const booleanUnion = new Union((a) => typeof a === 'boolean')
	
booleanUnion.forEach(
	{ a: true, b: false, n: 42, c: [ true, false ] },
	(item) => console.log(item)
)
// true 
// false
// true 
// false`,
	flat: `const booleanUnion = new Union((a) => typeof a === 'boolean')
	
console.log(booleanUnion.flat({ a: true, b: false, n: 42, c: [ true, false ] }))
// [ true, false, true, false ]`
}

