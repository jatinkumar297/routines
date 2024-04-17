import React, { useRef, useState } from "react"
import { View, TextInput, StyleSheet, Animated, Dimensions, StatusBar, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { COLORS, FONT, defaultHPadding } from "../utils/constants"
import globalStyles from "../utils/globalStyles"
import { ThemeButton, ThemeText } from "../components/ThemeComponents"
import { AntDesign } from "@expo/vector-icons"
import { MaterialCommunityIcons, MaterialIcons, Feather } from "@expo/vector-icons"
import TimeInput from "../components/TimeInput"
import DateTimeModal from "../components/DateTimeModal"
import BottomBar from "../components/BottomBar"
import CustomBottomSheet from "../components/CustomBottomSheet"

const wHeight = Dimensions.get("window").height

function Task({ navigation, id }) {
	const refBottomSheet = useRef()

	const [dateTimeModal, setDateTimeModal] = useState()
	const [task, setTask] = useState({
		title: "The Good Stuff",
		description:
			"This is a random paragraph to fill the space in the second input of the screen to test this is a random paragraph to fill the space in the second input of the screen to test this is a random paragraph to fill the space in the second input of the screen to test this is a random paragraph to fill the space in the second input of the screen to test this is a random paragraph to fill the space in the second input of the screen to test."
	})

	const translateY = useRef(new Animated.Value(wHeight)).current
	const setData = data => setTask(prev => ({ ...prev, ...data }))

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
					<ThemeButton onPress={() => navigation.goBack()} rippleRadius={24}>
						<Ionicons name="arrow-back-sharp" style={globalStyles.icon} />
					</ThemeButton>
				</View>
				<TouchableOpacity onPress={() => refBottomSheet.current.open()} style={styles.listTrigger}>
					<ThemeText style={{ fontSize: FONT.small }} theme>
						My Tasks
					</ThemeText>
					<AntDesign name="caretdown" size={FONT.xxSmall} color={COLORS.THEME} />
				</TouchableOpacity>
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
					<TimeInput onPress={showModal} advanced />
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
			<BottomBar
				rightSideData={[
					{
						Component: () => (
							<View style={{ flexDirection: "row", justifyContent: "flex-end", width: "100%" }}>
								<ThemeButton
									style={{ paddingHorizontal: 12, paddingVertical: 15, marginRight: 10 }}
									rippleBordered
								>
									<ThemeText style={{ fontSize: FONT.default, fontWeight: 600 }} theme>
										Mark as completed
									</ThemeText>
								</ThemeButton>
							</View>
						)
					}
				]}
			/>
			<CustomBottomSheet
				ref={refBottomSheet}
				heading={"Move task to"}
				data={[
					[{ label: "My Tasks", Icon: props => <Feather name="check" {...props} /> }, { label: "Order List" }]
				]}
			/>
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
