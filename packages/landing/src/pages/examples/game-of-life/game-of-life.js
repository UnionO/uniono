import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import StopIcon from '@material-ui/icons/Stop'
import React from 'react'

import useLife from './useLife' 

const CANVAS_SIZE = {
	width: 1000,
	height: 500
}

const Life = () => {
	const classes = useClasses()
	const life = useLife()
	const boardRef = React.useRef()

	// Draw board
	React.useEffect(() => {
		if (boardRef.current == null) {
			return
		}

		const { width, height } = boardRef.current.getBoundingClientRect();
		const size = {
			width: life.zoom / width * CANVAS_SIZE.width,
			height: life.zoom / height * CANVAS_SIZE.height,
		}
		
		const context = boardRef.current.getContext('2d')

		context.clearRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height)
		context.fillStyle = 'rgb(130, 170, 255)'
		for(let { x, y } of life.board.values()) {
			context.fillRect(
				(x - life.view.x) * size.width, 
				(y - life.view.y) * size.height, 
				size.width, 
				size.height
			);
		}
	}, [ life.view, life.zoom, life.board ])

	// handlers
	const onMouseDown = React.useCallback(
		(e) => life.startMove(getBoardPosition(e, life.zoom)),
		[ life ]
	)
	const onMouseUp = React.useCallback(
		(e) => life.stopMove(),
		[ life ]
	)
	const onMouseMove = React.useCallback(
		(e) => life.onMove(getBoardPosition(e, life.zoom)),
		[ life ]
	)

	return (
		<div className={classes.root}>
			<Select
				value={life.startPosition}
				onChange={({ target }) => life.setStartPosition(target.value)}
				className={classes.select}
			>
				<MenuItem value="gosperGliderGun">Gosper Glider Gun</MenuItem>
				<MenuItem value="pulsar">Pulsar</MenuItem>
			</Select>
			<div className={classes.content}>
				<div className={classes.slider}>
					<Slider 
						orientation="vertical"
						value={life.zoom}
						onChange={(_, value) => life.setZoom(value)}
						min={life.config.zoom.minValue}
						max={life.config.zoom.maxValue}
					/>
				</div>
				<IconButton onClick={life.interval ? life.stop : life.start} color="inherit" className={classes.playStopButton}>
					{life.interval == null ? <PlayArrowIcon /> : <StopIcon />}
				</IconButton>
				<canvas 
					ref={boardRef} 
					width={CANVAS_SIZE.width}
					height={CANVAS_SIZE.height}
					className={`${classes.board} ${life.move ? classes.boardMove : ''}`} 
					onMouseDown={onMouseDown}
					onMouseMove={onMouseMove}
					onMouseUp={onMouseUp}
					onMouseLeave={onMouseUp}
					onTouchStart={onMouseDown}
					onTouchEnd={onMouseUp}
					onTouchMove={onMouseMove}
				/>
			</div>
		</div>
	)	
}

const useClasses = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		marginBottom: theme.spacing(2),
		width: '100%',
		flex: 1
	},
	content: {
		marginTop: theme.spacing(2),
		position: "relative",
		display: 'flex',
		flex: 1,
		flexDirection: 'row'
	},
	playStopButton: {
		position: "absolute",
		top: 8,
		right: 8,
	},
	slider: {
	},
	board: {
		flex: 1,
		backgroundColor: 'rgb(41, 45, 62)',
		maxWidth: 'calc(100% - 28px)',
		maxHeight: '100%',
		cursor: 'grab'
	},
	boardMove: {
		cursor: 'grabbing'
	},
	select: {
		color: 'white',
		'&:before': {
			borderBottomColor: 'white !important'
		},
		'& > svg': {
			color: 'white',
		}
	},
}))

const getBoardPosition = (e, zoom) => {
	const { width, height } = e.target.getBoundingClientRect();
	const size = {
		width: zoom / width * CANVAS_SIZE.width,
		height: zoom / height * CANVAS_SIZE.height,
	}

	return { x: e.screenX / size.width, y: e.screenY / size.height }
}

export default Life