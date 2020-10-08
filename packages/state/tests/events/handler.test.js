import Handler from '../../src/events/handler'

test('constructor', () => {
	expect(new Handler({}).target).toEqual({})
	expect(new Handler('a').target).toEqual('a')
})

test('setInterceptor', () => {
	const interceptor = jest.fn()
	const handler = new Handler()
	
	handler.setInterceptor(interceptor)

	expect(handler.interceptor).toEqual(interceptor)
})

test('notify', () => {
	const recalc = jest.fn()
	const interceptor = jest.fn()
	const target = { recalc }
	const handler = new Handler(target)

	handler.notify(42, 'QWE', 'J')
	handler.setInterceptor(interceptor)
	handler.notify(43)
	
	expect(recalc.mock.calls).toEqual([ [ 42, 'QWE', 'J' ] ])
	expect(interceptor.mock.calls).toEqual([ [ 43 ] ])
})