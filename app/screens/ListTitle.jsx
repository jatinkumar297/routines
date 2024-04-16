import React, { useState } from "react"
import { StyleSheet, View, TextInput } from "react-native"
import { COLORS, FONT, defaultHPadding } from "../utils/constants"
import { AntDesign } from "@expo/vector-icons"
import globalStyles from "../utils/globalStyles"
import { ThemeText, ThemeButton } from "../components/ThemeComponents"
import { useStore } from "../store"

function ListTitle({ navigation }) {
	const [title, setTitle] = useState("")
	const addNewList = useStore(state => state.addNewList)
	const addNewListWrapper = async () => {
		await addNewList(title)
		navigation.goBack()
	}

	return (
		<View style={styles.container}>
			<View style={[globalStyles.header, { justifyContent: "space-between" }]}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: defaultHPadding
					}}
				>
					<ThemeButton
						onPress={() => navigation.goBack()}
						rippleRadius={24}
						_containerStyle={{ alignSelf: "center" }}
					>
						<AntDesign name="close" color={COLORS.FONT_PRIMARY} size={FONT.xLarge} />
					</ThemeButton>
					<ThemeText style={{ fontSize: FONT.xLarge }}>Create new list</ThemeText>
				</View>

				{title?.length > 0 && (
					<ThemeButton _containerStyle={{ alignSelf: "center" }} rippleDisabled onPress={addNewListWrapper}>
						<ThemeText theme>Done</ThemeText>
					</ThemeButton>
				)}
			</View>
			<View style={styles.inputView}>
				<TextInput
					onChangeText={setTitle}
					value={title}
					style={styles.input}
					placeholder="Enter list title"
					placeholderTextColor={COLORS.FONT_LIGHT}
					autoFocus={true}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.DARK_PRIMARY
	},
	inputView: {
		paddingHorizontal: 18,
		justifyContent: "center",
		borderColor: COLORS.BORDER,
		paddingVertical: 18,
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth
	},
	input: {
		fontSize: FONT.normal,
		height: FONT.normal * 1.25,
		color: COLORS.FONT_PRIMARY
	}
})

export default ListTitle
