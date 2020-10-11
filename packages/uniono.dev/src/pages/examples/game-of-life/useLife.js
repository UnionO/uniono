import useUnion from '@uniono/react'

import gosperGliderGun from './positions/gosper-glider-gun'
import pulsar from './positions/pulsar'

const positions = {
	gosperGliderGun,
	pulsar
}

export const config = {
	config: useUnion.asIs({
		zoom: { 
			minValue: 1, 
			maxValue: 50
		}
	})
}

export const view = {
	view: { x: 0, y: 0 },
	move: null,
	zoom: 20,
	setZoom: ({ mutations }, position) => mutations.zoom.setValue(position),
	startMove: ({ mutations }, position) => mutations.move.setValue(position),
	stopMove: ({ mutations }) => mutations.move.setValue(null),
	onMove: ({ value, mutations }, position) => {
		const { move, view } = value()
		if (move == null) {
			return
		}

		mutations.move.setValue(position)
		mutations.view.setValue({ 
			x: view.x - (position.x - move.x),
			y: view.y - (position.y - move.y)
		})
	}
}

export const game = {
	interval: null,
	startPosition: 'pulsar',
	board: new Map(pulsar.map((point) => [ `${point.x}_${point.y}`, point ])),
	setStartPosition: ({ mutations }, position) => {
		mutations.stop()
		mutations.startPosition.setValue(position)
		mutations.board.setValue(new Map(positions[position].map((point) => [ `${point.x}_${point.y}`, point ])))
		mutations.view.setValue({ x: 0, y: 0 })
	},
	tick: ({ value, mutations }) => {
		const { board } = value()
		const delta = new Map()
		const process = ({ x, y }) => {
			if (Math.max(Math.abs(x), Math.abs(y)) > 1000 || delta.has(`${x}_${y}`)) {
				return
			}

			let neighbors = 0
			for (let dx = -1; dx < 2; dx++) {
				for (let dy = -1; dy < 2; dy++) {
					if (dx === 0 && dy === 0) {
						continue
					}

					neighbors += board.has(`${x + dx}_${y + dy}`) ? 1 : 0
				}
			}

			delta.set(
				`${x}_${y}`, 
				((neighbors === 2 || neighbors === 3) && board.has(`${x}_${y}`)) || neighbors === 3
					? { x, y }
					: false
			)
		}

		for (let { x, y } of board.values()) {
			for (let dx = -1; dx < 2; dx++) {
				for (let dy = -1; dy < 2; dy++) {
					process({ x: x + dx, y: y + dy })
				}
			}
		}

		for (let key of delta.keys()) {
			const point = delta.get(key)
			if (point) {
				mutations.board.set(key, point)
				continue
			}

			mutations.board.delete(key, point)
		}
	},
	start: ({ value, mutations, apply }) => {
		const { interval, tick } = value()
		if (interval != null) {
			return
		}

		mutations.interval.setValue(setInterval(() => {
			tick()
			apply()
		}, 100))
	},
	stop: ({ value, mutations }) => {
		const { interval } = value()
		if (interval == null) {
			return
		}

		clearInterval(interval)
		mutations.interval.setValue(null)
	}
}

export const life = {
	...config,
	...view,
	...game,
	interval: null,
}

export default () => useUnion(life)