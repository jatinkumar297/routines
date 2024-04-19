import React from "react"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const Screen = ({ children }) => {
	return (
		<SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
			<View style={{ flex: 1 }}>{children}</View>
		</SafeAreaView>
	)
}

export default Screen
