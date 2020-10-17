# ArrayStore

#### Constructor

Creates new ArrayStore instance

| Argument        | Type   | Default  | Description  |
|-----------------|--------|----------|--------------|
| value           | Array  | []       | Store value  |

```javascript
import ArrayStore from '@union/state/lib/store/array'

new ArrayStore() // new ArrayStore([])
new Store([ 1, 2, 3, 5, 8 ])
```

### Mutations

All mutation methods change store values and notify subscribers

#### setValue

Sets new value and notifies subscribers

| Argument  | Type   | Default    | Description  |
|-----------|--------|------------|--------------|
| newValue  | Array  | undefined  | New value    |

```javascript
import ArrayStore from '@union/state/lib/store/array'

const store = new ArrayStore([])

store.mutations.setValue([ 2, 4, 8, 16 ])

console.log(store.value) // [ 2, 4, 8, 16 ]
```

#### fill

The fill() method changes all elements in an array to a static value (from a start index 0, by default, to an end index array.length) and returns the modified array.

| Argument  | Type    | Default     | Description                   |
|-----------|---------|-------------|-------------------------------|
| value     | any     | undefined   | Value to fill the array with  |
| start     | number  | 0           | Start index                   |
| end       | number  | arr.length  | End index                     |

```javascript
const store = new ArrayStore([1, 2, 3, 4])
	
console.log(store.mutations.fill(0, 2, 4))
// expected output: [1, 2, 0, 0]

console.log(store.value)
// expected output: [1, 2, 0, 0]
```

#### filter

The filter() method creates new array with all elements that pass the test (provided function)

| Argument  | Type      | Default  | Description  |
|-----------|-----------|----------|--------------|
| callback  | function  |          | Function is a predicate to test each element of the array. Returns a value that forces to true to keep the element, or false otherwise. It accepts three arguments: element, index, array |

```javascript
const store = new ArrayStore(['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'])

store.mutations.filter(word => word.length > 6)

console.log(store.value) // ["exuberant", "destruction", "present"]
```

#### flat

The flat() method creates new array with all sub-array elements concatenated into it recursively down to the specified depth. The result array becomes stores new value

| Argument  | Type    | Default  | Description                                                                       |
|-----------|---------|----------|-----------------------------------------------------------------------------------|
| depth     | number  | 1        | The depth level specifying how deep a nested array structure should be flattened  |

```javascript
const store = new ArrayStore([0, 1, 2, [3, 4]])

store.mutations.flat()

console.log(store.value) // expected output: [0, 1, 2, 3, 4]
```

#### flatMap

The flatMap() method returns a new array formed by applying a given callback function to each element of the array, and then flattening the result by one level. Identical to a map() followed by a flat() of depth 1, but slightly more efficient than calling those two methods separately. The result array becomes stores new value

| Argument  | Type      | Default  | Description  |
|-----------|-----------|----------|--------------|
| callback  | function  |          | Function that produces an element of the new Array. It acceps three arguments: currentValue, index, array
  |

```javascript
const store = new ArrayStore([1, 2, 3, 4])
	
store.mutations.flatMap(x => [x, x * 2])

console.log(store.value) // [1, 2, 2, 4, 3, 6, 4, 8]
```

#### map

The map() method creates a new array and fills it with the results of applying a provided function to every element in the calling array. The result array becomes stores new value

| Argument  | Type      | Default  | Description  |
|-----------|-----------|----------|--------------|
| callback  | function  |          | Function that is called for every element of arr. Each time callback executes, the returned value is added to new_array. Callback function accepts following arguments: currentValue, index, array  |

```javascript
const store = new ArrayStore([1, 4, 9, 16])
	
store.mutations.map(x => x * 2)

console.log(store.value) // [2, 8, 18, 32]
```

#### pop

The pop() method removes the last element from an array and returns that element. This method changes the length of the array

```javascript
const store = new ArrayStore([1, 4, 9, 16])
	
console.log(store.mutations.pop()) // 16

console.log(store.value) // [1, 4, 9]
```

#### push

The push() method adds one or more elements to the end of array and returns its new length

| Argument     | Type  | Default  | Description                                    |
|--------------|-------|----------|------------------------------------------------|
| ...elements  | any   |          | The element(s) to add to the end of the array  |

```javascript
const store = new ArrayStore([1, 4, 9, 16])
	
console.log(store.mutations.push(25, 36)) // 6

console.log(store.value) // [1, 4, 9, 16, 25, 36]
```

#### reverse

The reverse() method reverses an array in place. The first array element becomes the last, and the last array element becomes the first

```javascript
const store = new ArrayStore([1, 4, 9, 16])
	
store.mutations.reverse()

console.log(store.value) // [16, 9, 4, 1]
```

#### shift

The shift() method removes the first element from an array and returns that removed element. This method changes the length of the array

```javascript
const store = new ArrayStore([1, 2, 3])
	
const firstElement = store.mutations.shift() // 1

console.log(store.value) // [2, 3]
```

#### sort

The sort() method sorts the elements of an array in place and returns the sorted array. The default sort order is ascending, built upon converting the elements into strings, then comparing their sequences of UTF-16 code units values

| Argument         | Type      | Default  | Description                                       |
|------------------|-----------|----------|---------------------------------------------------|
| compareFunction  | function  |          | Specifies a function that defines the sort order  |

```javascript
const store = new ArrayStore(['1', '2', '3', '11'])

store.mutations.sort()

console.log(store.value) // ['1', '11', '2', '3']
```

#### splice

The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.

| Argument     | Type    | Default               | Description  |
|--------------|---------|-----------------------|--------------|
| start        | number  |                       | Index of the first element to change in array  |
| deleteCount  | number  | array.length - start  | An integer indicating the number of elements in the array to remove from start  |
| ...items     | any     |                       | The elements to add to the array, beginning from start. If you do not specify any elements, splice() will only remove elements from the array  |

```javascript
const store = new ArrayStore(['Jan', 'March', 'April', 'June'])

store.mutations.splice(1, 0, 'Feb')

console.log(store.value) // ["Jan", "Feb", "March", "April", "June"]
```

#### unshift

The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array

| Argument     | Type  | Default  | Description                                        |
|--------------|-------|----------|----------------------------------------------------|
| ...elements  | any   |          | The elements to add in the beginning of the array  |

```javascript
const store = new ArrayStore([9, 16])
	
console.log(store.mutations.unshift(1, 4)) // 4

console.log(store.value) // [1, 4, 9, 16]
```