import { renderHook, act } from '@testing-library/react-hooks'
import Store from '@uniono/state/lib/store'
import Mart from '@uniono/state/lib/mart'
import Transaction from '@uniono/state/lib/transaction'

import useUnion from '../../src/hooks/useUnion'

test('undefined/null/boolean/number/string', () => {
	expect(renderHook(() => useUnion(() => undefined)).result.current).toEqual(undefined)
	expect(renderHook(() => useUnion(() => null)).result.current).toEqual(null)
	expect(renderHook(() => useUnion(() => true)).result.current).toEqual(true)
	expect(renderHook(() => useUnion(() => 42)).result.current).toEqual(42)
	expect(renderHook(() => useUnion(() => 'asd')).result.current).toEqual('asd')
})

test('complex object', () => {
	const store = new Store(4)
	const mart = new Mart({ length: store }, ({ length }) => new Array(length).fill('U').join(''))
	const transaction = new Transaction(store, ({ mutate }, value) => mutate().set(value))

	expect(renderHook(() => useUnion(() => ({ store, mart, transaction }))).result.current)
		.toEqual({ store: 4, mart: 'UUUU', transaction: transaction.value })
})

test('transaction', () => {
	const store = new Store(4)
	const mart = new Mart({ length: store }, ({ length }) => new Array(length).fill('U').join(''))
	const transaction = new Transaction(store, ({ mutations }, value) => mutations.setValue(value))

	const hook = renderHook(() => useUnion(() => ({ store, mart, transaction })))

	act(() => { hook.result.current.transaction(2) })
	
	expect(hook.result.current).toEqual({ store: 2, mart: 'UU', transaction: transaction.value })
})