import React, { forwardRef, useCallback, useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import { MaterialCommunityIcons, MaterialIcons, Feather, Entypo } from "@expo/vector-icons"
import { useStore } from "../store"
import { COLORS, FONT } from "../utils/constants"
import { ThemeText, ThemeButton } from "../components/ThemeComponents"
import Tabs from "../components/Tabs"
import BottomBar from "../components/BottomBar"
import BottomMenu from "../components/BottomMenu"
import CustomBottomSheet from "../components/CustomBottomSheet"
import { BottomSheetTextInput } from "@gorhom/bottom-sheet"
import globalStyles from "../utils/globalStyles"
import Screen from "../components/Screen"
import { DateTimeModalWrapper } from "../components/DateTimeModal"

function Home({ navigation }) {
	const bottomBarData = useCallback(
		() => ({
			home: {
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
					{
						label: "menu",
						Icon: props => <Entypo name="dots-three-horizontal" size={18} {...props} />,
						action: () => handleBottomSheet(2)
					}
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
			}
		}),
		[]
	)()
	const bottomSheetData = useCallback(
		() => [
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
						{ label: "Rename list" },
						{ label: "Delete list", detail: "Default list can't be deleted", disabled: true },
						{ label: "Delete all completed tasks" }
					]
				]
			}
		],
		[]
	)()

	const listNames = useStore(state => state.lists.map(({ _id, title }) => ({ _id, title })))
	const [task, setTask] = useState()
	const bottomMenuRef = useRef(null)
	const newTaskRef = useRef(null)

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
			<Tabs navigate={screen => navigation.push(screen)} listNames={listNames} />
			<BottomBar {...bottomBarData.home} />
			<BottomMenu
				ref={bottomMenuRef}
				onClose={() => setSheetDataIndex(null)}
				{...(sheetDataIndex !== null ? bottomSheetData[sheetDataIndex] : {})}
			/>

			<CreateNewTask ref={newTaskRef} navigation={navigation} task={task} setTask={setTask} />
		</Screen>
	)
}

const CreateNewTask = forwardRef(({ navigation, task, setTask }, ref) => {
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
						onTextInput={str => setTask(prev => ({ ...prev, title: str }))}
					/>
					{task?.details !== undefined && (
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
							onTextInput={str => setTask(prev => ({ ...prev, details: str }))}
							multiline
						/>
					)}
					<BottomBar
						leftSideData={[
							{
								label: "task-detail",
								Icon: props => <MaterialCommunityIcons name="text" size={24} {...props} />,
								action: () => setTask(prev => ({ ...prev, details: "" }))
							},
							{
								label: "task-time",
								Icon: props => <MaterialCommunityIcons name="clock-time-four-outline" size={24} {...props} />,
								action: () => setTask(prev => ({ ...prev, visible: true }))
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
									<ThemeButton style={globalStyles.ractButton} rippleBordered>
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
				visible={task?.visible}
				navigation={navigation}
				close={() => setTask(prev => ({ ...prev, visible: false }))}
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
