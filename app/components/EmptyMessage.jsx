import React from "react"
import { Image, StyleSheet, View } from "react-native"
import { ThemeText } from "./ThemeComponents"

const emptyMessageData = [
	{
		imageURL: require("../../assets/images/starred.jpg"),
		heading: "No starred tasks",
		message: "Mark important tarks with a star so that you can easily find them here"
	},
	{
		imageURL: require("../../assets/images/empty.jpg"),
		heading: "No tasks yet",
		message: "Add your to-dos and keep track of them here"
	},
	{
		imageURL: require("../../assets/images/complete.jpg"),
		heading: "All tasks completed",
		message: "Nice word!"
	}
]

const EmptyMessage = ({ type }) => {
	return (
		<View style={styles.emptyMessageContainer}>
			<Image style={styles.image} source={emptyMessageData[type].imageURL} />
			<ThemeText style={styles.heading}>{emptyMessageData[type].heading}</ThemeText>
			<ThemeText style={styles.message}>{emptyMessageData[type].message}</ThemeText>
		</View>
	)
}

export default EmptyMessage

const styles = StyleSheet.create({
	emptyMessageContainer: {
		justifyContent: "center",
		alignItems: "center",
		flex: 1
	},
	image: {
		width: 205,
		height: 205
	},
	heading: {
		fontSize: 21,
		paddingTop: 25,
		paddingBottom: 15,
		textAlign: "center"
	},
	message: {
		textAlign: "center",
		width: "70%",
		opacity: 0.8,
		paddingBottom: 50
	}
})
