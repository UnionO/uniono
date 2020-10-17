import Mart from '@uniono/state/lib/mart'
import Store from '@uniono/state/lib/store'
import ArrayStore from '@uniono/state/lib/store/array'
import MapStore from '@uniono/state/lib/store/map'
import BooleanStore from '@uniono/state/lib/store/boolean'
import NumberStore from '@uniono/state/lib/store/number'
import ObjectStore from '@uniono/state/lib/store/object'
import Transaction from '@uniono/state/lib/transaction'
import React from 'react'

import UseUnionContext, { DIContext } from './context'

const useUnion = (template) => {
	const diMap = React.useContext(DIContext)
	const martRef = React.useRef()
	const [ version, versionInc ] = React.useReducer((i) => i + 1, 0)

	if (martRef.current == null) {
		martRef.current = new Mart(from({ diMap }, template))
	}

	React.useEffect(() => {
		martRef.current.on(versionInc)
		
		return () => martRef.current.end()
	}, [ martRef ])
	
	return martRef.current.value
}

const from = (env, templateArg) => {
	const template = typeof templateArg === 'function' ? templateArg(env) : templateArg

	if (typeof template !== 'object') {
		throw new Error(`useUnionForm: unhandled atom type ${JSON.stringify(typeof template)}`)
	}

	const union = {}
	const atomEnv = { ...env, union }
	return Object.keys(template).reduce((agg, key) => {
		agg[key] = useUnion.atom(atomEnv, template[key])

		return agg
	}, union)
}

export class Mutate {
	constructor(fn)	{
		this.fn = fn
	}
}

useUnion.mutate = (fn) => new Mutate(fn)
useUnion.asIs = (atom) => new Mutate(() => atom)
useUnion.from = (atom) => new Mutate((env) => from(env, atom))
useUnion.atom = (env, atom) => {
	if (atom instanceof Mutate) {
		return atom.fn(env)
	}

	if (typeof atom === 'function') {
		return new Transaction(env.union, atom)
	}

	if (typeof atom === 'boolean') {
		return new BooleanStore(atom)
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
useUnion.store = (atom) => new Mutate(() => new Store(atom))
useUnion.arrayStore = (atom) => new Mutate(() => new ArrayStore(atom))
useUnion.mapStore = (atom) => new Mutate(() => new MapStore(atom))
useUnion.booleanStore = (atom) => new Mutate(() => new BooleanStore(atom))
useUnion.numberStore = (atom) => new Mutate(() => new NumberStore(atom))
useUnion.objectStore = (atom) => new Mutate(() => new ObjectStore(atom))
useUnion.mart = (mapFn, unionMap = (x) => x) => new Mutate((env) => new Mart(unionMap(env.union), mapFn))
useUnion.transaction = (fn, unionMap = (x) => x) => new Mutate((env) => new Transaction(unionMap(env.union), fn))
useUnion.global = (key, atom) => new Mutate((env) => {
	const result = useUnion.atom(env, atom)
	env.diMap.set(key, result)

	return result
})
useUnion.inject = (key, map = (x) => x) => new Mutate((env) => {
	if (!env.diMap.has(key)) {
		throw new Error(`useUnion: global key ${JSON.stringify(key)} not found`)
	}
	
	return map(env.diMap.get(key))
})

export const DIProvider = UseUnionContext
export default useUnion