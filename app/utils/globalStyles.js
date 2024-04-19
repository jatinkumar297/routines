import { StyleSheet } from "react-native"
import { COLORS, FONT, defaultHPadding } from "./constants"

export default StyleSheet.create({
	icon: {
		fontSize: 24,
		color: COLORS.FONT_PRIMARY
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: 18,
		paddingHorizontal: defaultHPadding,
		paddingVertical: 15
	},
	ractButton: {
		paddingHorizontal: 16,
		paddingVertical: 15,
		marginRight: 10
	},
	ractButtonText: {
		fontSize: FONT.default,
		fontWeight: 600
	}
})
