import React from "react"
import { StyleSheet, View } from "react-native"
import { ThemeButton, ThemeText } from "./ThemeComponents"
import { COLORS, FONT } from "../utils/constants"

function TimeInput({ onPress }) {
	return (
		<ThemeButton style={styles.timeInputBtn} borderRadius={6} onPress={onPress}>
			<ThemeText style={{ fontSize: FONT.small }} theme>
				Today, 3:25 pm
			</ThemeText>
		</ThemeButton>
	)
}

const styles = StyleSheet.create({
	timeInputBtn: {
		borderWidth: 1,
		borderColor: COLORS.BORDER,
		paddingVertical: 5,
		paddingBottom: 7,
		paddingHorizontal: 16,
		alignSelf: "flex-start"
	}
})

export default TimeInput
