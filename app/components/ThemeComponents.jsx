import React from "react"
import { Text, View } from "react-native"
import { COLORS, FONT } from "../utils/constants"
import { Pressable } from "react-native"

export const ThemeText = ({ children, style = {}, theme, ...props }) => {
	const combinedStyles = [
		{
			fontSize: FONT?.normal,
			color: theme ? COLORS.THEME : COLORS.FONT_PRIMARY
		},
		...(Array.isArray(style) ? style : [style])
	]

	return (
		<Text {...props} style={combinedStyles}>
			{children}
		</Text>
	)
}

export function ThemeButton({
	children,
	onPress,
	margin = {},
	rippleColor = COLORS.DARK_HIGHLIGHT,
	rippleBordered = false,
	rippleRadius,
	borderRadius = 0,
	style = {},
	_containerStyle = {},
	...props
}) {
	const combinedStyle = (Array.isArray(style) ? style : [style]).concat({ borderRadius })
	const rippleConfig = {
		color: rippleColor,
		borderless: !(borderRadius || rippleBordered),
		...(rippleRadius ? { radius: rippleRadius } : {})
	}

	const containerStyle = {
		overflow: borderRadius > 0 ? "hidden" : "auto",
		alignSelf: "flex-start",
		...(borderRadius ? { borderRadius } : {}),
		...margin,
		..._containerStyle
	}

	return (
		<View role="button" style={containerStyle}>
			<Pressable
				android_ripple={rippleConfig}
				style={combinedStyle}
				onPress={onPress}
				children={children}
				{...props}
			/>
		</View>
	)
}
