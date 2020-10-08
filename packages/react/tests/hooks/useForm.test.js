import { renderHook, act } from '@testing-library/react-hooks'

import useForm from '../../src/hooks/useForm'

async ({ mutations, apply, cancel }) => {
	mutations.isLoading.setValue(true)
	apply()

	const result = await fetch('my url')
	mutations.items.setValue(result)
	cancel()
	mutations.isLoading.setValue(false)
}

test('state/mart/transaction', () => {
	const form = {
		q: '',
		items: [],
		filteredItems: useForm.mart(({ q, items }) => items.filter((i) => i.indexOf(q) >= 0)),
		setQ: ({ mutations }, q) => mutations.q.setValue(q),
		setItems: ({ mutations }, items) => mutations.items.setValue(items),
		setQAndItems: ({ mutations }, { q, items }) => {
			mutations.setQ(q)
			mutations.setItems(items)
		}
	}

	const hook = renderHook(() => useForm(form))

	expect(hook.result.current.q).toEqual('')
	expect(hook.result.current.items).toEqual([])
	expect(hook.result.current.filteredItems).toEqual([])

	act(() => { hook.result.current.setQ('42') })
	act(() => { hook.result.current.setItems([ '420', '422', '228' ]) })

	expect(hook.result.current.q).toEqual('42')
	expect(hook.result.current.items).toEqual([ '420', '422', '228' ])
	expect(hook.result.current.filteredItems).toEqual([ '420', '422' ])
})