import ObjectStore from '../../src/store/object'
import Transaction from '../../src/transaction';

test('constructor', () => {
	expect(new ObjectStore().value).toEqual(undefined)
	expect(new ObjectStore(null).value).toEqual(null)
	expect(new ObjectStore({ a: 42 }).value).toEqual({ a: 42 })
})

test('merge', () => {
	transactionTest(
		new ObjectStore({ base: true, a: 1 }), 
		({ value, mutations }) => {
			mutations.merge({ a: 4, b: 2 })

			expect(value()).toEqual({ base: true, a: 4, b: 2 })
		})
})

test('setNull', () => {
	transactionTest(
		new ObjectStore({ base: true, a: 1 }), 
		({ value, mutations }) => {
			mutations.setNull()

			expect(value()).toEqual(null)
		})
})

test('setUndefined', () => {
	transactionTest(
		new ObjectStore({ base: true, a: 1 }), 
		({ value, mutations }) => {
			mutations.setUndefined()

			expect(value()).toEqual(undefined)
		})
})

const transactionTest = (union, testFn) => new Transaction(union, testFn).execute(union)