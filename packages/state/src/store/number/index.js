import Store from '..'
import NumberMutations from './mutations';

export default class NumberStore extends Store {
	constructor (value) {
		super(value || 0, NumberMutations)
	}
}