import React, { memo, useEffect, useRef, useState } from "react"
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native"
import { ThemeButton, ThemeText } from "./ThemeComponents"
import { COLORS, FONT, currentDate, getCalenderData, months, weekDays } from "../utils/constants"
import { Entypo } from "@expo/vector-icons"
import { FlashList } from "@shopify/flash-list"
import globalStyles from "../utils/globalStyles"
import { hPadd, modalWidth } from "./ThemeModal"
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons"
import CustomModal from "./CustomModal"

const cardWidth = modalWidth
const years = Array(201 / 3)
	.fill()
	.map((_, idx) => [1900 + idx * 3 + 0, 1900 + idx * 3 + 1, 1900 + idx * 3 + 2])

const calenderData = getCalenderData()
export const Calender = ({ visible, detailed = false, selectedDate, setSelectedDate, label, close, submit }) => {
	const [renderMode, setRenderMode] = useState(0)
	const [scrollPosition, setScrollPosition] = useState(0)
	const [flags, setFlags] = useState({})
	const listRef = useRef(null)

	const startTime = performance.now()
	const data = !renderMode ? null : renderMode === 2 ? calenderData : calenderData?.slice(0, 1)

	const scrollToIndex = nextIdx => {
		if (nextIdx < 0 || nextIdx >= calenderData?.length) return

		setScrollPosition(nextIdx)
		listRef.current.scrollToIndex({
			index: nextIdx,
			animated: true,
			viewPosition: 0.5
		})
	}

	useEffect(() => {
		if (visible && selectedDate) {
			scrollToIndex(selectedDate?.month - data[0].month)
		}
	}, [renderMode, selectedDate])

	useEffect(() => {
		if (visible) setTimeout(() => setRenderMode(2), 350)
		else {
			setScrollPosition(0)
			setRenderMode(1)
		}
	}, [visible])

	// useEffect(() => {
	// 	const endTime = performance.now()
	// 	const renderTime = Math.ceil(endTime - startTime) / 1000
	// 	console.log(`Calender took ${renderTime} seconds to render; Render Mode - ${renderMode}`)
	// })

	const selectedMonth = calenderData[scrollPosition]
	if (!renderMode) return null

	return (
		<View style={styles.calenderContainer}>
			{!detailed ? (
				<View style={styles.navBtnsWrapper}>
					<ThemeButton
						style={styles.navButton}
						rippleRadius={34}
						onPress={() => scrollToIndex(scrollPosition - 1)}
					>
						<Entypo name="chevron-left" style={[globalStyles.icon, { fontSize: FONT.large, marginRight: 1 }]} />
					</ThemeButton>
					<ThemeButton
						style={styles.navButton}
						rippleRadius={34}
						onPress={() => scrollToIndex(scrollPosition + 1)}
					>
						<Entypo name="chevron-right" style={[globalStyles.icon, { fontSize: FONT.large, marginLeft: 1 }]} />
					</ThemeButton>
				</View>
			) : (
				<>
					<ThemeText style={{ fontSize: FONT.xSmall, fontWeight: 700 }}>{label}</ThemeText>
					<View style={styles.calenderHeaderContainer}>
						<ThemeText style={{ fontSize: 32 }}>
							{selectedDate?.date} {months?.[selectedDate?.month]?.slice(0, 3)} {selectedDate?.year}
						</ThemeText>
						<ThemeButton
							rippleRadius={22}
							rippleColor={COLORS.DARK_SECONDARY}
							_containerStyle={{ alignItems: "center", marginTop: 6 }}
							onPress={() => setFlags(prev => ({ ...prev, dateField: !prev.dateField }))}
						>
							{flags?.dateField ? (
								<MaterialCommunityIcons name="calendar-blank" style={[globalStyles.icon, { fontSize: 30 }]} />
							) : (
								<MaterialCommunityIcons name="pencil" style={[globalStyles.icon, { fontSize: 26 }]} />
							)}
						</ThemeButton>
					</View>

					{flags?.dateField && (
						<View style={styles.fieldSet}>
							<ThemeText style={styles.legend}>Heading</ThemeText>
							<TextInput
								style={{ color: COLORS.FONT_PRIMARY, fontSize: FONT.medium }}
								defaultValue={[
									selectedDate?.date?.toString()?.padStart(2, "0"),
									(selectedDate?.month + 1)?.toString()?.padStart(2, "0"),
									selectedDate?.year
								]?.join("/")}
								onChangeText={text => {
									const [d, m, y] = text.split("/")
									if (+d <= 0 || +d > 31) return
									if (+m <= 0 || +m > 12) return
									if (+y < selectedMonth?.year || +y > 2999) return
									setSelectedDate({ year: +y, month: +m - 1, date: d })
								}}
								autoFocus={true}
							/>
						</View>
					)}

					{!flags?.dateField && (
						<View style={styles.detailsCalenderNavContainer}>
							<ThemeButton
								rippleBordered
								style={{ paddingHorizontal: 12, paddingVertical: 6, paddingRight: 16 }}
								onPress={() => setFlags(prev => ({ yearSelection: !prev?.yearSelection }))}
								_containerStyle={{ overflow: "hidden" }}
								borderRadius={50}
							>
								<View style={styles.yearDropDownTrigger}>
									<ThemeText>
										{months[selectedMonth?.month]} {selectedMonth?.year}
									</ThemeText>
									<AntDesign name="caretdown" style={[globalStyles.icon, { fontSize: FONT.xxSmall }]} />
								</View>
							</ThemeButton>
							{!flags?.yearSelection && (
								<View style={styles.detailsCalendernavBtnsWrapper}>
									<ThemeButton
										style={styles.navButton}
										rippleRadius={24}
										onPress={() => scrollToIndex(scrollPosition - 1)}
									>
										<Entypo
											name="chevron-left"
											style={[globalStyles.icon, { fontSize: FONT.large, marginRight: 1 }]}
										/>
									</ThemeButton>
									<ThemeButton
										style={styles.navButton}
										rippleRadius={24}
										onPress={() => scrollToIndex(scrollPosition + 1)}
									>
										<Entypo
											name="chevron-right"
											style={[globalStyles.icon, { fontSize: FONT.large, marginLeft: 1 }]}
										/>
									</ThemeButton>
								</View>
							)}
						</View>
					)}

					{flags?.yearSelection && (
						<View style={styles.yearsContainer}>
							<FlatList
								data={years}
								renderItem={({ item }) => (
									<View style={styles.yearsRow}>
										{item?.map(i => (
											<ThemeButton style={styles.yearBtn} borderRadius={50}>
												<ThemeText style={{ fontSize: FONT.normal }}>{i}</ThemeText>
											</ThemeButton>
										))}
									</View>
								)}
								showsVerticalScrollIndicator={false}
							/>
						</View>
					)}
				</>
			)}

			<View
				style={
					flags?.dateField || flags?.yearSelection ? { opacity: 0, position: "absolute", right: "-100%" } : {}
				}
			>
				{!detailed && (
					<View>
						<ThemeText style={styles.monthName}>
							{months[selectedMonth?.month]} {selectedMonth?.year}
						</ThemeText>
					</View>
				)}
				<View>
					{detailed && (
						<View style={styles.tableRow}>
							{weekDays.map((i, idx) => (
								<Text key={i + idx} style={styles.cell} size={FONT.xSmall}>
									{i}
								</Text>
							))}
						</View>
					)}
					<FlashList
						ref={listRef}
						data={data}
						renderItem={({ item: i, extraData }) => (
							<MonthCalendar
								key={`${i.year}-${i.month}`}
								monthData={i}
								onDatePress={id => setSelectedDate(id)}
								selectedDate={extraData}
								detailed={detailed}
							/>
						)}
						extraData={selectedDate}
						estimatedItemSize={5}
						horizontal
						pagingEnabled
						onMomentumScrollEnd={e => setScrollPosition(Math.ceil(e.nativeEvent.contentOffset.x / cardWidth))}
						showsHorizontalScrollIndicator={false}
					/>
				</View>
			</View>

			{detailed && (
				<View style={styles.bottomBtnsContainer}>
					<ThemeButton style={styles.bottomBtn} borderRadius={50} onPress={close}>
						<ThemeText style={{ fontSize: FONT.default }} theme>
							Cancel
						</ThemeText>
					</ThemeButton>
					<ThemeButton style={styles.bottomBtn} borderRadius={50} onPress={() => submit(selectedDate)}>
						<ThemeText style={{ fontSize: FONT.default }} theme>
							OK
						</ThemeText>
					</ThemeButton>
				</View>
			)}
		</View>
	)
}

