import React, { useState } from "react"
import { Pressable, StyleSheet } from "react-native"
import { ThemeButton, ThemeText } from "./ThemeComponents"
import { COLORS, FONT } from "../utils/constants"
import { AntDesign } from "@expo/vector-icons"

const TimeLabel = ({ onPress, theme, text, placeholder, remove, LeftIcon, RightIcon }) => (
	<ThemeButton
		style={[
			styles.timeInputBtn,
			{ maxWidth: "100%" },
			LeftIcon ? { paddingLeft: 8 } : {},
			remove && text ? { paddingRight: 0, paddingVertical: 0, gap: 6 } : {},
			!theme ? { borderColor: COLORS.FONT_LIGHT } : {}
		]}
		borderRadius={8}
		onPress={onPress}
	>
		{LeftIcon && <LeftIcon color={COLORS.FONT_PRIMARY} size={FONT.medium} />}
		<ThemeText
			style={{ fontSize: FONT.small, paddingBottom: 1, fontWeight: 600, maxWidth: text ? "90%" : null }}
			numberOfLines={1}
			theme={theme}
		>
			{text || placeholder}
		</ThemeText>
		{RightIcon ? (
			<RightIcon color={COLORS.FONT_PRIMARY} size={FONT.medium} />
		) : remove && text?.length > 0 ? (
			<Pressable
				style={{ paddingVertical: 8, paddingRight: 10, paddingLeft: 8 }}
				onPress={e => {
					e.stopPropagation()
					remove()
				}}
			>
				<AntDesign name="close" color={COLORS.FONT_PRIMARY} size={FONT.normal} />
			</Pressable>
		) : null}
	</ThemeButton>
)

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

export default TimeLabel
