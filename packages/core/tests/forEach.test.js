import Union from '../src'

test('undefined/null/boolean/number/string (not atoms)', () => {
	const union = new Union(() => false)
	const fn = jest.fn(() => 'invalid value from fn')

	union.forEach(undefined, fn)
	union.forEach(null, fn)
	union.forEach(true, fn)
	union.forEach(false, fn)
	union.forEach(0, fn)
	union.forEach(10, fn)
	union.forEach('valid value', fn)

	expect(fn.mock.calls).toEqual([ ])
})

test('undefined/null/boolean/number/string (atoms)', () => {
	const union = new Union(() => true)
	const fn = jest.fn((x) => ({ x }))

	union.forEach(undefined, fn)
	union.forEach(null, fn)
	union.forEach(true, fn)
	union.forEach(false, fn)
	union.forEach(0, fn)
	union.forEach(42, fn)
	union.forEach('xx', fn)
	
	expect(fn.mock.calls).toEqual([ 
		[ undefined ],
		[ null ],
		[ true ],
		[ false ],
		[ 0 ],
		[ 42 ],
		[ 'xx' ],
	])
})

test('array', () => {
	const union = new Union((x) => typeof x === 'number')
	const fn = jest.fn((x) => ({ x }))

	new Union(() => true).forEach([ 'A', 'r', 'R' ], fn)
	union.forEach([ 'A', [ 'S', 22 ], 0, '11' ], fn)

	expect(fn.mock.calls).toEqual([ [ [ 'A', 'r', 'R' ] ], [ 22 ], [ 0 ] ])
})

test('map', () => {
	const union = new Union((x) => typeof x === 'number')
	const fn = jest.fn((x) => ({ x }))

	new Union(() => true).forEach(new Map([ [ 0, 11 ] ]), fn)
	union.forEach(new Map([ [ 's', '11' ], [ 0, 'q' ], [ 'w', 2 ] ]), fn)

	expect(fn.mock.calls).toEqual([ [ new Map([ [ 0, 11 ] ]) ], [ 0 ], [ 2 ] ])
})

test('object', () => {
	const union = new Union((x) => typeof x === 'number')
	const fn = jest.fn((x) => (x + 1))

	new Union(() => true).forEach({ a: 22 }, fn)
	union.forEach({ x: '1', y: 22, c: { a: [ 2 ], b: 'y' } }, fn)

	expect(fn.mock.calls).toEqual([ [ { a: 22 } ], [ 22 ], [ 2 ] ])
})

test('complex', () => {
	const fn = jest.fn(({ value }) => value)
	const source = {
		undefined: undefined,
		null: null,
		boolean: true,
		number: 422,
		string: 'answer',
		arr: [
			new Map([ 
				[ new MapInstance('kkey'), new MapInstance('vvalue') ],
				[ 'a', new MapInstance('b') ]
			])
		],
		object: {
			s: 42,
			b: new MapInstance('nnvalue'),
			c:  { 
				d: new MapInstance('nnvalue') 
			}
		}
	}

	new Union((a) => a instanceof MapInstance).forEach(source, fn)

	expect(fn.mock.calls).toEqual([ 
		[ new MapInstance('kkey') ], 
		[ new MapInstance('vvalue') ],
		[ new MapInstance('b') ],
		[ new MapInstance('nnvalue') ],
		[ new MapInstance('nnvalue') ]
	])
})

test('recursive', () => {
	const fn = jest.fn(({ value }) => value)
	const union = { instance: new MapInstance(11) }
	union.recursive = union

	new Union((a) => a instanceof MapInstance).forEach(union, fn)
	
	expect(fn.mock.calls).toEqual([ [ union.instance ] ])
})

class MapInstance { 
	constructor (value) {
		this.value = value
	}		
}