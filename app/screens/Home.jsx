import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import { MaterialCommunityIcons, MaterialIcons, Feather, Entypo } from "@expo/vector-icons"
import { COLORS, FONT, generateDateTimeString, generateRepeatsString } from "../utils/constants"
import { ThemeText, ThemeButton } from "../components/ThemeComponents"
import Tabs from "../components/Tabs"
import BottomBar from "../components/BottomBar"
import BottomMenu from "../components/BottomMenu"
import CustomBottomSheet from "../components/CustomBottomSheet"
import { BottomSheetTextInput } from "@gorhom/bottom-sheet"
import globalStyles from "../utils/globalStyles"
import Screen from "../components/Screen"
import { DateTimeModalWrapper } from "../components/DateTimeModal"
import TimeLabel from "../components/TimeLabel"
import Repeats from "./Repeats"
import useStore from "../store/zustand"

function Home({ navigation }) {
	const bottomBarData = useCallback(
		selectedList => ({
			leftSideData: [
				{
					label: "list",
					Icon: props => <MaterialIcons name="list-alt" size={24} {...props} />,
					action: () => handleBottomSheet(0)
				},
				{
					label: "sort",
					Icon: props => <MaterialCommunityIcons name="swap-vertical" size={24} {...props} />,
					action: () => handleBottomSheet(1)
				},
				...(selectedList
					? [
							{
								label: "menu",
								Icon: props => <Entypo name="dots-three-horizontal" size={18} {...props} />,
								action: () => handleBottomSheet(2)
							}
					  ]
					: [])
			],
			rightSideData: [
				{
					label: "add",
					Component: () => (
						<ThemeButton style={styles.addIcon} borderRadius={15} onPress={() => newTaskRef.current.expand()}>
							<MaterialIcons name="add" color={"#c3e7ff"} size={26} />
						</ThemeButton>
					)
				}
			]
		}),
		[selectedList]
	)
	const bottomSheetData = useCallback(
		selectedList => [
			{
				componentKey: "lists",
				data: [
					[
						{
							label: "Starred",
							rippleDisabled: true,
							Icon: props => <MaterialCommunityIcons name="star-outline" {...props} />
						}
					],
					[
						{ label: "My Tasks", Icon: props => <Feather name="check" {...props} /> },
						{ label: "Order List" },
						{ label: "New List" }
					],
					[
						{
							label: "Create new list",
							rippleDisabled: true,
							Icon: props => <MaterialIcons name="add" {...props} />,
							action: () => {
								navigation.push("list-title")
								setSheetDataIndex(null)
							}
						}
					]
				]
			},
			{
				heading: "Sort by",
				data: [
					[
						{ label: "My Order", Icon: props => <Feather name="check" {...props} /> },
						{ label: "Date" },
						{ label: "Starred recently" }
					]
				]
			},
			{
				componentKey: "list-options",
				iconHidden: true,
				data: [
					[
						{
							label: "Rename list",
							action: () => navigation.push("list-title", { listId: selectedList })
						},
						{
							label: "Delete list",
							...(selectedList === 1 ? { detail: "Default list can't be deleted", disabled: true } : {})
						},
						{ label: "Delete all completed tasks" }
					]
				]
			}
		],
		[]
	)

	const bottomMenuRef = useRef(null)
	const newTaskRef = useRef(null)
	const listNames = useStore(state => state.lists.map(({ _id, title }) => ({ _id, title })))

	const [selectedList, setSelectedList] = useState(1)
	const [sheetDataIndex, setSheetDataIndex] = useState(null)

	const handleBottomSheet = index => {
		setSheetDataIndex(index)
		bottomMenuRef.current.expand()
	}

	return (
		<Screen>
			<View style={styles.headerWrapper}>
				<ThemeText style={styles.header} center>
					Tasks
				</ThemeText>
				<View style={styles.profile}>
					<ThemeText style={styles.profileText}>J</ThemeText>
				</View>
			</View>
			<Tabs
				onScreenChange={i => setSelectedList(i)}
				navigate={screen => navigation.push(screen)}
				listNames={listNames}
			/>
			<BottomBar {...bottomBarData(selectedList)} />
			<BottomMenu
				ref={bottomMenuRef}
				onClose={() => setSheetDataIndex(null)}
				{...(sheetDataIndex !== null ? bottomSheetData(selectedList)[sheetDataIndex] : {})}
			/>

			<CreateNewTask ref={newTaskRef} listId={selectedList} close={() => newTaskRef.current.close()} />
		</Screen>
	)
}

