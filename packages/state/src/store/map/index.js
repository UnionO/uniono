import Store from '..'
import MapMutations from './mutations';

export default class MapStore extends Store {
	constructor (value) {
		super(value instanceof Map ? value : new Map(), MapMutations)
	}
}