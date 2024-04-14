import React, { createContext, useState } from "react"

export const MasterContext = createContext()
export const MasterState = ({ children }) => {
	const [userState, setUserState] = useState({})
	const [listState, setListState] = useState([])
	const [flags, setFlags] = useState({})

	return (
		<MasterContext.Provider value={{ userState, setUserState, listState, setListState, flags, setFlags }}>
			{children}
		</MasterContext.Provider>
	)
}
