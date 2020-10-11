import Typography from '@material-ui/core/Typography'
import React from 'react'

import useArticle from '../../../../unions/article'
import Page from '../page'

export default () => {
	const { UI } = useArticle()

	return (
		<Page breadcrumb="ArrayStore">
			<Typography variant="h4">
				Array Store
			</Typography>
			<UI.Method 
				title="Constructor"
				args={[
					{ 
						argument: 'value', 
						type: 'array', 
						defaultValue: '[]', 
						description: 'Store value'
					}
				]}
				description="Creates new ArrayStore instance"
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
				title="fill"
				args={[
					{ 
						argument: 'value', 
						type: 'any', 
						defaultValue: 'undefined', 
						description: 'Value to fill the array with'
					},
					{ 
						argument: 'start', 
						type: 'number', 
						defaultValue: '0', 
						description: 'Start index'
					},
					{ 
						argument: 'end', 
						type: 'number', 
						defaultValue: 'arr.length', 
						description: 'End index'
					}
				]}
				description="The fill() method changes all elements in an array to a static value (from a start index 0, by default, to an end index array.length) and returns the modified array."
			>
				<UI.Code value={samples.fill} />
			</UI.Method>
			<UI.Method 
				title="filter"
				args={[
					{ 
						argument: 'callback', 
						type: 'function', 
						defaultValue: '', 
						description: (
							<>
								Function is a predicate to test each element of the array.
								Returns a value that forces to true to keep the element, or false otherwise.<br />
								It accepts three arguments: element, index, array
							</>
						)
					}
				]}
				description="The filter() method creates new array with all elements that pass the test (provided function)"
			>
				<UI.Code value={samples.filter} />
			</UI.Method>
			<UI.Method 
				title="flat"
				args={[
					{ 
						argument: 'depth', 
						type: 'number', 
						defaultValue: '1', 
						description: 'The depth level specifying how deep a nested array structure should be flattened'
					}
				]}
				description="The flat() method creates new array with all sub-array elements concatenated into it recursively down to the specified depth. The result array becomes stores new value"
			>
				<UI.Code value={samples.flat} />
			</UI.Method>
			<UI.Method 
				title="flatMap"
				args={[
					{ 
						argument: 'callback', 
						type: 'function', 
						defaultValue: '', 
						description: 'Function that produces an element of the new Array. It acceps three arguments: currentValue, index, array'
					}
				]}
				description="The flatMap() method returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. Identical to a map() followed by a flat() of depth 1, but slightly more efficient than calling those two methods separately. The result array becomes stores new value"
			>
				<UI.Code value={samples.flatMap} />
			</UI.Method>
			<UI.Method 
				title="map"
				args={[
					{ 
						argument: 'callback', 
						type: 'function', 
						defaultValue: '', 
						description: 'Function that is called for every element of arr. Each time callback executes, the returned value is added to new_array. Callback function accepts following arguments: currentValue, index, array'
					}
				]}
				description="The map() method creates a new array and fills it with the results of applying a provided function to every element in the calling array. The result array becomes stores new value"
			>
				<UI.Code value={samples.map} />
			</UI.Method>
			<UI.Method 
				title="pop"
				description="The pop() method removes the last element from an array and returns that element. This method changes the length of the array"
			>
				<UI.Code value={samples.pop} />
			</UI.Method>
			<UI.Method 
				title="push"
				args={[
					{ 
						argument: '...elements', 
						type: 'any', 
						defaultValue: '', 
						description: 'The element(s) to add to the end of the array'
					}
				]}
				description="The push() method adds one or more elements to the end of array and returns its new length"
			>
				<UI.Code value={samples.push} />
			</UI.Method>
			<UI.Method 
				title="reverse"
				description="The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first"
			>
				<UI.Code value={samples.reverse} />
			</UI.Method>
			<UI.Method 
				title="shift"
				description="The shift() method removes the first element from an array and returns that removed element. This method changes the length of the array"
			>
				<UI.Code value={samples.shift} />
			</UI.Method>
			<UI.Method 
				title="sort"
				args={[
					{ 
						argument: 'compareFunction', 
						type: 'function', 
						defaultValue: '', 
						description: 'Specifies a function that defines the sort order'
					}
				]}
				description="The sort() method sorts the elements of an array in place and returns the sorted array. The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values"
			>
				<UI.Code value={samples.sort} />
			</UI.Method>
			<UI.Method 
				title="splice"
				args={[
					{ 
						argument: 'start', 
						type: 'number', 
						defaultValue: '', 
						description: 'Index of the first element to change in array'
					},
					{ 
						argument: 'deleteCount', 
						type: 'number', 
						defaultValue: 'array.length - start', 
						description: 'An integer indicating the number of elements in the array to remove from start'
					},
					{ 
						argument: '...items', 
						type: 'any', 
						defaultValue: '', 
						description: 'The elements to add to the array, beginning from start. If you do not specify any elements, splice() will only remove elements from the array'
					}
				]}
				description="The sort() method sorts the elements of an array in place and returns the sorted array. The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values."
			>
				<UI.Code value={samples.splice} />
			</UI.Method>
			<UI.Method 
				title="unshift"
				args={[
					{ 
						argument: '...elements', 
						type: 'any', 
						defaultValue: '', 
						description: 'The elements to add in the beginning of the array.'
					}
				]}
				description="The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array"
			>
				<UI.Code value={samples.unshift} />
			</UI.Method>
		</Page>
	)
}

