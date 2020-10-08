import Core from './core'
import React from './react'
import State from './state'
import StateStore from './state/pages/store'
import StateArrayStore from './state/pages/array-store'
import StateMapStore from './state/pages/map-store'
import StateBooleanStore from './state/pages/boolean-store'
import StateNumberStore from './state/pages/number-store'
import StateObjectStore from './state/pages/object-store'
import StateEffect from './state/pages/effect'
import StateMart from './state/pages/mart'
import StateTransaction from './state/pages/transaction'

export default {
	'api/core': Core,
	'api/react': React,
	'api/state': State,
	'api/state/store': StateStore,
	'api/state/array-store': StateArrayStore,
	'api/state/map-store': StateMapStore,
	'api/state/boolean-store': StateBooleanStore,
	'api/state/number-store': StateNumberStore,
	'api/state/object-store': StateObjectStore,
	'api/state/effect': StateEffect,
	'api/state/mart': StateMart,
	'api/state/transaction': StateTransaction,
}