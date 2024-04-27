import { StyleSheet, Animated, StatusBar, View, Dimensions } from "react-native"
import React, { useEffect, useRef } from "react"
import { COLORS } from "../utils/constants"
import { hPadd, modalWidth } from "./ThemeModal"
const wHeight = Dimensions.get("window").height

const CustomModal = ({ children, visible, close }) => {
	const translateY = useRef(new Animated.Value(wHeight)).current

	useEffect(() => {
		if (visible)
			Animated.timing(translateY, {
				toValue: StatusBar.currentHeight / 2,
				duration: 500,
				useNativeDriver: true
			}).start()
	}, [visible])

	const _close = () => {
		Animated.timing(translateY, {
			toValue: wHeight,
			duration: 250,
			useNativeDriver: true,
			delay: 0
		}).start()
		setTimeout(() => close(), 200)
	}

	return (
		<View style={[styles.container, { opacity: visible ? 1 : 0, pointerEvents: visible ? "auto" : "none" }]}>
			<Animated.View style={[styles.animatedView, { transform: [{ translateY: translateY }] }]}>
				<View style={styles.modal}>{children({ visible, close: _close })}</View>
			</Animated.View>
		</View>
	)
}

export default CustomModal

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: COLORS.OVERLAY
	},
	animatedView: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		justifyContent: "center"
	},
	modal: {
		backgroundColor: COLORS.DARK_MODAL,
		borderRadius: 30,
		width: modalWidth + hPadd * 2,
		paddingTop: 15
	}
})
