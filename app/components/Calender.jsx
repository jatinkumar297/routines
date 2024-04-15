import React, { memo, useEffect, useRef, useState } from "react"
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native"
import { ThemeButton, ThemeText } from "./ThemeComponents"
import { COLORS, FONT, weekDays } from "../utils/constants"
import { Entypo } from "@expo/vector-icons"
import { FlashList } from "@shopify/flash-list"
import globalStyles from "../utils/globalStyles"
import CustomModal, { hPadd, modalWidth } from "./CustomModal"
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons"

const cardWidth = modalWidth
const years = Array(201 / 3)
	.fill()
	.map((_, idx) => [1900 + idx * 3 + 0, 1900 + idx * 3 + 1, 1900 + idx * 3 + 2])

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
]

const calenderData = [
	{
		month: 0,
		year: 2024,
		daysInMonth: 31,
		startDay: 1,
		weeks: [
			[null, 1, 2, 3, 4, 5, 6],
			[7, 8, 9, 10, 11, 12, 13],
			[14, 15, 16, 17, 18, 19, 20],
			[21, 22, 23, 24, 25, 26, 27],
			[28, 29, 30, 31, null, null, null]
		]
	},
	{
		month: 1,
		year: 2024,
		daysInMonth: 29,
		startDay: 4,
		weeks: [
			[null, null, null, null, 1, 2, 3],
			[4, 5, 6, 7, 8, 9, 10],
			[11, 12, 13, 14, 15, 16, 17],
			[18, 19, 20, 21, 22, 23, 24],
			[25, 26, 27, 28, 29, null, null]
		]
	},
	{
		month: 2,
		year: 2024,
		daysInMonth: 31,
		startDay: 5,
		weeks: [
			[null, null, null, null, null, 1, 2],
			[3, 4, 5, 6, 7, 8, 9],
			[10, 11, 12, 13, 14, 15, 16],
			[17, 18, 19, 20, 21, 22, 23],
			[24, 25, 26, 27, 28, 29, 30],
			[31, null, null, null, null, null, null]
		]
	},
	{
		month: 3,
		year: 2024,
		daysInMonth: 30,
		startDay: 1,
		weeks: [
			[null, 1, 2, 3, 4, 5, 6],
			[7, 8, 9, 10, 11, 12, 13],
			[14, 15, 16, 17, 18, 19, 20],
			[21, 22, 23, 24, 25, 26, 27],
			[28, 29, 30, null, null, null, null]
		]
	},
	{
		month: 4,
		year: 2024,
		daysInMonth: 31,
		startDay: 3,
		weeks: [
			[null, null, null, 1, 2, 3, 4],
			[5, 6, 7, 8, 9, 10, 11],
			[12, 13, 14, 15, 16, 17, 18],
			[19, 20, 21, 22, 23, 24, 25],
			[26, 27, 28, 29, 30, 31, null]
		]
	},
	{
		month: 5,
		year: 2024,
		daysInMonth: 30,
		startDay: 6,
		weeks: [
			[null, null, null, null, null, null, 1],
			[2, 3, 4, 5, 6, 7, 8],
			[9, 10, 11, 12, 13, 14, 15],
			[16, 17, 18, 19, 20, 21, 22],
			[23, 24, 25, 26, 27, 28, 29],
			[30, null, null, null, null, null, null]
		]
	},
	{
		month: 6,
		year: 2024,
		daysInMonth: 31,
		startDay: 1,
		weeks: [
			[null, 1, 2, 3, 4, 5, 6],
			[7, 8, 9, 10, 11, 12, 13],
			[14, 15, 16, 17, 18, 19, 20],
			[21, 22, 23, 24, 25, 26, 27],
			[28, 29, 30, 31, null, null, null]
		]
	},
	{
		month: 7,
		year: 2024,
		daysInMonth: 31,
		startDay: 4,
		weeks: [
			[null, null, null, null, 1, 2, 3],
			[4, 5, 6, 7, 8, 9, 10],
			[11, 12, 13, 14, 15, 16, 17],
			[18, 19, 20, 21, 22, 23, 24],
			[25, 26, 27, 28, 29, 30, 31]
		]
	},
	{
		month: 8,
		year: 2024,
		daysInMonth: 30,
		startDay: 7,
		weeks: [
			[1, 2, 3, 4, 5, 6, 7],
			[8, 9, 10, 11, 12, 13, 14],
			[15, 16, 17, 18, 19, 20, 21],
			[22, 23, 24, 25, 26, 27, 28],
			[29, 30, null, null, null, null, null]
		]
	},
	{
		month: 9,
		year: 2024,
		daysInMonth: 31,
		startDay: 2,
		weeks: [
			[null, null, 1, 2, 3, 4, 5],
			[6, 7, 8, 9, 10, 11, 12],
			[13, 14, 15, 16, 17, 18, 19],
			[20, 21, 22, 23, 24, 25, 26],
			[27, 28, 29, 30, 31, null, null]
		]
	},
	{
		month: 10,
		year: 2024,
		daysInMonth: 30,
		startDay: 5,
		weeks: [
			[null, null, null, null, null, 1, 2],
			[3, 4, 5, 6, 7, 8, 9],
			[10, 11, 12, 13, 14, 15, 16],
			[17, 18, 19, 20, 21, 22, 23],
			[24, 25, 26, 27, 28, 29, 30]
		]
	},
	{
		month: 11,
		year: 2024,
		daysInMonth: 31,
		startDay: 7,
		weeks: [
			[1, 2, 3, 4, 5, 6, 7],
			[8, 9, 10, 11, 12, 13, 14],
			[15, 16, 17, 18, 19, 20, 21],
			[22, 23, 24, 25, 26, 27, 28],
			[29, 30, 31, null, null, null, null]
		]
	}
]

