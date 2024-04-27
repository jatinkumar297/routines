import React, { useState } from "react"
import { StyleSheet, View, TextInput, Text, Pressable, KeyboardAvoidingView, Platform, Modal } from "react-native"
import { COLORS, FONT, currentDate, months, weekDays, weekFullDays } from "../utils/constants"
import { ThemeText, ThemeButton } from "../components/ThemeComponents"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import { CalenderModal } from "../components/Calender"
import globalStyles from "../utils/globalStyles"
import ClockModal from "../components/ClockModal"
import DropDown from "../components/DropDown"
import Screen from "../components/Screen"
import { FlatList } from "react-native-gesture-handler"
import { EventProvider } from "react-native-outside-press"
import Radio from "../components/Radio"
import CustomModal from "../components/CustomModal"

const options = {
	intervalUnits: ["day", "week", "month", "year"].map(i => ({ label: i, value: i })),
	dates: Array(32)
		.fill()
		.map((_, idx) =>
			idx === 31
				? { label: "Last day", value: -1 }
				: {
						label: "Day " + (idx + 1),
						value: idx
				  }
		),
	weeks: ["First", "Second", "Third", "Fourth", "Last"].map((label, value) => ({ label, value: value })),
	days: weekFullDays.map((label, value) => ({ label, value: value })),
	months: months
		.reduce(
			(result, i, idx) => {
				if (idx >= currentDate.month)
					result[0].push({
						label: i,
						value: idx - currentDate.month
					})
				else
					result[1].push({
						label: i + " " + (currentDate.year + 1),
						value: idx + (12 - currentDate.month)
					})
				return result
			},
			[[], []]
		)
		.flat()
}

