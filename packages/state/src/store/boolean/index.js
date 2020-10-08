import Store from '..'
import BooleanMutations from './mutations';

export default class BooleanStore extends Store {
	constructor (value) {
		super(Boolean(value), BooleanMutations)
	}
}