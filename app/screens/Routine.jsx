import React, { useCallback, useRef, useState } from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { COLORS, FONT } from "../utils/constants"
import { MaterialCommunityIcons, MaterialIcons, Feather, Entypo } from "@expo/vector-icons"
import { ThemeText, ThemeButton } from "../components/ThemeComponents"
import TimeInput from "../components/TimeInput"
import { useStore } from "../store"
import BottomBar from "../components/BottomBar"
import BottomSheet from "../components/BottomSheet"

function Routine({ navigation, route }) {
	const bottomBarData = useCallback(
		() => ({
			leftSideData: [
				{
					label: "list",
					Icon: props => <MaterialIcons name="list-alt" size={26} {...props} />,
					action: () => handleBottomSheet(0)
				},
				{
					label: "sort",
					Icon: props => <MaterialCommunityIcons name="swap-vertical" size={24} {...props} />,
					action: () => handleBottomSheet(1)
				},
				{
					label: "menu",
					Icon: props => <Entypo name="dots-three-horizontal" size={FONT.medium} {...props} />,
					action: () => handleBottomSheet(2)
				}
			],
			rightSideData: [
				{
					label: "add",
					Component: () => (
						<ThemeButton
							style={styles.addIcon}
							borderRadius={15}
							onPress={() => navigation.push("name", { id: 2 })}
						>
							<MaterialIcons name="add" color={"#c3e7ff"} size={26} />
						</ThemeButton>
					)
				}
			]
		}),
		[]
	)()
	const bottomSheetData = useCallback(
		() => [
			{
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
								navigation.push("name")
								setSheetDataIndex(null)
							}
						}
					]
				]
			},
			{
				label: "Sort by",
				data: [
					[
						{ label: "My Order", Icon: props => <Feather name="check" {...props} /> },
						{ label: "Date" },
						{ label: "Starred recently" }
					]
				]
			},
			{
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

	const tasks = useStore(state => state.lists.find(i => i._id === route.params?.listId)?.tasks)
	const refBottomSheet = useRef()

	const [sheetDataIndex, setSheetDataIndex] = useState(null)

	const handleBottomSheet = index => {
		setSheetDataIndex(index)
		refBottomSheet.current.open()
	}

	return (
		<>
			<ScrollView>
				{tasks?.map((task, index) => (
					<ThemeButton rippleBordered key={task._id} onPress={() => navigation.push("task", { id: 1 })}>
						<View style={[styles.task, index + 1 === tasks.length ? styles.lastTask : {}]}>
							<Feather name="circle" size={FONT.xLarge} color={COLORS.FONT_PRIMARY} style={{ top: FONT.xSmall }} />
							<View style={{ flexShrink: 1, gap: 4 }}>
								<ThemeText style={{ fontSize: FONT.medium }}>{task.title}</ThemeText>
								{Boolean(title.description) && (
									<View style={{ paddingBottom: 5, paddingRight: 20 }}>
										<ThemeText style={{ fontSize: FONT.small }} numberOfLines={2}>
											{title.description}
										</ThemeText>
									</View>
								)}
								<TimeInput />
							</View>
						</View>
					</ThemeButton>
				))}
				{/* <ThemeText style={styles.completedHeading}>Completed (2)</ThemeText>
					{tasks?.map((item, index) => (
						<ThemeButton key={item + index} rippleBordered>
							<View style={styles.task}>
								<Feather name="check" size={FONT.xLarge} color={COLORS.THEME} style={{ top: FONT.xSmall }} />
								<View style={{ flexShrink: 1, gap: 4 }}>
									<ThemeText style={{ fontSize: FONT.medium, textDecorationLine: "line-through" }}>{item}</ThemeText>
									<ThemeText style={{ fontSize: FONT.small, textDecorationLine: "line-through" }} numberOfLines={2}>
									</ThemeText>
								</View>
							</View>
						</ThemeButton>
					))}*/}
			</ScrollView>

			<BottomBar {...bottomBarData} />
			<BottomSheet
				refRBSheet={refBottomSheet}
				heading={bottomSheetData[sheetDataIndex]?.label}
				data={bottomSheetData[sheetDataIndex]?.data}
				iconHidden={bottomSheetData[sheetDataIndex]?.iconHidden}
				onClose={() => setSheetDataIndex(null)}
			/>
		</>
	)
}

const styles = StyleSheet.create({
	task: {
		flexDirection: "row",
		gap: 16,
		paddingVertical: 18,
		paddingHorizontal: 24
	},
	lastTask: {
		borderBottomWidth: 1,
		borderBottomColor: COLORS.BORDER
	},
	completedHeading: {
		fontSize: FONT.normal,
		paddingHorizontal: 24,
		paddingVertical: 18
	},
	addIcon: {
		backgroundColor: "#004a77",
		padding: 14
	}
})

export default Routine
