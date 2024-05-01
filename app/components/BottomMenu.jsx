import React, { forwardRef } from "react"
import { StyleSheet, View } from "react-native"
import CustomBottomSheet from "./CustomBottomSheet"
import { ThemeButton, ThemeText } from "./ThemeComponents"
import { COLORS, FONT } from "../utils/constants"

const BottomMenu = forwardRef(({ componentKey, heading, data, iconHidden }, ref) => {
	return (
		<CustomBottomSheet ref={ref}>
			{Boolean(heading) ? (
				<View style={styles.header}>
					<ThemeText style={{ fontSize: FONT.xSmall }}>{heading}</ThemeText>
				</View>
			) : null}
			{data?.map((i, idx) => (
				<View
					key={(componentKey || heading) + idx}
					style={idx > 0 ? { borderTopColor: COLORS.BORDER, borderTopWidth: 1 } : {}}
				>
					{i?.map(({ action, label, detail, Icon, rippleDisabled, disabled }, _idx) => (
						<ThemeButton
							key={label + _idx}
							style={styles.element}
							_containerStyle={{ width: "100%" }}
							rippleDisabled={rippleDisabled}
							rippleBordered
							onPress={action}
							disabled={disabled}
						>
							{!iconHidden && (
								<View style={styles.icon}>{Icon && <Icon size={FONT.xLarge} color={COLORS.FONT_PRIMARY} />}</View>
							)}
							<View style={disabled ? { opacity: 0.5 } : {}}>
								<ThemeText style={{ fontSize: FONT.normal }}>{label}</ThemeText>
								{detail && <ThemeText style={{ fontSize: FONT.xSmall }}>{detail}</ThemeText>}
							</View>
						</ThemeButton>
					))}
				</View>
			))}
		</CustomBottomSheet>
	)
})

export default BottomMenu

const styles = StyleSheet.create({
	element: {
		paddingHorizontal: 25,
		paddingVertical: 16,
		flexDirection: "row",
		alignItems: "center"
	},
	icon: {
		width: 35
	},
	header: {
		paddingVertical: 15,
		paddingHorizontal: 25
	}
})