const samples = {
	constructor: `import ArrayStore from '@union/state/lib/store/array'

new ArrayStore() // new ArrayStore([])
new Store([ 1, 2, 3, 5, 8 ])`,
	setValue: `store.mutations.setValue([])

store.mutations.setValue([ 2, 4, 8, 16 ])

console.log(store.value) // [ 2, 4, 8, 16 ]`,
	fill: `const store = new ArrayStore([1, 2, 3, 4])
	
console.log(store.mutations.fill(0, 2, 4))
// expected output: [1, 2, 0, 0]

console.log(store.value)
// expected output: [1, 2, 0, 0]`,
	filter: `const store = new ArrayStore(['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'])

store.mutations.filter(word => word.length > 6)

console.log(store.value) // ["exuberant", "destruction", "present"]`,
	flat: `const store = new ArrayStore([0, 1, 2, [3, 4]])

store.mutations.flat()

console.log(store.value) // expected output: [0, 1, 2, 3, 4]`,
	flatMap: `const store = new ArrayStore([1, 2, 3, 4])
	
store.mutations.flatMap(x => [x, x * 2])

console.log(store.value) // [1, 2, 2, 4, 3, 6, 4, 8]`,
	map: `const store = new ArrayStore([1, 4, 9, 16])
	
store.mutations.map(x => x * 2)

console.log(store.value) // [2, 8, 18, 32]`,
	pop: `const store = new ArrayStore([1, 4, 9, 16])
	
console.log(store.mutations.pop()) // 16

console.log(store.value) // [1, 4, 9]`,
	push: `const store = new ArrayStore([1, 4, 9, 16])
	
console.log(store.mutations.push(25, 36)) // 6

console.log(store.value) // [1, 4, 9, 16, 25, 36]`,
	reverse: `const store = new ArrayStore([1, 4, 9, 16])
	
store.mutations.reverse()

console.log(store.value) // [16, 9, 4, 1]`,
	shift: `const store = new ArrayStore([1, 2, 3])
	
const firstElement = store.mutations.shift() // 1

console.log(store.value) // [2, 3]`,
	sort: `const store = new ArrayStore(['1', '2', '3', '11'])

store.mutations.sort()

console.log(store.value) // ['1', '11', '2', '3']`,
	splice: `const store = new ArrayStore(['Jan', 'March', 'April', 'June'])

store.mutations.splice(1, 0, 'Feb')

console.log(store.value) // ["Jan", "Feb", "March", "April", "June"]`,
	unshift: `const store = new ArrayStore([9, 16])
	
console.log(store.mutations.unshift(1, 4)) // 4

console.log(store.value) // [1, 4, 9, 16]`,
}