import React, { useRef, useState } from "react"
import { StyleSheet, TouchableHighlight, View } from "react-native"
import { ThemeButton, ThemeText } from "./ThemeComponents"
import { COLORS, FONT } from "../utils/constants"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import globalStyles from "../utils/globalStyles"
import ClockModal from "./ClockModal"
import { Calender } from "./Calender"
import TimeInput from "./TimeInput"
import CustomModal from "./CustomModal"
import Repeats from "../screens/Repeats"

const DateTimeModal = ({ navigation, visible = false, close, onSubmit }) => {
	const dateSelection = useRef(null)
	const [data, setData] = useState({ time: null, repeats: null })
	const [flags, setFlags] = useState({ repeats: false, clock: false })

	return (
		<>
			<Calender
				visible={visible}
				defaultDate={dateSelection.current}
				updateDate={date => (dateSelection.current = date)}
			/>
			<TouchableHighlight onPress={() => setFlags({ clock: true })} underlayColor={COLORS.DARK_HIGHLIGHT}>
				<View style={[styles.buttonWrapper, { borderTopWidth: StyleSheet.hairlineWidth }]}>
					<MaterialCommunityIcons name="clock-time-four-outline" style={[globalStyles.icon, styles.buttonIcon]} />
					{data?.time ? (
						<TimeInput time={data.time} remove={() => setData(prev => ({ ...prev, time: null }))} advanced />
					) : (
						<ThemeText>Set time</ThemeText>
					)}
				</View>
			</TouchableHighlight>
			<TouchableHighlight onPress={() => setFlags({ repeats: true })} underlayColor={COLORS.DARK_HIGHLIGHT}>
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
			<ClockModal
				visible={flags?.clock}
				close={() => setFlags()}
				submit={time => {
					setData(prev => ({ ...prev, time }))
					setFlags()
				}}
			/>
			<Repeats
				visible={flags?.repeats}
				close={() => setFlags()}
				submit={repeats => {
					setData(prev => ({ ...prev, repeats }))
					setFlags()
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
