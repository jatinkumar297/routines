import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { COLORS } from "../utils/constants"
import { ThemeButton, ThemeText } from "./ThemeComponents"

const DropDown = ({ data }) => {
	return (
		<View style={styles.dropdownContainer}>
			{data?.map(i => (
				<ThemeButton
					_containerStyle={{ width: "100%" }}
					style={{
						width: "100%",
						paddingHorizontal: 10,
						paddingVertical: 4
					}}
					rippleBordered
					key={i.label}
					onPress={() => i?.action?.(i.value)}
				>
					<ThemeText>{i.label}</ThemeText>
				</ThemeButton>
			))}
		</View>
	)
}

export default DropDown

const styles = StyleSheet.create({
	dropdownContainer: {
		backgroundColor: "#101010",
		paddingVertical: 5,
		borderRadius: 10,
		marginTop: 2,
		position: "absolute",
		top: "100%",
		width: "100%",
		zIndex: 1
	}
})
