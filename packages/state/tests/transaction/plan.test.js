import Mart from '../../src/mart'
import Store from '../../src/store'
import Transaction from '../../src/transaction'
import TransactionPlan from '../../src/transaction/plan'

test('constructor', () => {
	expect(new TransactionPlan({ a: 12 }).union).toEqual({ a: 12 })
	expect(new TransactionPlan({ }).plan).toBeNull()
})

test('prepare (union=null)', () => {
	const transactionPlan = new TransactionPlan(null)
	
	transactionPlan.prepare()

	expect(transactionPlan.plan).toEqual({ byLevels: new Map(), transactionLevel: 0, marts: [] })
})

test('prepare (union=store)', () => {
	const store = new Store(12)
	const transactionPlan = new TransactionPlan(store)
	
	transactionPlan.prepare()

	expect(transactionPlan.plan).toEqual({ byLevels: new Map([ [0, [ store ]] ]), transactionLevel: 0, marts: [] })
})

test('prepare (union=mart)', () => {
	const mart = new Mart(new Store(12))
	const transactionPlan = new TransactionPlan(mart)
	
	transactionPlan.prepare()

	expect(transactionPlan.plan).toEqual({ byLevels: new Map([ [1, [ mart ]] ]), transactionLevel: 1, marts: [ mart ] })
})

test('prepare (complex union)', () => {
	const union = {}
	union.q = new Store('query')
	union.items = new Store([])
	union.filteredItems = new Mart(union, () => '##filteredItems')
	const another = {
		inner: {
			q: union.q,
			items: union.items,
			mart: new Mart(union, () => '##another.mart'),
			next: new Mart(union.q, () => '##another.next'),
		}
	}
	union.fetchItems = new Transaction(union, () => {})
	union.clearItems = new Transaction(union, () => {})
	
	const transactionPlan = new TransactionPlan(union)
	transactionPlan.prepare()

	/*
	Array.from(transactionPlan.plan.byLevels.keys()).map((key) => {
		console.log(
			` # ${key}`, 
			transactionPlan.plan.byLevels.get(key).map(({ value }) => value)
		)
	})
	*/

	expect(transactionPlan.plan.transactionLevel).toEqual(2)
	expect(transactionPlan.plan.byLevels.get(0)).toEqual([ union.q, union.items ])
	expect(transactionPlan.plan.byLevels.get(1)).toEqual([ union.filteredItems, another.inner.next ])
	expect(transactionPlan.plan.byLevels.get(2)).toEqual([ another.inner.mart, union.fetchItems.mart, union.clearItems.mart ])

	expect(transactionPlan.plan.marts).toEqual([
		union.filteredItems, 
		another.inner.next,
		another.inner.mart,
		union.fetchItems.mart,
		union.clearItems.mart
	])
})

test('setInterceptor', () => {
	const union = {}
	union.q = new Store('query')
	union.items = new Store([])
	union.filteredItems = new Mart(union, () => '##filteredItems')
	const another = {
		inner: {
			q: union.q,
			items: union.items,
			mart: new Mart(union, () => '##another.mart'),
			next: new Mart(union.q, () => '##another.next'),
		}
	}
	union.fetchItems = new Transaction(union, () => {})
	union.clearItems = new Transaction(union, () => {})
	const interceptor = () => {}

	//mocks
	union.filteredItems.handler.setInterceptor = jest.fn(union.filteredItems.handler.setInterceptor)
	another.inner.mart.handler.setInterceptor = jest.fn(another.inner.mart.handler.setInterceptor)
	another.inner.next.handler.setInterceptor = jest.fn(another.inner.next.handler.setInterceptor)
	union.fetchItems.mart.handler.setInterceptor = jest.fn(union.fetchItems.mart.handler.setInterceptor)
	union.clearItems.mart.handler.setInterceptor = jest.fn(union.clearItems.mart.handler.setInterceptor)
	
	const transactionPlan = new TransactionPlan(union)
	transactionPlan.setInterceptor(interceptor)

	expect(union.filteredItems.handler.setInterceptor.mock.calls).toEqual([ [ interceptor ] ])
	expect(another.inner.mart.handler.setInterceptor.mock.calls).toEqual([ [ interceptor ] ])
	expect(another.inner.next.handler.setInterceptor.mock.calls).toEqual([ [ interceptor ] ])
	expect(union.fetchItems.mart.handler.setInterceptor.mock.calls).toEqual([ [ interceptor ] ])
	expect(union.clearItems.mart.handler.setInterceptor.mock.calls).toEqual([ [ interceptor ] ])
})

test('recalc', () => {
	const union = {}
	union.q = new Store('query')
	union.items = new Store([])
	union.filteredItems = new Mart(union, ({ q }) => '##filteredItems')
	const another = {
		inner: {
			q: union.q,
			items: union.items,
			mart: new Mart(union, () => '##another.mart'),
			next: new Mart(union.q, () => '##another.next'),
		}
	}
	union.fetchItems = new Transaction(union, () => {})
	union.clearItems = new Transaction(union, () => {})
	const interceptor = () => {}

	//mocks
	union.filteredItems.recalc = jest.fn(union.filteredItems.recalc)
	another.inner.mart.recalc = jest.fn(another.inner.mart.recalc)
	another.inner.next.recalc = jest.fn(another.inner.next.recalc)
	union.fetchItems.mart.recalc = jest.fn(union.fetchItems.mart.recalc)
	union.clearItems.mart.recalc = jest.fn(union.clearItems.mart.recalc)
	
	const transactionPlan = new TransactionPlan(union)
	transactionPlan.setInterceptor(interceptor)
	transactionPlan.recalc([ union.filteredItems ])

	expect(union.filteredItems.recalc.mock.calls).toEqual([ [ ] ])
	expect(another.inner.mart.recalc.mock.calls).toEqual([ [ ] ])
	expect(another.inner.next.recalc.mock.calls).toEqual([ ])
	expect(union.fetchItems.mart.recalc.mock.calls).toEqual([ [ ] ])
	expect(union.clearItems.mart.recalc.mock.calls).toEqual([ [ ] ])
})

test('recalc (value)', () => {
	const union = {}
	union.store = new Store(0)
	union.f = new Mart(union, ({ store }) => store + 1)
	union.s = new Mart(union, ({ f }) => f + 1)
	union.t = new Mart(union, ({ s }) => s + 1)
	const answer = new Mart(union.t, (t) => t * 2)
	const interceptor = () => {}

	const transactionPlan = new TransactionPlan(union)
	transactionPlan.setInterceptor(interceptor)
	union.store.mutations.setValue(18)
	transactionPlan.recalc([ union.store ])

	expect(answer.value).toEqual(42)
})