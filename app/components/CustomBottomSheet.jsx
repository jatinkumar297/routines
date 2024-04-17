import React, { forwardRef } from "react"
import { StyleSheet, View } from "react-native"
import { COLORS, FONT } from "../utils/constants"
import { ThemeButton, ThemeText } from "./ThemeComponents"
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet"
import { Easing } from "react-native-reanimated"

const CustomBottomSheet = forwardRef(({ componentKey, heading, data, iconHidden, onClose }, ref) => {
	return (
		<BottomSheet
			ref={ref}
			enableDynamicSizing
			enablePanDownToClose
			index={-1}
			backdropComponent={props => (
				<BottomSheetBackdrop disappearsOnIndex={-1} pressBehavior={"close"} {...props} />
			)}
			animationConfigs={{
				duration: 160,
				easing: Easing.linear
			}}
			handleIndicatorStyle={{ display: "none" }}
			backgroundComponent={null}
		>
			<BottomSheetView style={styles.container}>
				<View style={{ paddingTop: 12 }} />
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
							>
								{!iconHidden && (
									<View style={styles.icon}>
										{Icon && <Icon size={FONT.xLarge} color={COLORS.FONT_PRIMARY} />}
									</View>
								)}
								<View style={disabled ? { opacity: 0.5 } : {}}>
									<ThemeText style={{ fontSize: FONT.normal }}>{label}</ThemeText>
									{detail && <ThemeText style={{ fontSize: FONT.xSmall }}>{detail}</ThemeText>}
								</View>
							</ThemeButton>
						))}
					</View>
				))}
			</BottomSheetView>
		</BottomSheet>
	)
})

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.DARK_MODAL_SECONDARY,
		borderTopLeftRadius: 35,
		borderTopRightRadius: 35,
		paddingBottom: 15,
		height: "auto"
	},
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

export default CustomBottomSheet
