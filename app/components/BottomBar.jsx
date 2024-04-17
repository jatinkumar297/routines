import React from "react"
import { StyleSheet, View } from "react-native"
import { COLORS } from "../utils/constants"
import { ThemeButton } from "./ThemeComponents"

const BottomBar = ({ leftSideData, rightSideData }) => {
	return (
		<View style={styles.bottomBarContainer}>
			<View style={styles.contentWrapper}>
				<View style={{ flexDirection: "row", gap: 5, height: "fit-content" }}>
					{leftSideData?.map(({ label, Icon, action }) => (
						<ThemeButton
							key={label}
							rippleColor={COLORS.DARK_SECONDARY}
							style={{ padding: 12 }}
							_containerStyle={{ alignSelf: "center" }}
							rippleRadius={20}
							onPress={action}
						>
							<Icon color={COLORS.FONT_PRIMARY} />
						</ThemeButton>
					))}
				</View>
				<View style={{ flexDirection: "row", gap: 0, height: "fit-content" }}>
					{rightSideData?.map(({ label, Component }) => (
						<Component key={label} />
					))}
				</View>
			</View>
		</View>
	)
}

export default BottomBar

const styles = StyleSheet.create({
	bottomBarContainer: {
		paddingHorizontal: 15,
		height: 75,
		backgroundColor: "#1e1f21",
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "100%",
		justifyContent: "center"
	},
	contentWrapper: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	}
})
