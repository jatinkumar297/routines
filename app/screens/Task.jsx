import React, { useEffect, useRef, useState } from "react"
import { View, TextInput, StyleSheet, Animated, Dimensions, StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS, FONT, defaultHPadding } from "../utils/constants"
import globalStyles from "../utils/globalStyles"
import { ThemeButton, ThemeText } from "../components/ThemeComponents"
import { AntDesign } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import TimeInput from "../components/TimeInput"
import DateTimeModal from "../components/DateTimeModal"
import { hPadd, modalWidth } from "../components/CustomModal"

const wHeight = Dimensions.get("window").height

function Task({ navigation, id }) {
	const [dateTimeModal, setDateTimeModal] = useState()
	const [task, setTask] = useState({
		title: "The Good Stuff",
		description:
			"This is a random paragraph to fill the space in the second input of the screen to test this is a random paragraph to fill the space in the second input of the screen to test this is a random paragraph to fill the space in the second input of the screen to test this is a random paragraph to fill the space in the second input of the screen to test this is a random paragraph to fill the space in the second input of the screen to test."
	})

	const setData = data => setTask(prev => ({ ...prev, ...data }))
	const translateY = useRef(new Animated.Value(wHeight)).current

	const showModal = () => {
		setTimeout(
			() =>
				Animated.timing(translateY, {
					toValue: StatusBar.currentHeight / 2,
					duration: 500,
					useNativeDriver: true
				}).start(),
			0
		)
		setDateTimeModal({ active: true })
	}

	const closeModal = () => {
		Animated.timing(translateY, {
			toValue: wHeight,
			duration: 250,
			useNativeDriver: true
		}).start()

		setTimeout(() => {
			setDateTimeModal()
		}, 125)
	}

	return (
		<>
			<View style={styles.container}>
				<View style={[globalStyles.header, styles.header]}>
					<ThemeButton onPress={() => navigation.goBack()} borderRadius={24}>
						<Ionicons name="arrow-back-sharp" style={globalStyles.icon} />
					</ThemeButton>
				</View>
				<View style={styles.listTrigger}>
					<ThemeText style={{ fontSize: FONT.small }} theme>
						My Tasks
					</ThemeText>
					<AntDesign name="caretdown" size={FONT.xxSmall} color={COLORS.THEME} />
				</View>
				<TextInput
					value={task?.title}
					onTextInput={title => setData({ title })}
					style={[styles.input, styles.title]}
					multiline
				/>
				<View style={styles.inputWrapper}>
					<MaterialCommunityIcons name="text" style={globalStyles.icon} />
					<TextInput
						value={task?.description}
						onTextInput={description => setData({ description })}
						style={[styles.input, styles.description]}
						multiline={true}
					/>
				</View>

				<View style={styles.inputWrapper}>
					<MaterialCommunityIcons name="clock-time-four-outline" style={globalStyles.icon} />
					<TimeInput onPress={showModal} />
				</View>
			</View>

			<View
				style={{
					...StyleSheet.absoluteFillObject,
					backgroundColor: COLORS.OVERLAY,
					opacity: dateTimeModal?.active ? 1 : 0,
					pointerEvents: dateTimeModal?.active ? "auto" : "none"
				}}
			>
				<Animated.View
					style={[
						{
							...StyleSheet.absoluteFillObject,
							alignItems: "center",
							justifyContent: "center"
						},
						{ transform: [{ translateY: translateY }] }
					]}
				>
					<DateTimeModal navigation={navigation} visible={dateTimeModal?.active} close={closeModal} />
				</Animated.View>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: defaultHPadding
	},
	header: {
		justifyContent: "flex-between",
		paddingHorizontal: 0
	},
	listTrigger: {
		marginVertical: 16,
		flexDirection: "row",
		alignItems: "center",
		gap: 12
	},
	input: {
		color: COLORS.FONT_PRIMARY,
		fontSize: FONT.normal
	},
	title: {
		marginVertical: 10,
		fontSize: FONT.xLarge
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
		marginBottom: 12
	},
	description: {
		flexShrink: 1,
		height: "auto"
	}
})

export default Task