export const CalenderModal = props => {
	const [selectedDate, setSelectedDate] = useState(props?.defaultDate || currentDate)

	return (
		<CustomModal
			visible={props.visible}
			close={props.close}
			children={({ close }) => (
				<Calender
					{...props}
					selectedDate={selectedDate}
					setSelectedDate={setSelectedDate}
					close={close}
					detailed={true}
				/>
			)}
		/>
	)
}

const MonthCalendar = memo(
	({ monthData, onDatePress, selectedDate, detailed }) => (
		<View>
			<View style={styles.table}>
				{!detailed && (
					<View style={styles.tableRow}>
						{weekDays.map((i, idx) => (
							<Text key={i + idx} style={styles.cell} size={FONT.xSmall}>
								{i}
							</Text>
						))}
					</View>
				)}
				<View style={{ height: cardWidth * 0.8 }}>
					{monthData.weeks.map((days, week) => (
						<View key={week + "week" + monthData.month} style={styles.tableRow}>
							{days.map((date, idx) => {
								if (!date) return <View key={idx + "nothing" + monthData.month} style={styles.cell} />
								return (
									<Text
										key={date + "date" + monthData.month}
										onPress={() => onDatePress({ year: monthData.year, month: monthData.month, date: date })}
										style={[
											{
												...styles.cell,
												color:
													currentDate.month === monthData.month && currentDate.date === date
														? COLORS.THEME
														: COLORS.FONT_PRIMARY
											},
											selectedDate.month === monthData.month && selectedDate.date === date
												? styles.selectedCell
												: null
										]}
									>
										{date}
									</Text>
								)
							})}
						</View>
					))}
				</View>
			</View>
		</View>
	),
	arePropsEqual
)

