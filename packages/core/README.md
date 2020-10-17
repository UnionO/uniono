# @uniono/core

Library contains one class - Union. This class is intended to manipulate any structure or object.

### Union

#### Constructor

Creates new Union instance

| Argument  | Type      | Default  | Description              	                             |
|-----------|-----------|----------|---------------------------------------------------------|
| isAtom    | function  |          | Function is a predicate to test each part of the union  |

```javascript
const arrayUnion = new Union((a) => Array.isArray(a))
```

#### union.map

Creates new union with mapped atoms

| Argument  | Type      | Default  | Description   |
|-----------|-----------|----------|---------------|
| union     | any       |          | Union         |
| mapFn     | function  |          | Map function  |

```javascript
const booleanUnion = new Union((a) => typeof a === 'boolean')

console.log(booleanUnion.map({ a: true, b: 'true' }, (x) => !x)) // { a: false, b: 'true' }
```

#### union.forEach

Executes a provided function once for each union atom

| Argument  | Type      | Default  | Description   |
|-----------|-----------|----------|---------------|
| union     | any       |          | Union         |
| fn        | function  |          |               |

```javascript
const booleanUnion = new Union((a) => typeof a === 'boolean')
	
booleanUnion.forEach(
	{ a: true, b: false, n: 42, c: [ true, false ] },
	(item) => console.log(item)
)
// true 
// false
// true 
// false
```

#### union.flat

Executes a provided function once for each union atom

| Argument  | Type      | Default  | Description   |
|-----------|-----------|----------|---------------|
| union     | any       |          | Union         |

```javascript
const booleanUnion = new Union((a) => typeof a === 'boolean')
	
console.log(booleanUnion.flat({ a: true, b: false, n: 42, c: [ true, false ] }))
// [ true, false, true, false ]
```