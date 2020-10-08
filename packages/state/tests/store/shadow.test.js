import Store, { ShadowStore } from '../../src/store'

test('constructor', () => {
	const store = new Store(0)

	expect(new ShadowStore(store).parent).toEqual(store)
	expect(new ShadowStore(store).isChanged).toEqual(false)
})

test('apply', () => {
	const store = new Store(0)
	store.mutations.setValue = jest.fn(store.mutations.setValue)
	const shadow = new ShadowStore(store)
	shadow.mutations.setValue(42)

	shadow.apply()

	expect(store.mutations.setValue.mock.calls).toEqual([ [ 42 ] ])
})

test('cancel', () => {
	const store = new Store(0)
	store.mutations.setValue = jest.fn(store.mutations.setValue)
	const shadow = new ShadowStore(store)
	shadow.mutations.setValue(42)
	
	shadow.cancel()

	expect(store.mutations.setValue.mock.calls).toEqual([ ])
	expect(shadow.value).toEqual(0)
})