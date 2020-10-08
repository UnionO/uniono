import Store from '../../src/store'
import Transaction from '../../src/transaction'
import Mart from '../../src/mart';

test('constructor', () => {
	const fn = jest.fn()

	expect(new Transaction({ a: 12 }, fn).mart.union).toEqual({ a: 12 })
	expect(new Transaction({ a: 12 }, fn).fn).toEqual(fn)
})

test('execute', () => {
	const union = {}
	union.q = new Store('q')
	union.items = new Store([])
	union.filtered = new Mart(union, ({ items }) => items.indexOf(' - 2'))
	union.fetch = new Transaction(union, ({ value, mutations }, count) => {
		const { q } = value()
		
		mutations.q.setValue('')
		mutations.items.setValue(new Array(count).fill().map((_, i) => `${q} - ${i}`))
	})
	const mart = new Mart(union)
	mart.recalc = jest.fn(mart.recalc)

	union.fetch.execute(3)

	expect(mart.value.items).toEqual([ 'q - 0', 'q - 1', 'q - 2' ])
	expect(mart.recalc.mock.calls.length).toEqual(1)
})

test('execute async', async () => {
	const union = {}
	union.q = new Store('q')
	union.items = new Store([])
	union.filtered = new Mart(union, ({ items }) => items.indexOf(' - 2'))
	union.fetch = new Transaction(union, async ({ value, mutations }, count) => {
		const { q } = value()
		
		await new Promise((resolve) => setTimeout(resolve, 250))

		mutations.q.setValue('')
		mutations.items.setValue(new Array(count).fill().map((_, i) => `${q} - ${i}`))
	})
	const mart = new Mart(union)
	mart.recalc = jest.fn(mart.recalc)

	await union.fetch.execute(3)

	expect(mart.value.items).toEqual([ 'q - 0', 'q - 1', 'q - 2' ])
})

test('apply', () => {
	const union = {}
	union.q = new Store('q')
	union.items = new Store([])
	union.filtered = new Mart(union, ({ items }) => items.indexOf(' - 2'))
	union.fetch = new Transaction(union)
	const mart = new Mart(union)
	mart.recalc = jest.fn(mart.recalc)

	union.fetch.use(({ value, mutations, apply }, count) => {
		const { q } = value()
		
		mutations.q.setValue('')
		mutations.items.setValue(new Array(count).fill().map((_, i) => `${q} - ${i}`))
		
		apply()

		expect(mart.value.items).toEqual([ 'q - 0', 'q - 1', 'q - 2' ])
	})

	union.fetch.execute(3)
	expect(mart.value.items).toEqual([ 'q - 0', 'q - 1', 'q - 2' ])
})

test('cancel', () => {
	const union = {}
	union.q = new Store('q')
	union.items = new Store([])
	union.filtered = new Mart(union, ({ items }) => items.indexOf(' - 2'))
	union.fetch = new Transaction(union)
	const mart = new Mart(union)
	mart.recalc = jest.fn(mart.recalc)

	union.fetch.use(({ value, mutations, cancel }, count) => {
		const { q } = value()
		
		mutations.q.setValue('')
		mutations.items.setValue(new Array(count).fill().map((_, i) => `${q} - ${i}`))
		
		cancel()

		expect(mart.value.items).toEqual([ ])
	})
	
	union.fetch.execute(3)
	expect(mart.value.items).toEqual([ ])
})

test('one mart, one call', () => {
	const store = new Store(0)
	const aStore = new Store('q')
	const m0 = new Mart(store, (i) => i + 2)
	const m1 = new Mart(m0, (i) => i + 1)
	const m2 = new Mart(m1, (i) => i + 1)
	const m3 = new Mart(m2, (i) => i * 2)
	const mart = new Mart([ store, aStore, m0, m1, m2, m3 ])
	const callback = jest.fn()


	mart.on(callback)
	
	new Transaction(store, ({ mutations, apply }) => {
		mutations.setValue(10)
		apply()
	}).execute()
	new Transaction(store, ({ mutations }) => mutations.setValue(11)).execute()
	new Transaction(store, ({ mutations }) => mutations.setValue(12)).execute()
	new Transaction(store, ({ mutations }) => mutations.setValue(13)).execute()
	new Transaction(aStore, ({ mutations }) => mutations.setValue(18)).execute()

	expect(callback.mock.calls.length).toEqual(5)
	expect(mart.value).toEqual([ 13, 18, 15, 16, 17, 34 ])
})

test('not changed mart', () => {
	const union = {
		q: new Store(''),
		count: new Store(0)
	}
	const mart = new Mart(union.count)
	const callback = jest.fn()
	mart.on(callback)
	
	new Transaction(union, ({ mutations }) => mutations.q.setValue('value')).execute()

	expect(callback.mock.calls.length).toEqual(0)
})
