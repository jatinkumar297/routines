import React, { useRef, useState } from "react"
import { StyleSheet, View } from "react-native"
import { ThemeButton, ThemeText } from "../components/ThemeComponents"
import { FONT } from "../utils/constants"
import Tabs from "../components/Tabs"
import BottomBar from "../components/BottomBar"
import { MaterialCommunityIcons, MaterialIcons, Feather, Entypo } from "@expo/vector-icons"
import BottomSheet from "../components/BottomSheet"

const bottomSheetData = [
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
					Icon: props => <MaterialIcons name="add" {...props} />
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
]

function Home({ navigation }) {
	const refBottomSheet = useRef()
	const [sheetDataIndex, setSheetDataIndex] = useState(null)

	const handleBottomSheet = index => {
		setSheetDataIndex(index)
		refBottomSheet.current.open()
	}

	return (
		<View style={styles.container}>
			<View style={styles.headerWrapper}>
				<ThemeText style={styles.header} center>
					Routines
				</ThemeText>
				<View style={styles.profile}>
					<ThemeText style={styles.profileText}>J</ThemeText>
				</View>
			</View>
			<Tabs />
			<BottomBar
				leftSideData={[
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
				]}
				rightSideData={[
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
				]}
			/>
			<BottomSheet
				refRBSheet={refBottomSheet}
				heading={bottomSheetData[sheetDataIndex]?.label}
				data={bottomSheetData[sheetDataIndex]?.data}
				iconHidden={bottomSheetData[sheetDataIndex]?.iconHidden}
				onClose={() => setSheetDataIndex(null)}
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
