# NumberStore

#### Constructor

Creates new NumberStore instance

| Argument  | Type    | Default  | Description  |
|-----------|---------|----------|--------------|
| value     | number  | 0        | Store value  |

```javascript
import NumberStore from '@union/state/lib/store/number'

new NumberStore() // new NumberStore(0)
new NumberStore(42)
```

### Mutations

All mutation methods change store values and notify subscribers

#### setValue

Sets new value and notifies subscribers

| Argument  | Type    | Default  | Description  |
|-----------|---------|----------|--------------|
| newValue  | number  | 0        | New value    |

```javascript
store.mutations.setValue(42)

console.log(store.value) // 42
```

#### inc

Increments value

| Argument  | Type    | Default  | Description  |
|-----------|---------|----------|--------------|
| delta     | number  | 1        | Delta        |

```javascript
const store = new NumberStore(38)

console.log(store.inc(3))	// 41
console.log(store.inc())	// 42

console.log(store.value)	// 42
```

#### dec

Decrements value

| Argument  | Type    | Default  | Description  |
|-----------|---------|----------|--------------|
| delta     | number  | 1        | Delta        |

```javascript
const store = new NumberStore(50)

console.log(store.dec(7))	// 43
console.log(store.dec())	// 42

console.log(store.value)	// 42
```
