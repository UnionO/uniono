import Dispatcher from "../../src/events/dispatcher";
import Handler from "../../src/events/handler";

test('constructor', () => {
	const dispatcher = new Dispatcher()

	expect(dispatcher.handlers).toEqual(new Map())
})

test('on', () => {
	const [ handler, filter ] = [ jest.fn(), jest.fn() ]
	const dispatcher = new Dispatcher()

	dispatcher.on(handler, filter)

	expect(dispatcher.handlers).toEqual(new Map([ [ handler, filter ] ]))
})

test('unsubscribe', () => {
	const [ handler, filter ] = [ jest.fn(), jest.fn() ]
	const dispatcher = new Dispatcher()
	dispatcher.on(handler, filter)

	dispatcher.unsubscribe(handler)

	expect(dispatcher.handlers).toEqual(new Map())
})

test('notify', () => {
	const [ aHandler, aFilter ] = [ jest.fn(), ({ a }) => a ]
	const [ bHandler, bFilter ] = [ new Handler({ recalc: jest.fn() }), ({ b }) => b ]
	const [ cHandler ] = [ jest.fn() ]
	const dispatcher = new Dispatcher()
	dispatcher.on(aHandler, aFilter)
	dispatcher.on(bHandler, bFilter)
	dispatcher.on(cHandler)

	dispatcher.notify({ a: true, e: 41 }, 18)
	dispatcher.notify({ b: true, e: 42 })
	dispatcher.notify({ e: 43 })

	expect(aHandler.mock.calls).toEqual([ [ { a: true, e: 41 }, 18 ] ])
	expect(bHandler.target.recalc.mock.calls).toEqual([ [ { b: true, e: 42 } ] ])
	expect(cHandler.mock.calls).toEqual([ [ { a: true, e: 41 }, 18 ], [ { b: true, e: 42 } ], [ { e: 43 } ] ])
})