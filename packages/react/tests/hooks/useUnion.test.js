import { renderHook, act } from '@testing-library/react-hooks'
import React from 'react'

import useUnion, { DIProvider } from '../../src/hooks/useUnion'

test('complex template', () => {
	const template = {
		store: 4,
		mart: useUnion.mart(({ store: length }) => new Array(length).fill('U').join('')),
		transaction: ({ mutate }, value) => mutate().set(value)
	}

	expect(renderHook(() => useUnion(template)).result.current)
		.toEqual({ 
			store: 4, 
			mart: 'UUUU', 
			transaction: expect.any(Function)
		})
})

test('function template', () => {
	const template = () => ({
		store: 4,
		mart: useUnion.mart(({ store: length }) => new Array(length).fill('U').join('')),
		transaction: ({ mutate }, value) => mutate().set(value)
	})

	expect(renderHook(() => useUnion(template)).result.current)
		.toEqual({ 
			store: 4, 
			mart: 'UUUU', 
			transaction: expect.any(Function)
		})
})

test('useUnion.mutate', () => {
	const result = { mutateResult: true }
	const mutate = jest.fn(() => result)

	const template = { mutate: useUnion.mutate(mutate) }

	expect(renderHook(() => useUnion(template)).result.current)
		.toEqual({ mutate: result })
	expect(mutate.mock.calls)
		.toEqual([ [ { union: { mutate: result }, diMap: undefined } ] ])
})

test('useUnion.asIs', () => {
	const result = { asIsResult: true }

	const template = { asIs: useUnion.asIs(result) }

	expect(renderHook(() => useUnion(template)).result.current)
		.toEqual({ asIs: result })
})

test('useUnion.from', () => {
	const result = { menu: true }

	const template = { from: useUnion.from(result) }

	expect(renderHook(() => useUnion(template)).result.current)
		.toEqual({ from: result })
})

test('stores', () => {
	const template = {
		store: '',
		undefinedStore: undefined,
		arrayStore: [],
		mapStore: new Map(),
		numberStore: 42,
		booleanStore: true,
		objectStore: {},
		nullStore: null,
		alt: useUnion.from({
			store: useUnion.store(''),
			undefinedStore: useUnion.store(undefined),
			arrayStore: useUnion.arrayStore([]),
			mapStore: useUnion.mapStore(new Map()),
			numberStore: useUnion.numberStore(42),
			booleanStore: useUnion.booleanStore(true),
			objectStore: useUnion.objectStore({}),
			nullStore: useUnion.objectStore(null),
		})
	}

	expect(renderHook(() => useUnion(template)).result.current)
		.toEqual({ 
			store: '',
			undefinedStore: undefined,
			arrayStore: [],
			mapStore: new Map(),
			numberStore: 42,
			booleanStore: true,
			objectStore: {},
			nullStore: null,
			alt: {
				store: '',
				undefinedStore: undefined,
				arrayStore: [],
				mapStore: new Map(),
				numberStore: 42,
				booleanStore: true,
				objectStore: {},
				nullStore: null
			}
		})
})

test('mart', () => {
	const template = {
		store: 2,
		setStore: ({ mutations }, v) => mutations.store.setValue(v),
		mart: useUnion.mart(({ store: length }) => new Array(length).fill('U').join('')),
		mart2: useUnion.mart((value) => value.length / 2, ({ mart }) => mart)
	}

	const hook = renderHook(() => useUnion(template))
	expect(hook.result.current)
		.toEqual({ 
			store: 2, 
			setStore: expect.any(Function),
			mart: 'UU', 
			mart2: 1
		})

	act(() => {
		hook.result.current.setStore(4)
	})

	expect(hook.result.current)
		.toEqual({ 
			store: 4, 
			setStore: expect.any(Function),
			mart: 'UUUU', 
			mart2: 2
		})
})

test('transaction', () => {
	const template = {
		n: 20,
		next: ({ value, mutations }) => mutations.n.setValue(value().n * 2 + 2),
		prev: useUnion.transaction(
			({ value, mutations }) => mutations.setValue((value() - 2) / 2),
			({ n }) => n
		)
	}

	const hook = renderHook(() => useUnion(template))

	expect(hook.result.current)
		.toEqual({ 
			n: 20, 
			next: expect.any(Function),
			prev: expect.any(Function)
		})

	act(() => {
		hook.result.current.next()
	})

	expect(hook.result.current)
		.toEqual({ 
			n: 42, 
			next: expect.any(Function),
			prev: expect.any(Function)
		})

	act(() => {
		hook.result.current.prev()
	})

	expect(hook.result.current)
		.toEqual({ 
			n: 20, 
			next: expect.any(Function),
			prev: expect.any(Function)
		})
})

test('di', () => {
	const globalTemplate = {
		g: useUnion.global('gl-var', { globalAnswer: 42 })
	}
	const template = {
		i: useUnion.inject('gl-var')
	}
	const Global = ({ children }) => {
		useUnion(globalTemplate)

		return children
	}
	const wrapper = ({ children }) => (
		<DIProvider>
			<Global>
				{children}
			</Global>
		</DIProvider>
	)

	const hook = renderHook(() => useUnion(template), { wrapper })
	expect(hook.result.current)
		.toEqual({ i: { globalAnswer: 42 } })
})