import Store from '..'
import ObjectMutations from './mutations';

export default class ObjectStore extends Store {
	constructor (value) {
		super(value, ObjectMutations)
	}
}