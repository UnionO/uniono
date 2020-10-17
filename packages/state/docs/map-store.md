# MapStore

#### Constructor

Creates new MapStore instance

| Argument        | Type  | Default    | Description  |
|-----------------|-------|------------|--------------|
| value           | Map   | new Map()  | Store value  |

```javascript
import MapStore from '@union/state/lib/store/array'

new MapStore()          // new MapStore(new Map())
new MapStore(10)        // new MapStore(new Map())
new MapStore(new Map()) // new MapStore(new Map())
new MapStore(new Map([ [ 'key', 'key-value' ] ]))
```

### Mutations

All mutation methods change store values and notify subscribers

#### setValue

Sets new value and notifies subscribers

| Argument  | Type   | Default    | Description  |
|-----------|--------|------------|--------------|
| newValue  | Map    | undefined  | New value    |

```javascript
store.mutations.setValue(new Map())

console.log(store.value) // Map {}
```

#### clear

The clear() method removes all elements from a Map object

```javascript
store.mutations.clear()

console.log(store.value) // Map {}
```

#### delete

The delete() method removes the specified element from a Map object by key

| Argument  | Type  | Default    | Description                                           |
|-----------|-------|------------|-------------------------------------------------------|
| key       | any   | undefined  | The key of the element to remove from the Map object  |

```javascript
const store = new MapStore([ [ 'bar', 'foo' ] ])
	
console.log(store.mutations.delete('bar')) // true (indicates successful removal)
	
console.log(store.value.has('bar')) // false
```

#### set

The set() method adds (or updates) an element with a specified key and a value to a Map object

| Argument  | Type  | Default    | Description                                        |
|-----------|-------|------------|----------------------------------------------------|
| key       | any   | undefined  | The key of the element to add to the Map object    |
| value     | any   | undefined  | The value of the element to add to the Map object  |

```javascript
const store = new MapStore()
	
store.mutations.set('bar', 'foo')
	
console.log(store.value.get('bar')) // "foo"
```