const Repeats = ({ close, submit, visible = false }) => {
	const [data, setData] = useState({
		every: {
			cycleInterval: "1",
			intervalUnit: options.intervalUnits[2].value,
			weekDays: [currentDate.day],
			week: currentDate.week,
			day: currentDate.day,
			date: currentDate.date - 1
		},
		starts: {
			date: null,
			month: null
		},
		ends: {
			never: null,
			on: null,
			after: "13"
		}
	})

	const [clockState, setClockState] = useState()
	const [flags, setFlags] = useState({
		lastField: null,
		every_month: "date",
		ends: "date"
	})

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

	const handleFlags = (field, value) => {
		if (flags?.[field] === value) return
		setFlags(prev => ({
			...prev,
			lastField: field,
			lastValue: prev[field],
			[field]: value
		}))
	}

	const handleWeekDay = idx =>
		setData(prev => ({
			...prev,
			every: {
				...(prev.every || {}),
				weekDays: (prev?.every?.weekDays || [])?.includes(idx)
					? (prev?.every?.weekDays || [])?.filter(_i => _i !== idx)
					: (prev?.every?.weekDays || [])?.concat([idx])
			}
		}))

	const handleSubmit = () => {
		const _data = { ...data }
		if (_data.every.intervalUnit !== "month") {
			delete _data.every.week
			delete _data.every.date
			delete _data.every.day
			delete _data.starts.month
		} else {
			if (flags?.every_month === "date") {
				delete _data.every.week
				delete _data.every.day
			} else delete _data.every.date
		}
		if (_data.every.intervalUnit !== "week") {
			delete _data.every.weekDays
		}

		_data.ends = {
			[flags?.ends]: _data.ends[flags?.ends]
		}

		submit(_data)
	}

	const RadioContainer = ({ field, value }) => <Radio {...{ flags, handleFlags, field, value }} />

	return (
		<Modal visible={visible} animationType="slide">
			<EventProvider style={{ backgroundColor: COLORS.DARK_PRIMARY }}>
				<View
					style={[
						styles.container,
						{ justifyContent: "space-between", flexDirection: "row", paddingVertical: 12 }
					]}
				>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							gap: 14
						}}
					>
						<ThemeButton onPress={close} style={{ paddingVertical: 5 }}>
							<Ionicons name="arrow-back" style={[globalStyles.icon, { fontSize: 24 }]} />
						</ThemeButton>
						<ThemeText style={{ fontSize: FONT.xLarge }} center>
							Repeats
						</ThemeText>
					</View>
					<ThemeButton
						onPress={handleSubmit}
						style={{ padding: 5, paddingRight: 0, alignItems: "center", justifyContent: "center" }}
					>
						<Text style={{ color: COLORS.THEME }}>Done</Text>
					</ThemeButton>
				</View>

				<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
					<FlatList
						data={[null]}
						renderItem={() => (
							<>
								<View style={[styles.container, { paddingTop: 0 }]}>
									<ThemeText style={{ fontWeight: "600", marginBottom: 15 }}>Every</ThemeText>
									<View style={{ gap: 12, flexDirection: "row" }}>
										<TextInput
											style={[styles.inputRect, { textAlign: "center" }]}
											placeholderTextColor={COLORS.FONT_PRIMARY}
											keyboardType="decimal-pad"
											maxLength={2}
											value={data?.every?.cycleInterval || "1"}
											onChangeText={text => handleData("every", "cycleInterval", (+text || 1).toString())}
										/>
										<DropDown
											styles={{ button: styles.inputRect, container: { flex: 1 } }}
											data={options.intervalUnits}
											value={data.every.intervalUnit}
											onSelect={i => handleData("every", "intervalUnit", i)}
										/>
									</View>
									{data.every.intervalUnit === "week" ? (
										<View style={{ flexDirection: "row", gap: 8, justifyContent: "space-between", marginTop: 14 }}>
											{weekDays.map((i, idx) => (
												<Pressable
													key={i + idx}
													style={[
														styles.weekDay,
														data?.every?.weekDays?.includes(idx) ? styles.selectedWeekDay : {}
													]}
													onPress={() => handleWeekDay(idx)}
												>
													<ThemeText
														style={data?.every?.weekDays?.includes(idx) ? { color: COLORS.THEME_DARK } : null}
													>
														{i}
													</ThemeText>
												</Pressable>
											))}
										</View>
									) : data.every.intervalUnit === "month" ? (
										<View style={{ marginTop: 14, gap: 14 }}>
											<View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
												<RadioContainer field={"every_month"} value={"date"} />
												<DropDown
													styles={{ button: styles.inputRect, container: { flex: 1 } }}
													data={options.dates}
													value={data.every.date}
													onSelect={i => handleData("every", "date", i)}
												/>
											</View>
											<View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
												<RadioContainer field={"every_month"} value={"day"} />
												<View style={{ flexDirection: "row", gap: 10, flex: 1 }}>
													<DropDown
														styles={{ button: styles.inputRect, container: { flex: 1 } }}
														data={options.weeks}
														value={data.every.week}
														onSelect={i => handleData("every", "week", i)}
													/>
													<DropDown
														styles={{ button: styles.inputRect, container: { flex: 1 } }}
														data={options.days}
														value={data.every.day}
														onSelect={i => handleData("every", "day", i)}
													/>
												</View>
											</View>
										</View>
									) : null}
									<Pressable
										style={[
											styles.inputRect,
											{ flexGrow: 1, flexDirection: "row", alignItems: "center", marginTop: 14 }
										]}
										onPress={() => setClockState({ field: "every", subfield: "time" })}
									>
										<ThemeText style={{ flexGrow: 1, fontSize: FONT.medium }}>
											{data?.every?.time
												? `${data?.every.time.hours}:${data?.every.time.minutes} ${
														data?.every.time.indicator ? "pm" : "am"
												  }`
												: "Set time"}
										</ThemeText>
										{data?.every?.time && (
											<AntDesign
												name="close"
												style={[globalStyles.icon, { fontSize: FONT.large }]}
												onPress={e => {
													e.stopPropagation()
													handleData("every", "time", null)
												}}
											/>
										)}
									</Pressable>
								</View>

								<View style={styles.divider} />
								<View style={styles.container}>
									<ThemeText style={{ fontWeight: "600", marginBottom: 15 }}>Starts</ThemeText>
									{data.every.intervalUnit === "month" ? (
										<DropDown
											styles={{ button: styles.inputRect, container: { flex: 1 } }}
											data={options.months}
											value={data?.starts?.month}
											onSelect={i => handleData("starts", "month", i)}
											dropDownPosition="bottom"
										/>
									) : (
										<ThemeText
											style={styles.inputRect}
											children={
												data?.starts?.date
													? `${data?.starts?.date?.date} ${months[data?.starts?.date?.month]}${
															data?.starts?.date?.year === currentDate.year ? "" : " " + data?.starts?.date?.year
													  }`
													: "N/A"
											}
											onPress={() => setCalenderState({ field: "starts", subfield: "date", label: "Start Date" })}
										/>
									)}
								</View>
								<View style={styles.divider} />
								<View style={styles.container}>
									<ThemeText style={{ fontWeight: "600", marginBottom: 12 }}>Ends</ThemeText>
									<View style={{ gap: 12 }}>
										<View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
											<RadioContainer field={"ends"} value={"never"} />
											<ThemeText style={{ width: 45 }} onPress={() => handleData("ends", "never", true)}>
												Never
											</ThemeText>
											<TextInput style={[styles.inputRect, { opacity: 0 }]} editable={false} />
										</View>
										<View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
											<RadioContainer field={"ends"} value={"date"} />
											<ThemeText style={{ width: 45 }}>On</ThemeText>
											<ThemeText
												style={[styles.inputRect, { flexGrow: 1 }]}
												children={
													data?.ends?.on
														? `${data?.ends?.on?.date} ${months[data?.ends?.on?.month]}${
																+data?.ends?.on?.year === +currentDate.year ? "" : " " + data?.starts?.date?.year
														  }`
														: "N/A"
												}
												onPress={() => setCalenderState({ field: "ends", subfield: "on", label: "End Date" })}
											/>
										</View>
										<View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
											<RadioContainer field={"ends"} value={"after"} />
											<ThemeText style={{ width: 45 }}>After</ThemeText>
											<TextInput
												style={[styles.inputRect, { textAlign: "center" }]}
												placeholderTextColor={COLORS.FONT_PRIMARY}
												value={data?.ends?.after}
												onChangeText={text => handleData("ends", "after", text.toString())}
												keyboardType="decimal-pad"
												maxLength={3}
											/>
											<ThemeText>occurrences</ThemeText>
										</View>
									</View>
								</View>
							</>
						)}
					/>
				</KeyboardAvoidingView>

				<ClockModal
					visible={!!clockState}
					close={() => setClockState()}
					submit={value => {
						handleData(clockState?.field, clockState?.subfield, value)
						setClockState()
					}}
				/>
				<CalenderModal
					defaultDate={data?.[calenderState?.field]?.[calenderState?.subfield]}
					visible={!!calenderState}
					showComplete={2}
					label={calenderState?.label}
					submit={date => {
						handleData(calenderState.field, calenderState.subfield, date)
						setCalenderState()
					}}
					close={() => setCalenderState()}
				/>
			</EventProvider>
		</Modal>
	)
}

const styles = StyleSheet.create({
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
