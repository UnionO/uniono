import MapStore from '../../src/store/map'
import Transaction from '../../src/transaction';

test('constructor', () => {
	expect(new MapStore().value).toEqual(new Map())
	expect(new MapStore(new Map([ [ 0, 1] ])).value).toEqual(new Map([ [ 0, 1 ] ]))
})

test('clear', () => {
	transactionTest(
		new MapStore(new Map([ [ 'bar', 'baz' ], [ 1, 'foo' ] ])), 
		({ value, mutations }) => {
			mutations.clear()

			expect(value()).toEqual(new Map())
		})
})

test('delete', () => {
	transactionTest(
		new MapStore(new Map([ [ 'bar', 'baz' ], [ 1, 'foo' ] ])), 
		({ value, mutations }) => {
			mutations.delete('bar')

			expect(value()).toEqual(new Map([ [ 1, 'foo' ] ]))
		})
})

test('set', () => {
	transactionTest(
		new MapStore(new Map([ [ 'bar', 'baz' ] ])), 
		({ value, mutations }) => {
			mutations.set(1, 'foo')

			expect(value()).toEqual(new Map([ [ 'bar', 'baz' ], [ 1, 'foo' ] ]))
		})
})

const transactionTest = (union, testFn) => new Transaction(union, testFn).execute(union)