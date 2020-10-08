import Union from '../src'

test('undefined/null/boolean/number/string (not atoms)', () => {
	const union = new Union(() => false)
	const fn = jest.fn(() => 'invalid value from fn')

	expect(union.map(undefined, fn)).toEqual(undefined)
	expect(union.map(null, fn)).toEqual(null)
	expect(union.map(true, fn)).toEqual(true)
	expect(union.map(false, fn)).toEqual(false)
	expect(union.map(0, fn)).toEqual(0)
	expect(union.map(10, fn)).toEqual(10)
	expect(union.map('valid value', fn)).toEqual('valid value')

	expect(fn.mock.calls).toEqual([ ])
})

test('undefined/null/boolean/number/string (atoms)', () => {
	const union = new Union(() => true)
	const fn = jest.fn((x) => ({ x }))

	expect(union.map(undefined, fn)).toEqual({ x: undefined })
	expect(union.map(null, fn)).toEqual({ x: null })
	expect(union.map(true, fn)).toEqual({ x: true })
	expect(union.map(false, fn)).toEqual({ x: false })
	expect(union.map(0, fn)).toEqual({ x: 0 })
	expect(union.map(42, fn)).toEqual({ x: 42 })
	expect(union.map('xx', fn)).toEqual({ x: 'xx' })

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

	expect(new Union(() => true).map([ 'A', 'r', 'R' ], fn))
		.toEqual({ x: [ 'A', 'r', 'R' ] })
	expect(union.map([ 'A', [ 'S', 22 ], 0, '11' ], fn))
		.toEqual([ 'A', [ 'S', { x: 22 } ], { x: 0 }, '11' ])

	expect(fn.mock.calls).toEqual([ [ [ 'A', 'r', 'R' ] ], [ 22 ], [ 0 ] ])
})

test('map', () => {
	const union = new Union((x) => typeof x === 'number')
	const fn = jest.fn((x) => ({ x }))

	expect(new Union(() => true).map(new Map([ [ 0, 11 ] ]), fn))
		.toEqual({ x: new Map([ [ 0, 11 ] ]) })
	expect(union.map(new Map([ [ 's', '11' ], [ 0, 'q' ], [ 'w', 2 ] ]), fn))
		.toEqual(new Map([ [ 's', '11' ], [ { x: 0 }, 'q' ], [ 'w', { x: 2 } ] ]))

	expect(fn.mock.calls).toEqual([ [ new Map([ [ 0, 11 ] ]) ], [ 0 ], [ 2 ] ])
})

test('object', () => {
	const union = new Union((x) => typeof x === 'number')
	const fn = jest.fn((x) => (x + 1))

	expect(new Union(() => true).map({ a: 22 }, fn))
		.toEqual('[object Object]1')
	expect(union.map({ x: '1', y: 22, c: { a: [ 2 ], b: 'y' } }, fn))
		.toEqual({ x: '1', y: 23, c: { a: [ 3 ], b: 'y' } })

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

	expect(new Union((a) => a instanceof MapInstance).map(source, fn))
		.toEqual({
			undefined: undefined,
			null: null,
			boolean: true,
			number: 422,
			string: 'answer',
			arr: [
				new Map([ 
					[ 'kkey', 'vvalue' ],
					[ 'a', 'b' ]
				])
			],
			object: {
				s: 42,
				b: 'nnvalue',
				c:  { 
					d: 'nnvalue'
				}
			}
		})

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

	const result = new Union((a) => a instanceof MapInstance).map(union, fn)
	
	expect(result).toEqual({ instance: 11, recursive: result })
})

class MapInstance { 
	constructor (value) {
		this.value = value
	}		
}