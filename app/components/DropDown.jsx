import { Dimensions, Pressable, StyleSheet, View } from "react-native"
import React, { useState } from "react"
import { ThemeButton, ThemeText } from "./ThemeComponents"
import { FlatList } from "react-native-gesture-handler"
import { AntDesign } from "react-native-vector-icons"
import { FONT } from "../utils/constants"
import globalStyles from "../utils/globalStyles"
import OutsidePressHandler from "react-native-outside-press"

const dropDownHeight = Dimensions.get("window").height / 2.25

const DropDown = ({ data, value, onSelect, styles: _styles, dropDownPosition = "top" }) => {
	const [dropDownState, setDropDownState] = useState(false)
	const label = data.find(i => i.value === value)?.label
	return (
		<OutsidePressHandler
			onOutsidePress={() => setDropDownState(false)}
			style={[styles.container, _styles?.container, { zIndex: dropDownState ? 10 : 1 }]}
		>
			<Pressable style={[styles.button, _styles?.button]} onPress={() => setDropDownState(prev => !prev)}>
				<ThemeText style={styles.buttonText}>{label}</ThemeText>
				<AntDesign
					name={dropDownState ? "caretup" : "caretdown"}
					style={[globalStyles.icon, { fontSize: 10, opacity: 0.7 }]}
				/>
			</Pressable>

			{dropDownState && (
				<View
					style={[styles.dropdownContainer, { top: dropDownPosition === "top" ? "100%" : -dropDownHeight - 10 }]}
				>
					<FlatList
						showsVerticalScrollIndicator
						indicatorStyle="white"
						initialNumToRender={15}
						data={data}
						renderItem={({ item }) => (
							<ThemeButton
								key={item.label}
								_containerStyle={{ width: "100%" }}
								onPress={() => {
									setDropDownState()
									onSelect(item.value)
								}}
								style={styles.dropDownItem}
								rippleBordered
							>
								<ThemeText>{item.label}</ThemeText>
							</ThemeButton>
						)}
					/>
				</View>
			)}
		</OutsidePressHandler>
	)
}

export default DropDown

const styles = StyleSheet.create({
	container: {
		position: "relative"
	},
	dropdownContainer: {
		zIndex: 20,
		backgroundColor: "#101010",
		paddingVertical: 5,
		borderRadius: 10,
		marginTop: 2,
		position: "absolute",
		top: "100%",
		width: "100%",
		maxHeight: dropDownHeight
	},
	dropDownItem: {
		width: "100%",
		paddingHorizontal: 10,
		paddingVertical: 4
	},
	button: {
		flexGrow: 1,
		flexDirection: "row",
		alignItems: "center"
	},
	buttonText: {
		flexGrow: 1,
		fontSize: FONT.medium
	}
})
