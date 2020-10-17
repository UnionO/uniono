# Transaction

#### Constructor

Creates new Transaction

| Argument  | Type      | Default    | Description           |
|-----------|-----------|------------|-----------------------|
| union     | any       | undefined  | Union                 |
| fn        | function  | (x) => x   | Transaction function  |

```javascript
const x = new Store(0)
const y = new Store(0)
	
const setXY = new Transaction(
	{ x, y },
	({ mutations }, coord) => {
		mutations.x.setValue(coord.x)
		mutations.y.setValue(coord.y)
	}
)
```

### Methods

#### execute

Executes transaction

| Argument  | Type      | Default    | Description   |
|-----------|-----------|------------|---------------|
| ...args   | any       | undefined  | Fn arguments  |

```javascript
const x = new Store(0)
const y = new Store(0)

const setXY = new Transaction(
	{ x, y },
	({ mutations }, coord) => {
		mutations.x.setValue(coord.x)
		mutations.y.setValue(coord.y)
	}
)

setXY.execute({ x: 2, y: 5 })
```

## TransactionEnvironment

TransactionEnvironment injects into transaction function as first argument, when trasnaction called

```javascript
const x = new NumberStore(0)
const y = new Store(0)

const setXY = new Transaction(
	{ x, y },
	(env, coord) => {
		...
	}
)
```

#### transaction

Link to transaction

```javascript
const x = new Store(0)
const y = new Store(0)

const setXY = new Transaction(
	{ x, y },
	(env, coord) => {
		console.log(env.transaction === setXY) // true
	}
)
```

#### value

Function without arguments. Returns actual shadow state

```javascript
const x = new Store(0)
const y = new Store(1)

const setX = new Transaction(
	{ x },
	(env, newX) => env.mutations.x.setValue(newX)
)
const setY = new Transaction(
	{ y },
	(env, newY) => env.mutations.y.setValue(newY)
)
const setXY = new Transaction(
	{ x, y, setX, setY },
	(env, coord) => {
		console.log(env.value()) // { x: 0, y: 1, setX: setX.execute, setY: setY.execute }
	}
)
```

#### mutations

Mapped transaction union, where all stores changed to mutations and transactions changed to execute function

```javascript
const x = new NumberStore(0)
const y = new Store(1)

const setX = new Transaction(
	{ x },
	(env, newX) => env.mutations.x.setValue(newX)
)
const setY = new Transaction(
	{ y },
	(env, newY) => env.mutations.y.setValue(newY)
)
const setXY = new Transaction(
	{ x, y, setX, setY },
	(env, coord) => {
		console.log(env.mutations) 
		// { 
		//	 x: { setValue: fn, inc: fn, dec: fn }, 
		//   y: { setValue }, 
		//   setX: setX.execute, 
		//   setY: setY.execute 
	  // }
	}
)
```

#### apply

Function without arguments, applies shadow stores to main

```javascript
const isLoading = new BooleanStore(false)
const q = new Store('')
	
const loadItems = new Transaction(
	{ isLoading, q },
	async (env) => {
		env.mutations.isLoading.setTrue()
		env.apply()
		...
	}
)
```

#### cancel

Function without arguments, cancels shadow stores mutations

```javascript
const isLoading = new BooleanStore(false)
const q = new Store('')
	
const loadItems = new Transaction(
	{ isLoading, q },
	async (env) => {
		... 
		if (error) {
			env.cancel()
		}
		...
	}
)
```