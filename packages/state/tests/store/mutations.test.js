import Store from '../../src/store'
import Mutations from '../../src/store/mutations'

test('constructor', () => {
	const store = new Store(10)

	expect(store.mutations.target).toEqual(store)
})

test('clone', () => {
	const { mutations } = new Store(0)

	expect(mutations.clone(undefined)).toEqual(undefined)
	expect(mutations.clone(null)).toEqual(null)
	expect(mutations.clone(42)).toEqual(42)
	expect(mutations.clone('sd')).toEqual('sd')
	expect(mutations.clone('sd')).toEqual('sd')
	expect(mutations.clone(false)).toEqual(false)
	expect(mutations.clone(fn)).toEqual(fn)
	expect(mutations.clone(arr)).toEqual([ ...arr ])
	expect(mutations.clone(map)).toEqual(new Map(map))
	expect(mutations.clone(obj)).toEqual(obj)
})

test('isChanged', () => {
	expect(new Store(fn).mutations.isChanged(fn)).toEqual(false)
	expect(new Store('42').mutations.isChanged('42')).toEqual(false)
	expect(new Store({}).mutations.isChanged({})).toEqual(true)
	expect(new Store(fn).mutations.isChanged(jest.fn())).toEqual(true)
	expect(new Store(undefined).mutations.isChanged('undefined')).toEqual(true)
	expect(new Store(0).mutations.isChanged(1)).toEqual(true)
	expect(new Store(42).mutations.isChanged('42')).toEqual(true)
})

test('setValue', () => {
	const store = new Store(10)
	store.notify = jest.fn()

	store.mutations.setValue(10)
	store.mutations.setValue(42)

	expect(store.notify.mock.calls).toEqual([ [ 42, 10, store ] ])
})

const fn = jest.fn()
const arr = [ 0, 'a', { o: true } ]
const map = new Map([ [ 'a', { b: 1 } ], [ { b: 2 }, 'c' ] ])
const obj = { n: 1, s: 'str', fn, arr, map, o: { s: { w: 2 } } }