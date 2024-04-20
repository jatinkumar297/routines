import React, { useState } from "react"
import { StyleSheet, View, TextInput, Text, Pressable } from "react-native"
import { COLORS, FONT, currentDate, months, weekDays, weekFullDays } from "../utils/constants"
import { ThemeText, ThemeButton } from "../components/ThemeComponents"
import { Ionicons } from "@expo/vector-icons"
import { Feather } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { CalenderModal } from "../components/Calender"
import globalStyles from "../utils/globalStyles"
import ClockModal from "../components/ClockModal"
import DropDown from "../components/DropDown"
import Screen from "../components/Screen"

const dropDownOptions = {
	intervalUnit: ["day", "week", "month", "year"].map(i => ({ label: i, value: i })),
	dates: Array(32)
		.fill()
		.map((_, idx) =>
			idx === 31
				? { label: "Last day", value: -1 }
				: {
						label: "Day " + (idx + 1),
						value: idx + 1
				  }
		),
	weeks: ["First", "Second", "Third", "Fourth", "Last"].map((label, value) => ({ label, value: value + 1 })),
	weekDays: weekFullDays.map((label, value) => ({ label, value: value + 1 }))
}

const Repeats = ({ navigation }) => {
	const [data, setData] = useState({
		every: {
			cycleInterval: 1,
			intervalUnit: dropDownOptions.intervalUnit[1].value
		}
	})
	const [clockState, setClockState] = useState()
	const [calenderState, setCalenderState] = useState()
	const [dropDownState, setDropDownState] = useState()

	console.log(data)

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
				weekDays: (prev?.every?.weekDays || [])?.includes(idx)
					? (prev?.every?.weekDays || [])?.filter(_i => _i !== idx)
					: (prev?.every?.weekDays || [])?.concat([idx])
			}
		}))

	const getLabel = (value, optionsLabel) => dropDownOptions[optionsLabel].find(i => i.value === value).label

	return (
		<Screen>
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
						keyboardType="numeric"
						maxLength={2}
						value={data?.every?.cycleInterval}
						defaultValue={"1"}
						onChangeText={text => handleData("every", "cycleInterval", (+text || 1).toString())}
					/>
					<View style={{ flexGrow: 1, position: "relative" }}>
						<Pressable
							style={[styles.inputRect, { flexGrow: 1, flexDirection: "row", alignItems: "center" }]}
							onPress={() => setDropDownState(prev => (prev === 1 ? null : 1))}
						>
							<ThemeText style={{ flexGrow: 1, fontSize: FONT.medium }}>
								{getLabel(data?.every?.intervalUnit, "intervalUnit")}
							</ThemeText>
							<AntDesign name="caretdown" style={[globalStyles.icon, { fontSize: FONT.xxSmall }]} />
						</Pressable>
						{dropDownState === 1 && (
							<DropDown
								data={dropDownOptions.intervalUnit}
								onSelect={i => {
									handleData("every", "intervalUnit", i)
									setDropDownState()
								}}
							/>
						)}
					</View>
				</View>
				{data.every.intervalUnit === "week" ? (
					<View style={{ flexDirection: "row", gap: 8, justifyContent: "space-between", marginTop: 14 }}>
						{weekDays.map((i, idx) => (
							<Pressable
								key={i + idx}
								style={[styles.weekDay, data?.every?.weekDays?.includes(idx) ? styles.selectedWeekDay : {}]}
								onPress={() => handleWeekDay(idx)}
							>
								<ThemeText style={data?.every?.weekDays?.includes(idx) ? { color: COLORS.THEME_DARK } : null}>
									{i}
								</ThemeText>
							</Pressable>
						))}
					</View>
				) : data.every.intervalUnit === "month" ? (
					<View style={{ marginTop: 14, gap: 14 }}>
						<View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
							<Feather name="circle" size={FONT.xLarge} color={COLORS.FONT_PRIMARY} />
							<View style={{ flexGrow: 1, position: "relative" }}>
								<Pressable
									style={[styles.inputRect, { flexGrow: 1, flexDirection: "row", alignItems: "center" }]}
									onPress={() => setDropDownState(prev => (prev === 2 ? null : 2))}
								>
									<ThemeText style={{ flexGrow: 1, fontSize: FONT.medium }}>
										{getLabel(data?.every?.date, "dates")}
									</ThemeText>
									<AntDesign name="caretdown" style={[globalStyles.icon, { fontSize: FONT.xxSmall }]} />
								</Pressable>
								{dropDownState === 2 && (
									<DropDown
										data={dropDownOptions.dates}
										onSelect={i => {
											handleData("every", "date", i)
											setDropDownState()
										}}
									/>
								)}
							</View>
						</View>
						<View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
							<Feather name="circle" size={FONT.xLarge} color={COLORS.FONT_PRIMARY} />
							<View style={{ flexDirection: "row", gap: 10 }}>
								<View style={{ width: 120, position: "relative" }}>
									<Pressable
										style={[styles.inputRect, { flexGrow: 1, flexDirection: "row", alignItems: "center" }]}
										onPress={() => setDropDownState(prev => (prev === 3 ? null : 3))}
									>
										<ThemeText style={{ flexGrow: 1, fontSize: FONT.medium }}>
											{getLabel(data?.every?.week, "weeks")}
										</ThemeText>
										<AntDesign name="caretdown" style={[globalStyles.icon, { fontSize: FONT.xxSmall }]} />
									</Pressable>
									{dropDownState === 3 && (
										<DropDown
											data={dropDownOptions.weeks}
											onSelect={i => {
												handleData("every", "week", i)
												setDropDownState()
											}}
										/>
									)}
								</View>
								<View style={{ width: 152, position: "relative" }}>
									<Pressable
										style={[styles.inputRect, { flexGrow: 1, flexDirection: "row", alignItems: "center" }]}
										onPress={() => setDropDownState(prev => (prev === 4 ? null : 4))}
									>
										<ThemeText style={{ flexGrow: 1, fontSize: FONT.medium }}>
											{getLabel(data?.every?.day, "weekDays")?.slice(0, 3)}
										</ThemeText>
										<AntDesign name="caretdown" style={[globalStyles.icon, { fontSize: FONT.xxSmall }]} />
									</Pressable>
									{dropDownState === 4 && (
										<DropDown
											data={dropDownOptions.weekDays}
											onSelect={i => {
												handleData("every", "day", i)
												setDropDownState()
											}}
										/>
									)}
								</View>
							</View>
						</View>
					</View>
				) : null}
				<Pressable
					style={[styles.inputRect, { flexGrow: 1, flexDirection: "row", alignItems: "center", marginTop: 14 }]}
					onPress={() => setClockState({ field: "every", subfield: "time" })}
				>
					<ThemeText style={{ flexGrow: 1, fontSize: FONT.medium }}>
						{data?.every?.time
							? `${data?.every.time.hours}:${data?.every.time.minutes} ${data?.every.time.indicator ? "pm" : "am"}`
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
			</View>
			<View style={styles.divider} />
			<View style={styles.container}>
				<ThemeText style={{ fontWeight: "600", marginBottom: 12 }}>Ends</ThemeText>
				<View style={{ gap: 12 }}>
					<View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
						<Feather name="circle" size={FONT.xLarge} color={COLORS.FONT_PRIMARY} />
						<ThemeText style={{ width: 45 }} onPress={() => handleData("ends", "never", true)}>
							Never
						</ThemeText>
						<TextInput style={[styles.inputRect, { opacity: 0 }]} editable={false} />
					</View>
					<View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
						<Feather name="circle" size={FONT.xLarge} color={COLORS.FONT_PRIMARY} />
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
						<Feather name="circle" size={FONT.xLarge} color={COLORS.FONT_PRIMARY} />
						<ThemeText style={{ width: 45 }}>After</ThemeText>
						<TextInput
							style={[styles.inputRect, { textAlign: "center" }]}
							placeholderTextColor={COLORS.FONT_PRIMARY}
							value={data?.ends?.after}
							onChangeText={text => handleData("ends", "after", text.toString())}
							keyboardType="numeric"
							maxLength={3}
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
			<CalenderModal
				visible={!!calenderState}
				showComplete={2}
				label={calenderState?.label}
				submit={date => {
					handleData(calenderState.field, calenderState.subfield, date)
					setCalenderState()
				}}
				close={() => setCalenderState()}
			/>
		</Screen>
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
