import React, { useEffect, useRef, useState } from "react"
import { Animated, StatusBar, StyleSheet, TouchableHighlight, View } from "react-native"
import { ThemeButton, ThemeText } from "./ThemeComponents"
import { COLORS, FONT } from "../utils/constants"
import { Dimensions } from "react-native"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import globalStyles from "../utils/globalStyles"
import ClockModal from "./ClockModal"
import { Calender } from "./Calender"
import { hPadd, modalWidth } from "./CustomModal"
const wHeight = Dimensions.get("window").height

export const DateTimeModal = ({ navigation, visible = false, close, onSubmit }) => {
	const [data, setData] = useState({ date: null, time: null, repeats: null })
	const [showCalender, setShowCalender] = useState()
	const [showClock, setShowClock] = useState()

	useEffect(() => {
		if (visible) setTimeout(() => setShowCalender(2), 350)
		else setShowCalender(1)
	}, [visible])

	return (
		<View style={styles.modal}>
			{showCalender > 0 && <Calender showComplete={showCalender} />}
			<TouchableHighlight onPress={() => setShowClock(true)} underlayColor={COLORS.DARK_HIGHLIGHT}>
				<View style={[styles.buttonWrapper, { borderTopWidth: StyleSheet.hairlineWidth }]}>
					<MaterialCommunityIcons name="clock-time-four-outline" style={[globalStyles.icon, styles.buttonIcon]} />
					<ThemeText>Set time</ThemeText>
				</View>
			</TouchableHighlight>
			<TouchableHighlight onPress={() => navigation.push("repeats")} underlayColor={COLORS.DARK_HIGHLIGHT}>
				<View style={styles.buttonWrapper}>
					<MaterialIcons name="repeat" style={[globalStyles.icon, styles.buttonIcon]} />
					<ThemeText>Repeat</ThemeText>
				</View>
			</TouchableHighlight>
			<View style={styles.bottomBtnsContainer}>
				<ThemeButton style={styles.bottomBtn} onPress={close} borderRadius={50}>
					<ThemeText style={{ fontSize: FONT.regular }} theme>
						Cancel
					</ThemeText>
				</ThemeButton>

				<ThemeButton style={styles.bottomBtn} onPress={onSubmit} borderRadius={50}>
					<ThemeText style={{ fontSize: FONT.regular }} theme>
						Done
					</ThemeText>
				</ThemeButton>
			</View>
			<ClockModal visible={showClock} close={() => setShowClock(false)} />
		</View>
	)
}

export const DateTimeModalWrapper = props => {
	const [renderMode, setRenderMode] = useState(0)
	const translateY = useRef(new Animated.Value(wHeight)).current

	useEffect(() => {
		setRenderMode(1)
	}, [])

	useEffect(() => {
		if (props.visible)
			Animated.timing(translateY, {
				toValue: StatusBar.currentHeight / 2,
				duration: 500,
				useNativeDriver: true
			}).start()
	}, [props.visible])

	const onClose = () => {
		Animated.timing(translateY, {
			toValue: wHeight,
			duration: 250,
			useNativeDriver: true,
			delay: 0
		}).start()
		setTimeout(() => {
			props.close()
		}, 200)
	}

	return (
		<View
			style={{
				...StyleSheet.absoluteFillObject,
				backgroundColor: COLORS.OVERLAY,
				opacity: props?.visible ? 1 : 0,
				pointerEvents: props?.visible ? "auto" : "none"
			}}
		>
			<Animated.View
				style={[
					{
						...StyleSheet.absoluteFillObject,
						alignItems: "center",
						justifyContent: "center"
					},
					{ transform: [{ translateY: translateY }] }
				]}
			>
				<DateTimeModal {...props} visible={props.visible ? 2 : renderMode} close={onClose} />
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	bottomBtnsContainer: {
		justifyContent: "flex-end",
		flexDirection: "row",
		paddingRight: 10,
		marginTop: 12,
		marginBottom: 18
	},
	bottomBtn: {
		paddingHorizontal: 25,
		paddingVertical: 12,
		borderRadius: 50
	},
	buttonWrapper: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 14,
		borderColor: COLORS.BORDER,
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	buttonIcon: {
		paddingHorizontal: 20,
		fontSize: 26
	},
	modal: {
		backgroundColor: COLORS.DARK_MODAL,
		borderRadius: 30,
		width: modalWidth + hPadd * 2,
		paddingTop: 15
	}
})

export default DateTimeModal
