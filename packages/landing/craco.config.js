const path = require('path')

module.exports = {
	webpack: {
		alias: {
			react: path.resolve('node_modules', 'react'),
			'react-dom': path.resolve('node_modules', 'react-dom'),
			'@material-ui/core': path.resolve('node_modules', '@material-ui', 'core'),
			'@material-ui/icons': path.resolve('node_modules', '@material-ui', 'icons'),
		}
	}
}