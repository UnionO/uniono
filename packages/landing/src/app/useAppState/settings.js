export default { 
	packageManager: 'npm',
	theme: 'dark',
	themeToggle: ({ value, mutations }) => 
		mutations.theme.setValue(value().theme === 'dark' ? 'classic' : 'dark')
}