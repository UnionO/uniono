import Store, { ShadowStore } from '../../src/store'

test('constructor', () => {
	expect(new Store(10).value).toEqual(10)
	expect(new Store(10, TestMutationsClass).MutationsClass).toEqual(TestMutationsClass)
	expect(new Store(10, TestMutationsClass).mutations).toBeInstanceOf(TestMutationsClass)
	expect(new Store(10, TestMutationsClass).transactionLevel).toEqual(0)
})

test('shadow', () => {
	expect(new Store(10).shadow()).toBeInstanceOf(ShadowStore)
})

class TestMutationsClass {}