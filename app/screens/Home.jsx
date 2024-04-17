import React, { useCallback, useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import { MaterialCommunityIcons, MaterialIcons, Feather, Entypo } from "@expo/vector-icons"
import { useStore } from "../store"
import { FONT } from "../utils/constants"
import { ThemeText, ThemeButton } from "../components/ThemeComponents"
import Tabs from "../components/Tabs"
import BottomBar from "../components/BottomBar"
import CustomBottomSheet from "../components/CustomBottomSheet"

function Home({ navigation }) {
	const bottomBarData = useCallback(
		() => ({
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
						<ThemeButton
							style={styles.addIcon}
							borderRadius={15}
							onPress={() => navigation.push("list-title", { id: 2 })}
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
	const bottomSheetRef = useRef(null)

	const [sheetDataIndex, setSheetDataIndex] = useState(null)

	const handleBottomSheet = index => {
		setSheetDataIndex(index)
		bottomSheetRef.current.expand()
	}

	return (
		<View style={styles.container}>
			<View style={styles.headerWrapper}>
				<ThemeText style={styles.header} center>
					Tasks
				</ThemeText>
				<View style={styles.profile}>
					<ThemeText style={styles.profileText}>J</ThemeText>
				</View>
			</View>
			<Tabs navigate={screen => navigation.push(screen)} listNames={listNames} />
			<BottomBar {...bottomBarData} />
			<CustomBottomSheet
				ref={bottomSheetRef}
				onClose={() => setSheetDataIndex(null)}
				{...(sheetDataIndex !== null ? bottomSheetData[sheetDataIndex] : {})}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
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
