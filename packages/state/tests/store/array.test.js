import ArrayStore from '../../src/store/array'
import Transaction from '../../src/transaction';

test('constructor', () => {
	expect(new ArrayStore().value).toEqual([])
	expect(new ArrayStore([ 18, 2, 7, [ 's', 'g' ] ]).value).toEqual([ 18, 2, 7, [ 's', 'g' ] ])
})

test('fill', () => {
	transactionTest(new ArrayStore(new Array(5)), ({ value, mutations }) => {
		const result = mutations.fill(42)

		expect(value()).toEqual([ 42, 42, 42, 42, 42 ])
		expect(result).toEqual([ 42, 42, 42, 42, 42 ])
	})
})

test('filter', () => {
	transactionTest(new ArrayStore([ 2, 4, 6, 8, 12 ]), ({ value, mutations }) => {
		const result = mutations.filter((i) => i > 5)

		expect(value()).toEqual([ 6, 8, 12 ])
		expect(result).toEqual([ 6, 8, 12 ])
	})
})

test('flat', () => {
	transactionTest(new ArrayStore([ 2, [ 3, 4 ], [ [ [ 5, 6 ] ] ] ]), ({ value, mutations }) => {
		const result = mutations.flat(Infinity)

		expect(value()).toEqual([ 2, 3, 4, 5, 6 ])
		expect(result).toEqual([ 2, 3, 4, 5, 6 ])
	})
})

test('flatMap', () => {
	transactionTest(new ArrayStore([1, 2, 3, 4]), ({ value, mutations }) => {
		const result = mutations.flatMap(x => [x, x * 2])

		expect(value()).toEqual([1, 2, 2, 4, 3, 6, 4, 8])
		expect(result).toEqual([1, 2, 2, 4, 3, 6, 4, 8])
	})
})

test('map', () => {
	transactionTest(new ArrayStore([1, 4, 9, 16]), ({ value, mutations }) => {
		const result = mutations.flatMap(x => x * 2)

		expect(value()).toEqual([2, 8, 18, 32])
		expect(result).toEqual([2, 8, 18, 32])
	})
})

test('pop', () => {
	transactionTest(
		new ArrayStore(['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato']), 
		({ value, mutations }) => {
			const result = mutations.pop()

			expect(value()).toEqual(["broccoli", "cauliflower", "cabbage", "kale"])
			expect(result).toEqual('tomato')
		})
})

test('push', () => {
	transactionTest(
		new ArrayStore(['pigs', 'goats', 'sheep']), 
		({ value, mutations }) => {
			const result = mutations.push('cows', 'cats', 'dogs')

			expect(value()).toEqual(["pigs", "goats", "sheep", "cows", 'cats', 'dogs'])
			expect(result).toEqual(6)
		})
})

test('reverse', () => {
	transactionTest(
		new ArrayStore(['one', 'two', 'three']), 
		({ value, mutations }) => {
			const result = mutations.reverse()

			expect(value()).toEqual(["three", "two", "one"])
			expect(result).toEqual(["three", "two", "one"])
		})
})

test('shift', () => {
	transactionTest(
		new ArrayStore([1, 2, 3]), 
		({ value, mutations }) => {
			const result = mutations.shift()

			expect(value()).toEqual([2, 3])
			expect(result).toEqual(1)
		})
})

test('sort', () => {
	transactionTest(
		new ArrayStore(['March', 'Jan', 'Feb', 'Dec']), 
		({ value, mutations }) => {
			const result = mutations.sort()

			expect(value()).toEqual(["Dec", "Feb", "Jan", "March"])
			expect(result).toEqual(["Dec", "Feb", "Jan", "March"])
		})
})

test('splice', () => {
	transactionTest(
		new ArrayStore(['Jan', 'March', 'April', 'June']), 
		({ value, mutations }) => {
			const result = mutations.splice(1, 0, 'Feb')

			expect(value()).toEqual(["Jan", "Feb", "March", "April", "June"])
			expect(result).toEqual([])

			const result2 = mutations.splice(4, 1, 'May')

			expect(value()).toEqual(["Jan", "Feb", "March", "April", "May"])
			expect(result2).toEqual([ "June" ])
		})
})

test('unshift', () => {
	transactionTest(
		new ArrayStore([1, 2, 3]), 
		({ value, mutations }) => {
			const result = mutations.unshift(4, 5)

			expect(value()).toEqual([4, 5, 1, 2, 3])
			expect(result).toEqual(5)
		})
})

const transactionTest = (union, testFn) => new Transaction(union, testFn).execute(union)