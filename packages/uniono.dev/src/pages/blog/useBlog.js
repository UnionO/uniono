import useUnion from '@uniono/react'

import posts from './posts'
import UI from '../../ui'

const blog = {
	UI: useUnion.asIs(UI),
	posts: useUnion.asIs(posts)
}

export default () => useUnion(blog)