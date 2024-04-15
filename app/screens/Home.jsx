import React from "react"
import { StyleSheet, View } from "react-native"
import { ThemeText } from "../components/ThemeComponents"
import { FONT } from "../utils/constants"
import Tabs from "../components/Tabs"
import { useStore } from "../store"

function Home({ navigation }) {
	const listNames = useStore(state => state.lists.map(({ _id, title }) => ({ _id, title })))
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
			<Tabs listNames={listNames} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	headerWrapper: {
		paddingVertical: 15,
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
		backgroundColor: "#aa47bc",
		fontSize: FONT.small,
		position: "absolute",
		right: 20,
		top: 13,
		borderRadius: 50
	}
})

export default Home
