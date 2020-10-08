import Store from '..'
import ArrayMutations from './mutations';

export default class ArrayStore extends Store {
	constructor (value) {
		super(Array.isArray(value) ? value : [], ArrayMutations)
	}
}