const CreateNewTask = forwardRef(({ listId, close }, ref) => {
	const [task, setTask] = useState({})
	const addNewTask = useStore(state => state.addNewTask)

	useEffect(() => {
		return () => setTask({})
	}, [])

	const [state, setState] = useState({})
	const handleClockPress = () =>
		task?.repeats
			? setState({ repeats: { visible: true, data: task?.repeats } })
			: setState({ dateTimeModal: true })

	const handleSave = () => {
		close()
		addNewTask({ listId, ...task })
	}

	return (
		<>
			<CustomBottomSheet ref={ref}>
				<View style={{ marginHorizontal: 10 }}>
					<BottomSheetTextInput
						placeholder="New task"
						style={{
							fontSize: FONT.normal,
							color: COLORS.FONT_PRIMARY,
							paddingHorizontal: 15,
							paddingVertical: 10
						}}
						placeholderTextColor={COLORS.FONT_PRIMARY}
						value={task?.title}
						onChangeText={str => setTask(prev => ({ ...prev, title: str }))}
					/>
					{state?.details && (
						<BottomSheetTextInput
							placeholder="Add details"
							style={{
								fontSize: FONT.small,
								color: COLORS.FONT_PRIMARY,
								paddingHorizontal: 15,
								paddingBottom: 10,
								paddingTop: 0
							}}
							placeholderTextColor={COLORS.FONT_PRIMARY}
							value={task?.details}
							onChangeText={str => setTask(prev => ({ ...prev, details: str }))}
							multiline
						/>
					)}

					{(task?.repeats || task?.date || task?.time) && (
						<View style={{ paddingHorizontal: 15, marginTop: 20, marginBottom: 10 }}>
							<TimeLabel
								onPress={handleClockPress}
								text={
									task?.repeats
										? generateRepeatsString(task?.repeats)
										: generateDateTimeString(task?.date, task?.time)
								}
								LeftIcon={task?.repeats ? props => <MaterialIcons name="repeat" {...props} /> : null}
								remove={() =>
									setTask(prev => ({
										...prev,
										...(prev?.repeats ? { repeats: null } : { date: null, time: null })
									}))
								}
							/>
						</View>
					)}

					<BottomBar
						leftSideData={[
							{
								label: "task-detail",
								Icon: props => <MaterialCommunityIcons name="text" size={24} {...props} />,
								action: () => setState(prev => ({ ...prev, details: true }))
							},
							{
								label: "task-time",
								Icon: props => <MaterialCommunityIcons name="clock-time-four-outline" size={24} {...props} />,
								action: handleClockPress
							},
							{
								label: "task-star",
								Icon: () => (
									<MaterialCommunityIcons
										name={task?.starred ? "star" : "star-outline"}
										size={24}
										color={task?.starred ? COLORS.THEME : COLORS.FONT_PRIMARY}
									/>
								),
								action: () => setTask(prev => ({ ...prev, starred: !prev.starred }))
							}
						]}
						rightSideData={[
							{
								label: "task-add",
								Component: () => (
									<ThemeButton style={globalStyles.ractButton} onPress={handleSave} rippleBordered>
										<ThemeText style={globalStyles.ractButtonText} theme>
											Save
										</ThemeText>
									</ThemeButton>
								)
							}
						]}
						overlay={false}
					/>
				</View>
			</CustomBottomSheet>

			<DateTimeModalWrapper
				visible={state?.dateTimeModal}
				callRepeats={data => setState(prev => ({ ...prev, repeats: { data, visible: true } }))}
				close={() => setState(prev => ({ ...prev, dateTimeModal: false }))}
				data={task?.date ? { date: task?.date, time: task?.time } : null}
				submit={data => {
					setState(prev => ({ ...prev, dateTimeModal: false }))
					setTask(prev => ({
						...prev,
						...data
					}))
				}}
			/>

			<Repeats
				{...state?.repeats}
				close={() => setState(prev => ({ ...prev, repeats: null }))}
				submit={repeats => {
					setState({})
					setTask(prev => ({ ...prev, repeats }))
				}}
			/>
		</>
	)
})

const styles = StyleSheet.create({
	headerWrapper: {
		paddingVertical: 15,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignContent: "center",
		justifyContent: "center",
		width: "100%",
		position: "relative"
	},
	header: {
		fontSize: FONT.xLarge
	},
	profile: {
		width: 36,
		aspectRatio: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#aa47bc",
		fontSize: FONT.small,
		position: "absolute",
		right: 20,
		top: 13,
		borderRadius: 50
	},
	addIcon: {
		backgroundColor: "#004a77",
		padding: 14
	}
})

export default Home
