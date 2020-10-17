# BooleanStore

#### Constructor

Creates new BooleanStore instance

| Argument  | Type     | Default  | Description  |
|-----------|----------|----------|--------------|
| value     | boolean  | false    | Store value  |

```javascript
import BooleanStore from '@union/state/lib/store/boolean'

new BooleanStore(false)
new BooleanStore(true)
```

### Mutations

All mutation methods change store values and notify subscribers

#### setValue

Sets new value and notifies subscribers

| Argument  | Type     | Default    | Description  |
|-----------|----------|------------|--------------|
| newValue  | boolean  | false      | Store value  |

```javascript
store.mutations.setValue(true)

console.log(store.value) // true
```

#### setTrue

Sets value to true and notifies subscribers

```javascript
store.mutations.setTrue()

console.log(store.value) // true
```

#### setFalse

Sets value to false and notifies subscribers

```javascript
store.mutations.setFalse()

console.log(store.value) // false
```

#### toggle

Toggles value

```javascript
store.mutations.setTrue()

store.mutations.toggle()
console.log(store.value) // false

store.mutations.toggle()
console.log(store.value) // true
```
