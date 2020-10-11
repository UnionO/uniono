import Page404 from './404'
import api from './api'
import blog from './blog'
import examples from './examples'
import gettingStarted from './getting-started'
import main from './main'
import news from './news'

export default {
	'404': Page404,
	...examples,
	...api,
	blog,
	'': main,
	'getting-started': gettingStarted,
	news,
}