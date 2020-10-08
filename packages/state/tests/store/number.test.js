import NumberStore from '../../src/store/number'
import Transaction from '../../src/transaction';

test('constructor', () => {
	expect(new NumberStore().value).toEqual(0)
	expect(new NumberStore(42).value).toEqual(42)
})

test('inc', () => {
	transactionTest(
		new NumberStore(38), 
		({ value, mutations }) => {
			const result = mutations.inc()
			
			expect(value()).toEqual(39)
			expect(result).toEqual(39)
			
			const result2 = mutations.inc(3)
			
			expect(value()).toEqual(42)
			expect(result2).toEqual(42)
		})
})

test('dec', () => {
	transactionTest(
		new NumberStore(45), 
		({ value, mutations }) => {
			const result = mutations.dec()
			
			expect(value()).toEqual(44)
			expect(result).toEqual(44)
			
			const result2 = mutations.dec(2)
			
			expect(value()).toEqual(42)
			expect(result2).toEqual(42)
		})
})

const transactionTest = (union, testFn) => new Transaction(union, testFn).execute(union)