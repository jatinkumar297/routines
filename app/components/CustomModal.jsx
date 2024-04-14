import React from "react"
import { Dimensions, Modal, StyleSheet, View } from "react-native"
import { COLORS } from "../utils/constants"

export const hPadd = 20
export const modalWidth = Dimensions.get("window").width * 0.9 - hPadd * 2

const CustomModal = ({ children, visible, ...props }) => {
	return (
		<Modal visible={visible} animationType="slide" transparent>
			<View
				style={{
					...StyleSheet.absoluteFillObject,
					alignItems: "center",
					justifyContent: "center",
					backgroundColor: COLORS.OVERLAY
				}}
			>
				<View
					style={{
						backgroundColor: COLORS.DARK_MODAL,
						borderRadius: 30,
						width: modalWidth + hPadd * 2,
						paddingTop: 15
					}}
					{...props}
				>
					{children}
				</View>
			</View>
		</Modal>
	)
}

export default CustomModal
