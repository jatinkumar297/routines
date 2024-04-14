import React, { useState } from "react"
import { StyleSheet, View, TextInput, Text, Pressable } from "react-native"
import { COLORS, FONT, weekDays } from "../utils/constants"
import { ThemeText, ThemeButton } from "../components/ThemeComponents"
import { Ionicons } from "@expo/vector-icons"
import { Feather } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { CalenderModal } from "../components/Calender"
import globalStyles from "../utils/globalStyles"
import ClockModal from "../components/ClockModal"

const Repeats = ({ navigation }) => {
	const [data, setData] = useState({})
	const [clockState, setClockState] = useState()
	const [calenderState, setCalenderState] = useState()

	const handleData = (field, subfield, value) => {
		setData(prev => ({
			...prev,
			[field]: !subfield
				? value
				: {
						...(prev?.[field] || {}),
						[subfield]: value
				  }
		}))
	}
	const handleWeekDay = idx =>
		setData(prev => ({
			...prev,
			every: {
				...(prev.every || {}),
				week_day: (prev?.every?.week_day || [])?.includes(idx)
					? (prev?.every?.week_day || [])?.filter(_i => _i !== idx)
					: (prev?.every?.week_day || [])?.concat([idx])
			}
		}))

	return (
		<View style={styles.screen}>
			<View
				style={[styles.container, { justifyContent: "space-between", flexDirection: "row", paddingVertical: 12 }]}
			>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 14
					}}
				>
					<ThemeButton onPress={() => navigation.goBack()} style={{ paddingVertical: 5 }}>
						<Ionicons name="arrow-back" style={[globalStyles.icon, { fontSize: 24 }]} />
					</ThemeButton>
					<ThemeText style={{ fontSize: FONT.xLarge }} center>
						Repeats
					</ThemeText>
				</View>
				<ThemeButton
					onPress={() => navigation.goBack()}
					style={{ padding: 5, paddingRight: 0, alignItems: "center", justifyContent: "center" }}
				>
					<Text style={{ color: COLORS.THEME }}>Done</Text>
				</ThemeButton>
			</View>

			<View style={[styles.container, { paddingTop: 0 }]}>
				<ThemeText style={{ fontWeight: "600", marginBottom: 15 }}>Every</ThemeText>
				<View style={{ gap: 12, flexDirection: "row" }}>
					<TextInput
						style={[styles.inputRect, { textAlign: "center" }]}
						placeholderTextColor={COLORS.FONT_PRIMARY}
						placeholder="1"
						value={data?.every?.cycle_length}
						onChangeText={text => handleData("every", "cycle_length", text)}
					/>
					<View style={[styles.inputRect, { flexGrow: 1, flexDirection: "row", alignItems: "center" }]}>
						<ThemeText style={{ flexGrow: 1, fontSize: FONT.medium }} lineHeightAuto>
							Week
						</ThemeText>
						<AntDesign name="caretdown" style={[globalStyles.icon, { fontSize: FONT.xSmall }]} />
					</View>
				</View>
				<View style={{ flexDirection: "row", gap: 10, justifyContent: "space-between", marginVertical: 14 }}>
					{weekDays.map((i, idx) => (
						<Pressable
							key={i + idx}
							style={[styles.weekDay, data?.every?.week_day?.includes(idx) ? styles.selectedWeekDay : {}]}
							onPress={() => handleWeekDay(idx)}
						>
							<ThemeText style={data?.every?.week_day?.includes(idx) ? { color: COLORS.THEME_DARK } : null}>
								{i}
							</ThemeText>
						</Pressable>
					))}
				</View>
				<ThemeText
					style={styles.inputRect}
					children={"Set time"}
					onPress={() => setClockState({ field: "every", subfield: "time" })}
				/>
			</View>

			<View style={styles.divider} />
			<View style={styles.container}>
				<ThemeText style={{ fontWeight: "600", marginBottom: 15 }}>Starts</ThemeText>
				<ThemeText
					style={styles.inputRect}
					children={"16 January"}
					onPress={() => setCalenderState({ field: "starts", label: "Start Date" })}
				/>
			</View>
			<View style={styles.divider} />
			<View style={styles.container}>
				<ThemeText style={{ fontWeight: "600", marginBottom: 12 }}>Ends</ThemeText>
				<View style={{ gap: 12 }}>
					<View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
						<Feather name="circle" size={FONT.xLarge} color={COLORS.FONT_PRIMARY} />
						<ThemeText style={{ width: 45 }}>Never</ThemeText>
						<TextInput style={[styles.inputRect, { opacity: 0 }]} editable={false} />
					</View>
					<View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
						<Feather name="circle" size={FONT.xLarge} color={COLORS.FONT_PRIMARY} />
						<ThemeText style={{ width: 45 }}>On</ThemeText>
						<ThemeText
							style={[styles.inputRect, { flexGrow: 1 }]}
							children={"16 January"}
							onPress={() => setCalenderState({ field: "ends", label: "End Date" })}
						/>
					</View>
					<View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
						<Feather name="circle" size={FONT.xLarge} color={COLORS.FONT_PRIMARY} />
						<ThemeText style={{ width: 45 }}>After</ThemeText>
						<TextInput
							style={[styles.inputRect, { textAlign: "center" }]}
							placeholderTextColor={COLORS.FONT_PRIMARY}
							placeholder="13"
						/>
						<ThemeText>occurrences</ThemeText>
					</View>
				</View>
			</View>
			<ClockModal
				visible={!!clockState}
				close={() => setClockState()}
				submit={value => {
					handleData(clockState?.field, clockState?.subfield, value)
					setClockState()
				}}
			/>
			{calenderState && (
				<CalenderModal
					showComplete={2}
					label={calenderState?.label}
					submit={() => setCalenderState()}
					close={() => setCalenderState()}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: COLORS.DARK_PRIMARY
	},
	container: {
		paddingHorizontal: 20,
		paddingVertical: 28
	},
	inputRect: {
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderWidth: 1,
		borderColor: COLORS.FONT_LIGHT,
		color: COLORS.FONT_PRIMARY,
		borderRadius: 5,
		fontSize: 16.5,
		minWidth: 60,
		lineHeight: 16.5 * 1.68
	},
	divider: {
		width: "100%",
		borderBottomColor: COLORS.BORDER,
		borderBottomWidth: 1
	},
	weekDay: {
		borderRadius: 50,
		borderColor: COLORS.FONT_PRIMARY,
		borderWidth: 1,
		aspectRatio: 1,
		paddingHorizontal: 11,
		alignItems: "center",
		justifyContent: "center"
	},
	selectedWeekDay: {
		backgroundColor: COLORS.THEME,
		borderColor: COLORS.THEME
	}
})

export default Repeats