const Calender = ({ showComplete, detailed = false, label, close, submit }) => {
	const [selectedDate, setSelectedDate] = useState()
	const [scrollPosition, setScrollPosition] = useState(0)
	const [flags, setFlags] = useState({})
	const listRef = useRef(null)

	const startTime = performance.now()
	const data = showComplete === 2 ? calenderData : calenderData?.slice(0, 1)
	let month

	const scrollToIndex = value =>
		setScrollPosition(prev => {
			const nextIdx = prev + value
			let return_value = nextIdx

			if (nextIdx < 0 || nextIdx >= data?.length) {
				return_value = prev
			} else {
				listRef.current.scrollToIndex({
					index: nextIdx,
					animated: true,
					viewPosition: 0.5
				})
			}

			return return_value
		})

	useEffect(() => {
		const endTime = performance.now()
		const renderTime = Math.ceil(endTime - startTime) / 1000
		console.log(`Calender took ${renderTime} seconds to render; Render Mode - ${showComplete}`)
	})

	return (
		<View style={styles.calenderContainer}>
			{!detailed ? (
				<View style={styles.navBtnsWrapper}>
					<ThemeButton style={styles.navButton} rippleRadius={34} onPress={() => scrollToIndex(-1)}>
						<Entypo name="chevron-left" style={[globalStyles.icon, { fontSize: FONT.large, marginRight: 1 }]} />
					</ThemeButton>
					<ThemeButton style={styles.navButton} rippleRadius={34} onPress={() => scrollToIndex(1)}>
						<Entypo name="chevron-right" style={[globalStyles.icon, { fontSize: FONT.large, marginLeft: 1 }]} />
					</ThemeButton>
				</View>
			) : (
				<>
					<ThemeText style={{ fontSize: FONT.xSmall, fontWeight: 700 }}>{label}</ThemeText>
					<View style={styles.calenderHeaderContainer}>
						<ThemeText style={{ fontSize: 32 }}>12 Apr 2024</ThemeText>
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
								defaultValue="04/12/2024"
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
									<ThemeText>{months[scrollPosition]} 2024</ThemeText>
									<AntDesign name="caretdown" style={[globalStyles.icon, { fontSize: FONT.xxSmall }]} />
								</View>
							</ThemeButton>
							{!flags?.yearSelection && (
								<View style={styles.detailsCalendernavBtnsWrapper}>
									<ThemeButton style={styles.navButton} rippleRadius={24} onPress={() => scrollToIndex(-1)}>
										<Entypo
											name="chevron-left"
											style={[globalStyles.icon, { fontSize: FONT.large, marginRight: 1 }]}
										/>
									</ThemeButton>
									<ThemeButton style={styles.navButton} rippleRadius={24} onPress={() => scrollToIndex(1)}>
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
						<ThemeText style={styles.monthName}>{months[scrollPosition]} 2024</ThemeText>
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
						renderItem={({ item: i, index: month, extraData: selectedDate }) => (
							<MonthCalendar
								key={`month-${month}`}
								monthData={i}
								onDatePress={str => setSelectedDate(str)}
								selectedDate={selectedDate}
								month={month}
								detailed={detailed}
							/>
						)}
						extraData={selectedDate}
						estimatedItemSize={5}
						horizontal
						pagingEnabled
						onMomentumScrollEnd={e => setScrollPosition(Math.floor(e.nativeEvent.contentOffset.x / cardWidth))}
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
					<ThemeButton style={styles.bottomBtn} borderRadius={50} onPress={submit}>
						<ThemeText style={{ fontSize: FONT.default }} theme>
							OK
						</ThemeText>
					</ThemeButton>
				</View>
			)}
		</View>
	)
}

const CalenderModal = props => {
	return (
		<CustomModal visible={true}>
			<Calender {...props} detailed={true} />
		</CustomModal>
	)
}

const MonthCalendar = memo(
	({ monthData, onDatePress, selectedDate, month, detailed }) => (
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
						<View key={`${week}-${month}`} style={styles.tableRow}>
							{days.map((date, idx) =>
								date ? (
									<Text
										key={`${month}-${date}`}
										onPress={() => onDatePress(`${month}-${date}`)}
										style={[styles.cell, selectedDate === `${month}-${date}` ? styles.selectedCell : null]}
									>
										{date}
									</Text>
								) : (
									<View key={`${month}-${week}-${idx}`} style={styles.cell} />
								)
							)}
						</View>
					))}
				</View>
			</View>
		</View>
	),
	arePropsEqual
)

function arePropsEqual(oldProps, newProps) {
	return !(
		(+newProps?.selectedDate?.split("-")?.[0] === oldProps.month ||
			+oldProps?.selectedDate?.split("-")?.[0] === oldProps.month) &&
		newProps?.selectedDate !== oldProps?.selectedDate
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

export { CalenderModal, Calender }
