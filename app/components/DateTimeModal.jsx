import React, { useEffect, useRef, useState } from "react"
import { StyleSheet, TouchableHighlight, View } from "react-native"
import { ThemeButton, ThemeText } from "./ThemeComponents"
import { COLORS, FONT, currentDate, generateTimeString } from "../utils/constants"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import globalStyles from "../utils/globalStyles"
import ClockModal from "./ClockModal"
import { Calender } from "./Calender"
import TimeLabel from "./TimeLabel"
import CustomModal from "./CustomModal"

const DEFAULT_SELECTION = { date: currentDate, time: null }
const DateTimeModal = ({ visible = false, close, data, submit, callRepeats }) => {
	const [selection, setSelection] = useState(DEFAULT_SELECTION)
	const [showClock, setShowClock] = useState()

	useEffect(() => {
		if (data) setSelection(data)
		else setSelection(DEFAULT_SELECTION)
	}, [data])

	const handleSubmit = () => {
		setShowClock()
		submit(selection)
	}

	return (
		<>
			<Calender
				visible={visible}
				selectedDate={selection?.date}
				setSelectedDate={date => setSelection(prev => ({ ...prev, date }))}
			/>
			<TouchableHighlight onPress={() => setShowClock(true)} underlayColor={COLORS.DARK_HIGHLIGHT}>
				<View style={[styles.buttonWrapper, { borderTopWidth: StyleSheet.hairlineWidth }]}>
					<MaterialCommunityIcons name="clock-time-four-outline" style={[globalStyles.icon, styles.buttonIcon]} />
					{selection?.time?.hours ? (
						<TimeLabel
							text={generateTimeString(selection?.time)}
							remove={() => setSelection(prev => ({ ...prev, time: null }))}
						/>
					) : (
						<ThemeText>Set time</ThemeText>
					)}
				</View>
			</TouchableHighlight>
			<TouchableHighlight onPress={() => callRepeats(selection)} underlayColor={COLORS.DARK_HIGHLIGHT}>
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

				<ThemeButton style={styles.bottomBtn} onPress={handleSubmit} borderRadius={50}>
					<ThemeText style={{ fontSize: FONT.regular }} theme>
						Done
					</ThemeText>
				</ThemeButton>
			</View>
			<ClockModal
				visible={showClock}
				close={() => setShowClock()}
				submit={_time => {
					setSelection(prev => ({ ...prev, time: _time }))
					setShowClock()
				}}
			/>
		</>
	)
}

export const DateTimeModalWrapper = props => {
	return (
		<CustomModal
			visible={props.visible}
			close={props.close}
			children={({ close }) => <DateTimeModal {...props} close={close} />}
		/>
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
	}
})

export default DateTimeModal
