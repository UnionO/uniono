import BooleanStore from '../../src/store/boolean'
import Transaction from '../../src/transaction'

test('constructor', () => {
	expect(new BooleanStore().value).toEqual(false)
	expect(new BooleanStore(null).value).toEqual(false)
	expect(new BooleanStore({ a: 42 }).value).toEqual(true)
	expect(new BooleanStore(false).value).toEqual(false)
	expect(new BooleanStore(true).value).toEqual(true)
})

test('setTrue', () => {
	transactionTest(
		new BooleanStore(false), 
		({ value, mutations }) => {
			expect(mutations.setTrue()).toEqual(true)

			expect(value()).toEqual(true)

			expect(mutations.setTrue()).toEqual(true)

			expect(value()).toEqual(true)
		})
})

test('setFalse', () => {
	transactionTest(
		new BooleanStore(true), 
		({ value, mutations }) => {
			expect(mutations.setFalse()).toEqual(false)

			expect(value()).toEqual(false)

			expect(mutations.setFalse()).toEqual(false)

			expect(value()).toEqual(false)
		})
})

test('toggle', () => {
	transactionTest(
		new BooleanStore(true), 
		({ value, mutations }) => {
			expect(mutations.toggle()).toEqual(false)

			expect(value()).toEqual(false)

			expect(mutations.toggle()).toEqual(true)

			expect(value()).toEqual(true)
		})
})

const transactionTest = (union, testFn) => new Transaction(union, testFn).execute(union)