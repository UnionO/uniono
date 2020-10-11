import { makeStyles } from '@material-ui/core/styles';
import React from 'react'
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/theme-solarized_dark"

export default ({ value, inline }) => {
	const classes = useStyles()
	const linesCount = React.useMemo(() => value.split('\n').length, [ value ])

	return (
		<div className={inline ? classes.inline : classes.root}>
			<AceEditor
				width={inline ? `${value.length * 8}px` : "100%"}
				mode="javascript"
				theme="solarized_dark"
				showPrintMargin={false}
				showGutter={!inline}
				highlightActiveLine={false}
				readOnly={true}
				name={value}
				editorProps={{ $blockScrolling: !inline }}
				setOptions={{
					showLineNumbers: !inline,
					tabSize: 2,
				}}
				value={value}
				minLines={linesCount}
				maxLines={linesCount}
			/>
		</div>
	)
}

const useStyles = makeStyles((theme) => ({
	root: {
		margin: `${theme.spacing(2)}px 0`
	},
	 inline: {
		position: 'relative',
		top: 4,
		height: '1.25rem',
		display: 'inline-flex',
		alignItems: 'flex-end',
		margin: `0 ${theme.spacing(1)}px`
	 }
}))