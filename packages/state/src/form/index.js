import Effect from "../effect";
import Mart from "../mart";
import Store from "../store";
import Transaction from "../transaction"
import ArrayStore from "../store/array";
import MapStore from "../store/map";
import NumberStore from "../store/number";
import ObjectStore from "../store/object";

export class Mutate {
	constructor (mutate) {
		this.mutate = mutate
	}
}

export class Form {
	from (source) {
		return Object.keys(source).reduce((agg, key) => {
			agg[key] = this.atom(agg, source[key])

			return agg
		}, {})
	}

	atom (union, atom) {
		if (typeof atom === 'function') {
			return new Transaction(union, atom)
		}

		if (atom instanceof Mutate) {
			return atom.mutate(union)
		}

		if (typeof atom === 'number') {
			return new NumberStore(atom)
		}

		if (Array.isArray(atom)) {
			return new ArrayStore(atom)
		}

		if (atom instanceof Map) {
			return new MapStore(atom)
		}

		if (typeof atom === 'object') {
			return new ObjectStore(atom)
		}

		return new Store(atom)
	}

	mutate (fn) {
		return new Mutate(fn)
	}
	
	asIs (value) {
		return this.mutate(() => value)
	}

	mart (mapFn) {
		return this.mutate((union) => new Mart(union, mapFn))
	}

	effect(fn, trigger) {
		return this.mutate((union) => new Effect(trigger(union), new Transaction(union, fn)))
	}
}

export default new Form()