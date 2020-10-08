import React from 'react'

export const DIContext = React.createContext()

export default ({ children }) => { 
	const value = React.useMemo(() => new Map(), [])

	return (
		<DIContext.Provider value={value}>
			{children}
		</DIContext.Provider>
	)
}