import React from "react"
import RBSheet from "react-native-raw-bottom-sheet"
import { StyleSheet, View } from "react-native"
import { COLORS, FONT } from "../utils/constants"
import { ThemeButton, ThemeText } from "../components/ThemeComponents"

const BottomSheet = ({ refRBSheet, heading, data, iconHidden }) => (
	<RBSheet
		ref={refRBSheet}
		closeOnPressBack={true}
		draggable={true}
		dragOnContent={true}
		openDuration={400}
		customModalProps={{
			animationType: "slide",
			statusBarTranslucent: true
		}}
		customStyles={{
			wrapper: {
				backgroundColor: "transparent"
			},
			container: styles.container,
			draggableIcon: {
				display: "none"
			}
		}}
	>
		{heading && (
			<View style={styles.header}>
				<ThemeText style={{ fontSize: FONT.small }}>{heading}</ThemeText>
			</View>
		)}
		{data?.map((i, idx) => (
			<View key={`${i.length}-${idx}`} style={idx > 0 ? { borderTopColor: COLORS.BORDER, borderTopWidth: 1 } : {}}>
				{i.map(({ action, label, detail, Icon, rippleDisabled, disabled }, _idx) => (
					<ThemeButton
						key={label + _idx}
						style={styles.element}
						_containerStyle={{ width: "100%" }}
						rippleBordered
						rippleDisabled={rippleDisabled}
						onPress={action}
					>
						{!iconHidden && (
							<View style={styles.icon}>{Icon && <Icon size={FONT.xxLarge} color={COLORS.FONT_PRIMARY} />}</View>
						)}
						<View style={disabled ? { opacity: 0.5 } : {}}>
							<ThemeText style={{ fontSize: FONT.medium }}>{label}</ThemeText>
							{detail && <ThemeText style={{ fontSize: FONT.xSmall }}>{detail}</ThemeText>}
						</View>
					</ThemeButton>
				))}
			</View>
		))}
	</RBSheet>
)

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.DARK_MODAL_SECONDARY,
		borderTopLeftRadius: 35,
		borderTopRightRadius: 35,
		paddingTop: 12,
		paddingBottom: 50,
		height: "auto"
	},
	element: {
		gap: 20,
		paddingHorizontal: 25,
		paddingVertical: 16,
		flexDirection: "row",
		alignItems: "center"
	},
	icon: {
		width: 30
	},
	header: {
		paddingVertical: 20,
		paddingHorizontal: 25
	}
})

export default BottomSheet
