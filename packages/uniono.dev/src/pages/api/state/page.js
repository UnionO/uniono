import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import React from 'react'

import useArticle from '../../../unions/article'

export default ({ children, breadcrumb }) => {
	const { UI } = useArticle()

	return (
		<>
			<Breadcrumbs aria-label="breadcrumb">
				<Link color="inherit" href="#!/api/state">
					@uniono/state
				</Link>
				{breadcrumb 
					? (
						<Link color="inherit">
							{breadcrumb}
						</Link>
					)
					: null}
			</Breadcrumbs>
			<UI.Article>
				{children}
			</UI.Article>
		</>
	)
}