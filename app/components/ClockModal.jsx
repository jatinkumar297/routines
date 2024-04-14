import React, { memo, useEffect, useRef, useState } from "react"
import { Animated, Easing, PanResponder, Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import { ThemeButton, ThemeText } from "./ThemeComponents"
import { COLORS, FONT } from "../utils/constants"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import globalStyles from "../utils/globalStyles"
import MaskedView from "@react-native-masked-view/masked-view"
import CustomModal from "./CustomModal"

const digitWidth = 48
const lastPress = {}

const ClockModal = ({ visible = false, close, submit }) => {
	const [inputState, setInputState] = useState(false)
	const [clockState, setClockState] = useState({
		mode: 0,
		hours: "12",
		minutes: "51".toString().padStart(2, "0"),
		indicator: 0
	})

	useEffect(() => {
		setInputState(false)
	}, [visible])

	const onDoublePress = idx => {
		const time = new Date().getTime()

		if (idx === lastPress.idx && time - lastPress?.time < 400) setInputState(true)
		else setClockState(prev => ({ ...prev, mode: idx }))

		lastPress.idx = idx
		lastPress.time = time
	}

	return (
		<CustomModal visible={visible}>
			<View style={{ paddingHorizontal: 25 }}>
				<ThemeText color={COLORS.FONT_LIGHT} size={13.5} style={{ fontWeight: 600 }}>
					Select time
				</ThemeText>

				<View style={{ marginTop: 20, flexDirection: "row", marginBottom: 10 }}>
					<DigitalClockLabel
						label={"hours"}
						value={0}
						{...{ inputState, clockState, setClockState, onDoublePress }}
					/>
					<Text style={[styles.hourLabelFont, { paddingHorizontal: 5 }]}>:</Text>
					<DigitalClockLabel
						label={"minutes"}
						value={1}
						{...{ inputState, clockState, setClockState, onDoublePress }}
					/>

					<View style={styles.timeIndicators}>
						{["a.m.", "p.m."].map((i, idx) => (
							<Text
								key={i}
								onPress={() => setClockState(prev => ({ ...prev, indicator: idx }))}
								style={[
									styles.timeIndicator,
									clockState.indicator === idx ? styles.timeIndicatorSelected : {},
									idx === 0 ? { borderBottomWidth: 1, borderColor: COLORS.FONT_LIGHT } : {}
								]}
							>
								{i}
							</Text>
						))}
					</View>
				</View>

				{!inputState && <Clock clockState={clockState} setClockState={setClockState} />}
			</View>
			<View style={styles.bottomBtnsContainer}>
				<View style={{ marginLeft: 15 }}>
					<ThemeButton style={{ padding: 12 }} onPress={() => setInputState(prev => !prev)} borderRadius={50}>
						{inputState ? (
							<MaterialCommunityIcons name="clock-time-four-outline" style={globalStyles.icon} />
						) : (
							<MaterialCommunityIcons name="keyboard-outline" style={globalStyles.icon} />
						)}
					</ThemeButton>
				</View>
				<View style={{ flexDirection: "row" }}>
					<ThemeButton style={styles.bottomBtn} onPress={close} borderRadius={50}>
						<ThemeText style={{ fontSize: FONT.regular }} theme>
							Cancel
						</ThemeText>
					</ThemeButton>

					<ThemeButton style={styles.bottomBtn} onPress={() => submit(clockState)} borderRadius={50}>
						<ThemeText style={{ fontSize: FONT.regular }} theme>
							OK
						</ThemeText>
					</ThemeButton>
				</View>
			</View>
		</CustomModal>
	)
}

const DigitalClockLabel = ({ label, value, inputState, clockState, setClockState, onDoublePress }) => (
	<View>
		{inputState ? (
			<TextInput
				style={[
					styles.hourLabel,
					styles.hourLabelFont,
					clockState.mode === value
						? { backgroundColor: "transparent", borderColor: COLORS.THEME }
						: { borderColor: COLORS.DARK_HIGHLIGHT }
				]}
				keyboardType="numeric"
				autoFocus={clockState.mode === value}
				onPressIn={() => setClockState(prev => ({ ...prev, mode: value }))}
				maxLength={2}
				value={clockState[label].toString()}
				onChangeText={value =>
					(+value <= 12 || (value === 1 && +value < 60)) &&
					setClockState(prev => ({
						...prev,
						[label]: value
					}))
				}
			/>
		) : (
			<View style={{ borderRadius: 8, overflow: "hidden" }}>
				<Pressable
					onPress={() => onDoublePress(value)}
					style={[styles.hourLabel, clockState.mode === value ? styles.hourLabelSelected : {}]}
					android_ripple={{ color: COLORS.DARK_SECONDARY }}
				>
					<Text style={[styles.hourLabelFont]}>{clockState[label]}</Text>
				</Pressable>
			</View>
		)}

		{inputState && (
			<Text
				style={{
					textTransform: "capitalize",
					color: COLORS.FONT_LIGHT,
					paddingLeft: 3,
					fontSize: 13,
					position: "absolute",
					top: "100%"
				}}
			>
				{label}
			</Text>
		)}
	</View>
)

const Clock = memo(
	({ clockState, setClockState }) => {
		const handRef = useRef(null)
		const [origin, setOrigin] = useState({ x: 0, y: 0 })
		const rotation = useRef(new Animated.Value(0)).current

		useEffect(() => {
			const toValue =
				clockState?.mode === 0
					? ((+clockState?.hours + 12) % 12) * 30
					: clockState?.mode === 1
					? +clockState?.minutes * 6
					: null
			Animated.timing(rotation, {
				toValue,
				duration: 300,
				easing: Easing.linear,
				useNativeDriver: false
			}).start()
		}, [clockState])

		useEffect(() => {
			if (handRef.current)
				handRef.current.measure((x, y, width, height, pageX, pageY) =>
					setOrigin({ x: pageX + width / 2, y: pageY + height / 2 })
				)
		}, [handRef.current])

		const handleRotation = (event, gestureState, onFinish) => {
			const newX = event.nativeEvent.pageX
			const newY = event.nativeEvent.pageY

			const deltaAngle = Math.atan2(newY - origin.y, newX - origin.x) - Math.atan2(-origin.y, -origin.x)
			const initialAngleValue = (((deltaAngle * (180 / Math.PI) + 360) % 360) - 27 + 360) % 360
			let angle = initialAngleValue

			if (clockState.mode === 0) {
				angle = onFinish ? Math.round(initialAngleValue / 30) * 30 : Math.round(initialAngleValue)
				setClockState(prev => ({
					...prev,
					mode: onFinish ? 1 : 0,
					hours: (Math.round(initialAngleValue / 30) || 12).toString().padStart(2, "0")
				}))
			} else if (clockState.mode === 1) {
				angle = onFinish ? Math.round(angle / 6) * 6 : Math.round(angle)
				setClockState(prev => ({
					...prev,
					minutes: Math.round(angle / 6)
						.toString()
						.padStart(2, "0")
				}))
			}

			rotation.setValue(+angle.toPrecision(6))
		}

		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderMove: handleRotation,
			onPanResponderRelease: (e, g) => handleRotation(e, g, true)
		})

		const animatedStyle = {
			transform: [{ rotate: rotation.interpolate({ inputRange: [0, 360], outputRange: ["0deg", "360deg"] }) }]
		}

		return (
			<View style={[{ width: 250 }, styles.clockContainer]}>
				<View ref={handRef} {...panResponder.panHandlers} style={styles.clock}>
					<View style={styles.handView}>
						<Animated.View style={[styles.clockHandContainer, animatedStyle]}>
							<View style={{ height: "50%", alignItems: "center" }}>
								<View style={styles.clockHandHead} />
								<View style={styles.clockHandStick} />
								<View style={styles.clockHandOrigin} />
							</View>
						</Animated.View>
					</View>

					<MaskedView
						style={[styles.handView, { flex: 1, backgroundColor: COLORS.FONT_PRIMARY }]}
						androidRenderingMode="software"
						maskElement={
							<>
								{Array(12)
									.fill()
									.map((_, i) => (
										<View
											key={`CLOCKH-` + i + clockState.mode}
											style={[styles.clockHContainer, { transform: [{ rotate: i * 30 + "deg" }] }]}
										>
											<Text style={[styles.clockH, { transform: [{ rotate: i * -30 + "deg" }] }]}>
												{clockState.mode === 0
													? i || 12
													: clockState.mode === 1
													? (i * 5).toString().padStart(2, "0")
													: ""}
											</Text>
										</View>
									))}
							</>
						}
					>
						<Animated.View style={[{ height: "100%" }, animatedStyle]}>
							<View
								style={{
									backgroundColor: COLORS.DARK_MODAL,
									width: digitWidth,
									aspectRatio: 1,
									borderRadius: 50
								}}
							/>
						</Animated.View>
					</MaskedView>
				</View>
			</View>
		)
	},
	(oldProps, newProps) => newProps.clockState.mode === oldProps.clockState.mode
)

