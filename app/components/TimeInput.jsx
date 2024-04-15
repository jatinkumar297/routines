import React from "react"
import { Pressable, StyleSheet } from "react-native"
import { ThemeButton, ThemeText } from "./ThemeComponents"
import { COLORS, FONT } from "../utils/constants"
import { AntDesign } from "@expo/vector-icons"

function TimeInput({ onPress, advanced }) {
	return (
		<ThemeButton
			style={[styles.timeInputBtn, { borderColor: advanced ? COLORS.FONT_LIGHT : COLORS.BORDER }]}
			borderRadius={8}
			onPress={onPress}
		>
			<ThemeText style={{ fontSize: FONT.small, paddingBottom: 1, fontWeight: 600 }} theme={!advanced}>
				Today, 3:25 PM
			</ThemeText>
			{advanced && (
				<Pressable>
					<AntDesign name="close" color={COLORS.FONT_PRIMARY} size={FONT.normal} />
				</Pressable>
			)}
		</ThemeButton>
	)
}

const styles = StyleSheet.create({
	timeInputBtn: {
		borderWidth: 1,
		paddingVertical: 6,
		paddingHorizontal: 16,
		alignSelf: "flex-start",
		alignItems: "center",
		flexDirection: "row",
		gap: 14
	}
})

export default TimeInput
