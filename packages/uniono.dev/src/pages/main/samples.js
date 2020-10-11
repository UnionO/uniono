export const sampleSimple = `{
	api: useUnion.inject('api'),
	q: '',
	entities: [],
	isLoading: false,
	setQ: ({ mutations }, event) => 
		mutations.q.setValue(event.target.value),
	loadEntities: async ({ value, mutations, apply }) => {
		const { api, q } = value()
		mutations.isLoading.setTrue()
		apply()

		const entities = await api.entities.load(q)
		...
	},
	onQChanged: useUnion.effect(
		debounce(({ mutations }) => mutations.loadEntities(), 300),
		({ q }) => ({ q })
	)
	...
}`

export const sampleControlled = `{
	storeA: 'A',
	storeB: 'B',
	storeC: 'C',
	transaction: ({ mutations, apply }) => {
		mutations.storeA.setValue('4')
		mutations.storeB.setValue('2')
		mutations.storeC.setValue('2')

		apply() // many changes - one rerender
	}
}`

export const sampleTestable = `test('setQ', () => {
	const mart = new Mart(useUnion.from(unionTemplate))

	mart.value.setQ('New value')

	expect(mart.value.q).toEqual('New value')
})`