import Form from '../../src/form'
import NumberStore from '../../src/store/number';
import ArrayStore from '../../src/store/array';
import MapStore from '../../src/store/map';
import ObjectStore from '../../src/store/object';

test('form.from', () => {
	const form = {
		q: '',
		items: [],
		setQ: ({ mutations }, value) => mutations.q.setValue(value),
		setItems: ({ mutations }, value) => mutations.items.setValue(value)
	}
	const union = Form.from(form)

	union.setQ.execute('query')
	union.setItems.execute([ { label: 'query 0' }, { label: 'query 1' } ])

	expect(union.q.value).toEqual('query')
	expect(union.items.value).toEqual([ { label: 'query 0' }, { label: 'query 1' } ])
})

test('form.asIs/mart', () => {
	const api = { api: true }
	const form = {
		api: Form.asIs(api),
		q: '',
		items: [],
		formattedQ: Form.mart(({ q }) => q.trim()),
		visibleItems: Form.mart(({ formattedQ, items }) => items.filter(({ label }) => label.indexOf(formattedQ) >= 0)),
		setQ: ({ mutations }, value) => mutations.q.setValue(value),
		setItems: ({ mutations }, value) => mutations.items.setValue(value),
		n: 42,
		m: new Map(),
		o: { a: 12 }
	}
	const union = Form.from(form)
	
	
	union.setQ.execute('   asd    ')
	union.setItems.execute([ { label: 'query' }, { label: 'asd' }, { label: 'asd2' }  ])
	
	expect(union.api).toEqual(api)
	expect(union.q.value).toEqual('   asd    ')
	expect(union.items.value).toEqual([ { label: 'query' }, { label: 'asd' }, { label: 'asd2' }  ])
	expect(union.visibleItems.value).toEqual([ { label: 'asd' }, { label: 'asd2' }  ])
	
	expect(union.items).toBeInstanceOf(ArrayStore)
	expect(union.n).toBeInstanceOf(NumberStore)
	expect(union.m).toBeInstanceOf(MapStore)
	expect(union.o).toBeInstanceOf(ObjectStore)
})