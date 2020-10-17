# Mart

#### Constructor

Creates new Mart

| Argument  | Type      | Default    | Description    |
|-----------|-----------|------------|----------------|
| union     | any       | undefined  | Mart union     |
| fn        | function  | (x) => x   | Mart function  |

At the time of creation mart searches for all stores and marts in union and subscribes to their changes

```javascript
const store = new Store(1)
	
const q2 = new Mart(
	{ store }, 
	({ store }) => store * 2
)
const q3 = new Mart(
	{ store, q2 }, 
	({ store, q2 }) => 2 * store * (q2 + store - 2)
)

console.log(q2.value) // 2
console.log(q3.value) // 2

store.mutations.setValue(3)

console.log(q2.value) // 6
console.log(q3.value) // 42
```