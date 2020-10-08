import useUnion from '@uniono/react'

const blogPost = {
	UI: useUnion.inject('ui'),
	open: false,
	shareOpen: false,
	openToggle: ({ value, mutations }) => mutations.open.toggle(),
	shareOpenToggle: ({ value, mutations }) => mutations.shareOpen.toggle(),
	shareCopy: () => {
		const element = document.createElement('textarea')
		element.value = 'https://uniono.dev/blog'
		document.body.appendChild(element)
		
		element.select()
		element.setSelectionRange(0, element.value.length)
		document.execCommand('copy')
		document.body.removeChild(element)
	}
}

export default () => useUnion(blogPost)