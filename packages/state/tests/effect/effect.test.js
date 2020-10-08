import Effect from '../../src/effect'
import Mart from '../../src/mart';
import Store from '../../src/store';
import Transaction from '../../src/transaction';

test('constructor', () => {
	const transaction = new Transaction({}, () => {})
	const mart = new Mart({})

	expect(new Effect('trIgger', transaction).trigger).toEqual('trIgger')
	expect(new Effect('trIgger', transaction).trigger).toEqual('trIgger')
	expect(new Effect(mart, transaction).mart).toEqual(mart)
})

test('trigger', () => {
	const store = new Store()
	const transaction = new Transaction({}, jest.fn())

	new Effect(store, transaction)
	store.mutations.setValue(42)

	expect(transaction.fn.mock.calls).toEqual([ [ expect.anything(), 42 ] ])
})