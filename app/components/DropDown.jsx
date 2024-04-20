import { StyleSheet, Text, View } from "react-native"
import React from "react"
import { ThemeButton, ThemeText } from "./ThemeComponents"

const DropDown = ({ data, onSelect }) => {
	return (
		<View style={styles.dropdownContainer}>
			{data?.map(i => (
				<ThemeButton
					_containerStyle={{ width: "100%" }}
					onPress={() => onSelect(i.value)}
					style={{
						width: "100%",
						paddingHorizontal: 10,
						paddingVertical: 4
					}}
					rippleBordered
					key={i.label}
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
