const index = require('../README.md')
const store = require('./store.md')
const arrayStore = require('./array-store.md')
const booleanStore = require('./boolean-store.md')
const mapStore = require('./map-store.md')
const numberStore = require('./number-store.md')
const objectStore = require('./object-store.md')
const mart = require('./mart.md')
const transaction = require('./transaction.md')

module.exports = {
	index,
	store,
	'array-store': arrayStore,
	'boolean-store': booleanStore,
	'map-store': mapStore,
	'number-store': numberStore,
	'object-store': objectStore,
	mart,
	transaction
}