const styles = StyleSheet.create({
	bottomBtnsContainer: {
		flexDirection: "row",
		marginTop: 12,
		marginBottom: 18,
		marginBottom: 5,
		paddingRight: 8,
		justifyContent: "space-between",
		alignItems: "center"
	},
	bottomBtn: {
		paddingHorizontal: 20,
		paddingVertical: 10,
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
	clockContainer: {
		borderRadius: 200,
		backgroundColor: COLORS.DARK_HIGHLIGHT,
		overflow: "hidden",
		aspectRatio: 1,
		height: "auto",
		alignSelf: "center",
		marginTop: 40,
		marginBottom: 20
	},
	clock: {
		margin: 5,
		flex: 1,
		borderRadius: 200,
		position: "relative"
	},
	clockHContainer: {
		position: "absolute",
		alignItems: "center",
		width: "100%",
		height: "100%",
		pointerEvents: "box-none"
	},
	clockH: {
		width: digitWidth,
		fontSize: 15,
		aspectRatio: 1,
		textAlign: "center",
		textAlignVertical: "center"
	},
	handView: {
		position: "absolute",
		top: 0,
		left: 0,
		flex: 1,
		width: "100%",
		height: "100%",
		overflow: "hidden",
		alignItems: "center"
	},
	clockHandContainer: {
		height: "100%",
		alignItems: "center"
	},
	clockHandStick: {
		flexGrow: 1,
		width: 2,
		backgroundColor: COLORS.THEME
	},
	clockHandHead: {
		backgroundColor: COLORS.THEME,
		borderRadius: 30,
		width: digitWidth,
		aspectRatio: 1
	},
	clockHandOrigin: {
		marginBottom: -5,
		width: 10,
		aspectRatio: 1,
		borderRadius: 50,
		backgroundColor: COLORS.THEME
	},
	hourLabelFont: {
		color: COLORS.FONT_PRIMARY,
		textAlign: "center",
		fontSize: 59
	},
	hourLabel: {
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: COLORS.DARK_HIGHLIGHT,
		borderWidth: 2,
		overflow: "hidden",
		borderColor: "transparent",
		borderRadius: 8,
		width: 95,
		height: 78.8
	},
	hourLabelSelected: {
		backgroundColor: "#0742a0"
	},
	timeIndicators: {
		marginLeft: 15,
		borderWidth: 1,
		borderColor: COLORS.FONT_LIGHT,
		borderRadius: 8,
		overflow: "hidden",
		flexGrow: 1
	},
	timeIndicator: {
		flex: 1,
		color: COLORS.FONT_LIGHT,
		textAlign: "center",
		includeFontPadding: false,
		textAlignVertical: "center",
		backgroundColor: COLORS.DARK_PRIMARY,
		fontWeight: "600",
		fontSize: 16
	},
	timeIndicatorSelected: {
		backgroundColor: "#0f5324"
	}
})

export default ClockModal
