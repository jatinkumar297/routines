import React from "react"
import { Pressable, StyleSheet } from "react-native"
import { ThemeButton, ThemeText } from "./ThemeComponents"
import { COLORS, FONT } from "../utils/constants"
import { AntDesign } from "@expo/vector-icons"

function TimeInput({ onPress, advanced, time, remove }) {
	return (
		<ThemeButton
			style={[
				styles.timeInputBtn,
				advanced ? { paddingRight: 0, paddingVertical: 0, gap: 6, borderColor: COLORS.FONT_LIGHT } : {}
			]}
			borderRadius={8}
			onPress={onPress}
		>
			<ThemeText style={{ fontSize: FONT.small, paddingBottom: 1, fontWeight: 600 }} theme={!advanced}>
				{time?.hours}:{time?.minutes} {time?.indicator ? "am" : "pm"}
			</ThemeText>
			{advanced && (
				<Pressable
					style={{ paddingVertical: 8, paddingRight: 10, paddingLeft: 8 }}
					onPress={e => {
						e.stopPropagation()
						remove()
					}}
				>
					<AntDesign name="close" color={COLORS.FONT_PRIMARY} size={FONT.normal} />
				</Pressable>
			)}
		</ThemeButton>
	)
}

const styles = StyleSheet.create({
	timeInputBtn: {
		borderWidth: 1,
		borderColor: COLORS.BORDER,
		paddingVertical: 6,
		paddingHorizontal: 16,
		alignSelf: "flex-start",
		alignItems: "center",
		flexDirection: "row",
		gap: 14
	}
})

export default TimeInput
