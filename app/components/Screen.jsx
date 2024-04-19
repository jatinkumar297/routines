import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"

const Screen = ({ children }) => {
	return (
		<SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
			{children}
		</SafeAreaView>
	)
}

export default Screen