function arePropsEqual(oldProps, newProps) {
	return (
		(newProps.selectedDate.date === oldProps.selectedDate.date &&
			newProps.selectedDate.month === oldProps.selectedDate.month &&
			newProps.selectedDate.year === oldProps.selectedDate.year) ||
		(newProps.selectedDate.month !== newProps.monthData.month &&
			oldProps.selectedDate.month !== newProps.monthData.month)
	)
}

const styles = StyleSheet.create({
	monthName: {
		textAlign: "center",
		marginVertical: 10,
		fontWeight: 600,
		fontSize: FONT.regular
	},
	calenderContainer: {
		position: "relative",
		marginHorizontal: hPadd
	},
	table: {
		width: cardWidth,
		marginVertical: 10
	},
	tableRow: {
		flexDirection: "row",
		gap: 6
	},
	cell: {
		flex: 1,
		aspectRatio: 1,
		borderRadius: 50,
		textAlign: "center",
		textAlignVertical: "center",
		color: COLORS.FONT_PRIMARY,
		fontSize: 12.5,
		marginBottom: 2
	},
	selectedCell: {
		backgroundColor: COLORS.THEME,
		color: COLORS.THEME_DARK,
		fontWeight: "500"
	},
	navBtnsWrapper: {
		position: "absolute",
		top: 5,
		left: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		zIndex: 1,
		width: "100%"
	},
	navButton: {
		padding: 8
	},
	calenderHeaderContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 38,
		paddingBottom: 20
	},
	detailsCalenderNavContainer: {
		justifyContent: "space-between",
		flexDirection: "row",
		paddingBottom: 10
	},
	yearDropDownTrigger: {
		paddingVertical: 10,
		flexDirection: "row",
		alignItems: "center",
		gap: 12
	},
	detailsCalendernavBtnsWrapper: {
		flexDirection: "row",
		gap: 15
	},
	bottomBtnsContainer: {
		flexDirection: "row",
		marginRight: -10,
		marginBottom: 10,
		justifyContent: "flex-end",
		alignItems: "center",
		gap: 5
	},
	bottomBtn: {
		paddingHorizontal: 20,
		paddingVertical: 12
	},
	fieldSet: {
		marginTop: 20,
		paddingHorizontal: 15,
		paddingVertical: 15,
		borderRadius: 2,
		borderWidth: 1,
		borderColor: COLORS.THEME
	},
	legend: {
		position: "absolute",
		top: -10,
		left: 10,
		paddingHorizontal: 5,
		backgroundColor: COLORS.DARK_MODAL,
		fontSize: FONT.small,
		color: COLORS.THEME
	},
	yearsContainer: {
		width: "80%",
		height: 400,
		alignSelf: "center"
	},
	yearsRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 15
	},
	yearBtn: {
		paddingHorizontal: 18,
		paddingVertical: 12
	}
})
