import Mart from '@uniono/state/lib/mart'
import Form from '@uniono/state/lib/form'

import { watches } from './useWatches'

test('initial state', () => {
	const { value: { view, now, interval } } = new Mart(Form.from(watches))

	expect(view).toEqual('clock')
	expect(Date.now() - now.getTime()).toBeLessThan(500)
	expect(interval).toBeNull()
})

test('parsed', () => {
	const form = new Mart(Form.from(watches))

	form.value.setNow(new Date(2020, 0, 1, 0, 0, 0, 0))
	expect(form.value.parsed).toEqual({
		seconds: { value: 0, maxValue: 60, stringValue: '00', angle: 0 },
		minutes: { value: 0, maxValue: 60, stringValue: '00', angle: 0 },
		hours: { value: 0, maxValue: 12, stringValue: '00', angle: 0 }
	})

	form.value.setNow(new Date(2020, 0, 1, 6, 0, 0, 0))
	expect(form.value.parsed).toEqual({
		seconds: { value: 0, maxValue: 60, stringValue: '00', angle: 0 },
		minutes: { value: 0, maxValue: 60, stringValue: '00', angle: 0 },
		hours: { value: 6, maxValue: 12, stringValue: '06', angle: 180 }
	})
})

test('setNow', () => {
	const form = new Mart(Form.from(watches))
	const date = new Date(2020, 0, 1, 0, 0, 0, 0)

	form.value.setNow(date)

	expect(form.value.now).toEqual(date)
})

test('setView', () => {
	const form = new Mart(Form.from(watches))

	form.value.setView('simple')

	expect(form.value.view).toEqual('simple')
})

test('start', async () => {
	const form = new Mart(Form.from(watches))

	form.value.start()
	await new Promise(resolve => setTimeout(resolve, 2300))

	expect(Date.now() - form.value.now.getTime()).toBeLessThan(500)
	expect(form.value.interval).toBeDefined()
})

test('stop', async () => {
	const form = new Mart(Form.from(watches))

	form.value.start()
	form.value.stop()
	const date = form.value.now
	await new Promise(resolve => setTimeout(resolve, 1500))

	expect(form.value.now).toEqual(date)
	expect(form.value.interval).toBeNull()
})