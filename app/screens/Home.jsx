import React from "react"
import { StyleSheet, View } from "react-native"
import { ThemeText } from "../components/ThemeComponents"
import { FONT } from "../utils/constants"
import Tabs from "../components/Tabs"

function Home({ navigation }) {
	return (
		<View style={styles.container}>
			<View style={styles.headerWrapper}>
				<ThemeText style={styles.header} center>
					Routines
				</ThemeText>
				<View style={styles.profile}>
					<ThemeText style={styles.profileText}>J</ThemeText>
				</View>
			</View>
			<Tabs />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	headerWrapper: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignContent: "center",
		justifyContent: "center",
		width: "100%",
		position: "relative"
	},
	header: {
		fontSize: FONT.xLarge
	},
	profile: {
		width: 36,
		aspectRatio: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "purple",
		fontSize: FONT.small,
		position: "absolute",
		right: 20,
		top: 8,
		borderRadius: 50
	}
})

export default Home
