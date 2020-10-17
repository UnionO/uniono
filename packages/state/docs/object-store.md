# ObjectStore

#### Constructor

Creates new ObjectStore instance

| Argument  | Type    | Default    | Description  |
|-----------|---------|------------|--------------|
| value     | object  | undefined  | Store value  |

```javascript
import ObjectStore from '@union/state/lib/store/object'

new ObjectStore({})
```

### Mutations

All mutation methods change store values and notify subscribers

#### setValue

Sets new value and notifies subscribers

| Argument  | Type    | Default    | Description  |
|-----------|---------|------------|--------------|
| newValue  | object  | undefined  | New value    |

```javascript
store.mutations.setValue({ answer: 42 })

console.log(store.value) // { answer: 42 }
```

#### merge

Merge part

| Argument  | Type    | Default  | Description  |
|-----------|---------|----------|--------------|
| part      | object  |          | Source       |

```javascript
const store = new ObjectStore({ bar: 'foo', answer: 21 })
	
store.mutations.merge({ answer: 42, new: true })

console.log(store.value) // { bar: 'foo', answer: 42, new: true }
```

#### setNull

Set value to null

```javascript
store.mutations.setNull()

console.log(store.value) // null
```

#### setUndefined

Set value to undefined

```javascript
store.mutations.setUndefined()

console.log(store.value) // undefined
```
