import useUnion from '@uniono/react'
import React from 'react'

export const normalize = (value, delta, maxValue) => ({
  value,
  maxValue,
  stringValue: value < 10 ? '0' + value : value.toString(),
  angle: ((value + delta) / maxValue) * 360
})

export const watches = {
	view: 'simple',
	now: new Date(),
	interval: null,
	parsed: useUnion.mart(({ now }) => ({
		seconds: normalize(now.getSeconds(), 0, 60),
		minutes: normalize(now.getMinutes(), now.getSeconds() / 60, 60),
		hours: normalize(now.getHours(), (now.getMinutes() + now.getSeconds() / 60) / 60, 12),
	})),
	setNow: ({ mutations }, value) => mutations.now.setValue(value),
	setView: ({ mutations }, value) => mutations.view.setValue(value),
	start: ({ mutations, apply }) => {
		const intervalId = setInterval(() => {
			mutations.setNow(new Date())
			apply()
		}, 1000)

		mutations.interval.setValue(intervalId)
	},
	stop: ({ value, mutations }) => {
		clearInterval(value().interval)
		mutations.interval.setValue(null)
	}
}

export default () => { 
	const model = useUnion(watches)

	React.useEffect(() => {
		model.start()

		return () => model.stop()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ ])

	return model
}