# Store

#### Constructor

Creates new Store instance

| Argument        | Type      | Default         | Description            |
|-----------------|-----------|-----------------|------------------------|
| value           | any       |                 | Store value            |
| MutationsClass  | function  | StoreMutations  | Store mutations class  |

```javascript
import Store from '@union/state/lib/store'

new Store()   									// [value=undefined, MutationsClass=StoreMutations]
new Store(42) 									// [value=42, MutationsClass=StoreMutations]
new Store(42, MyMutationsClass) // [value=42, MutationsClass=MyMutationsClass]
```

### Mutations

#### setValue

Sets new value and notifies subscribers

| Argument  | Type  | Default    | Description  |
|-----------|-------|------------|--------------|
| newValue  | any   | undefined  | Store value  |

```javascript
store.mutations.setValue(42)

store.mutations.setValue()
```