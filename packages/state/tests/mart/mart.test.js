import Handler from '../../src/events/handler';
import Mart from '../../src/mart'
import Store from '../../src/store'

test('constructor', () => {
	const mapFn = jest.fn((x) => x)
	const store = new Store(32)
	
	expect(new Mart('union unio').union).toEqual('union unio')
	expect(new Mart('union unio', mapFn).mapFn).toEqual(mapFn)
	expect(new Mart('union unio', mapFn).value).toEqual('union unio')
	expect(new Mart({ a: store }, mapFn).value).toEqual({ a: 32 })

	// handler
	const mart = new Mart()

	expect(mart.handler).toBeInstanceOf(Handler)
	expect(mart.handler.target).toEqual(mart)
	
	// transaction level
	expect(new Mart().transactionLevel).toEqual(1)
	expect(new Mart(new Store()).transactionLevel).toEqual(1)
	expect(new Mart(new Mart(new Store())).transactionLevel).toEqual(2)
	expect(new Mart(new Mart(new Mart(new Store()))).transactionLevel).toEqual(3)
})

test('recalc', () => {
	const store = new Store(31)
	const mart = new Mart(new Mart(new Mart(store), (x) => x + 1), (x) => x * 2)
	mart.notify = jest.fn(mart.notify)

	store.mutations.setValue(127)

	expect(mart.value).toEqual(256)
	expect(mart.notify.mock.calls).toEqual([ [ 256, 64, mart ] ])
})

test('shadow', () => {
	const store = new Store(10)
	const shadow = store.shadow()
	const innerMart = new Mart({ store })
	const shadowInnerMart = innerMart.shadow()
	store.shadow = jest.fn(() => shadow)
	innerMart.shadow = jest.fn(() => shadowInnerMart)
	
	const mart = new Mart({ a: store, b: store, mart: innerMart, martB: innerMart })
	const shadowMart = mart.shadow()

	expect(shadowMart.union).toEqual({ a: shadow, b: shadow, mart: shadowInnerMart, martB: shadowInnerMart })
	expect(store.shadow.mock.calls.length).toEqual(1)
	expect(innerMart.shadow.mock.calls.length).toEqual(1)
})

test('end', () => {
	const union = {}
	union.a = new Store('a')
	union.b = new Store('b')

	const mart = new Mart(union)
	mart.end()

	expect(union.a.handlers).toEqual(new Map())
	expect(union.b.handlers).toEqual(new Map())
})

test('restart', () => {
	const union = {}
	union.a = new Store('a')
	union.b = new Store('b')

	const mart = new Mart(union)
	mart.end()
	mart.start()

	expect(union.a.handlers).toEqual(new Map([ [ mart.handler, undefined ] ]))
	expect(union.b.handlers).toEqual(new Map([ [ mart.handler, undefined ] ]))
})

test('example', () => {
	const store = new Store(1)
	
	const q2 = new Mart(
		{ store }, 
		({ store }) => store * 2
	)
	const q3 = new Mart(
		{ store, q2 }, 
		({ store, q2 }) => 2 * store * (q2 + store - 2)
	)

	expect(q2.value).toEqual(2)
	expect(q3.value).toEqual(2)

	store.mutations.setValue(3)

	expect(q2.value).toEqual(6)
	expect(q3.value).toEqual(42)
})