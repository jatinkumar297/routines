import React, { useRef, useState } from "react"
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native"
import { COLORS, FONT, defaultHPadding, generateDateTimeString, generateRepeatsString } from "../utils/constants"
import { ThemeButton, ThemeText } from "../components/ThemeComponents"
import { Ionicons, AntDesign, MaterialCommunityIcons, MaterialIcons, Feather } from "@expo/vector-icons"
import { DateTimeModalWrapper } from "../components/DateTimeModal"
import TimeLabel from "../components/TimeLabel"
import BottomBar from "../components/BottomBar"
import BottomMenu from "../components/BottomMenu"
import Screen from "../components/Screen"
import Repeats from "./Repeats"
import useStore from "../store/zustand"
import globalStyles from "../utils/globalStyles"

function Task({ navigation, route }) {
	const { taskId } = route.params
	const refBottomSheet = useRef()

	const [state, setState] = useState({})
	const lists = useStore(state => state.lists.map(i => ({ _id: i._id, title: i.title })))
	const task = useStore(state => state.tasks.find(i => i?._id === taskId))
	const updateTask = useStore(state => state.updateTask)
	const setTask = f => updateTask(f(task))

	return (
		<Screen>
			<View style={styles.container}>
				<View style={[globalStyles.header, styles.header]}>
					<ThemeButton onPress={() => navigation.goBack()} rippleRadius={24}>
						<Ionicons name="arrow-back-sharp" style={globalStyles.icon} />
					</ThemeButton>
				</View>
				<TouchableOpacity onPress={() => refBottomSheet.current.expand()} style={styles.listTrigger}>
					<ThemeText style={{ fontSize: FONT.small }} theme>
						{lists?.find(i => i._id === task?.listId)?.title}
					</ThemeText>
					<AntDesign name="caretdown" size={FONT.xxSmall} color={COLORS.THEME} />
				</TouchableOpacity>
				<TextInput
					value={task?.title}
					onChangeText={title => setTask(prev => ({ ...prev, title }))}
					style={[styles.input, styles.title]}
					multiline
				/>
				<View style={styles.inputWrapper}>
					<MaterialCommunityIcons name="text" style={globalStyles.icon} />
					<TextInput
						value={task?.details}
						placeholder="Add details"
						placeholderTextColor={COLORS.FONT_LIGHT}
						onChangeText={details => setTask(prev => ({ ...prev, details }))}
						style={[styles.input, styles.details]}
						multiline
					/>
				</View>

				<View style={styles.inputWrapper}>
					{task?.repeats ? (
						<MaterialIcons name="repeat" style={globalStyles.icon} />
					) : (
						<MaterialCommunityIcons name="clock-time-four-outline" style={globalStyles.icon} />
					)}
					<TimeLabel
						onPress={() =>
							setState(
								task?.repeats ? { repeats: { visible: true, data: task?.repeats } } : { dateTimeModal: true }
							)
						}
						placeholder={"Set time"}
						text={
							task?.repeats
								? generateRepeatsString(task?.repeats)
								: task?.date || task?.time
								? generateDateTimeString(task?.date, task?.time)
								: null
						}
						remove={() =>
							setTask(prev => ({
								...prev,
								...(prev?.repeats ? { repeats: null } : { date: null, time: null })
							}))
						}
					/>
				</View>
			</View>

			<DateTimeModalWrapper
				visible={state?.dateTimeModal}
				callRepeats={data => setState(prev => ({ ...prev, repeats: { data, visible: true } }))}
				close={() => setState(prev => ({ ...prev, dateTimeModal: false }))}
				data={task?.date ? { date: task?.date, time: task?.time } : null}
				submit={data => {
					setState(prev => ({ ...prev, dateTimeModal: false }))
					setTask(prev => ({
						...prev,
						...data
					}))
				}}
			/>

			<Repeats
				{...state?.repeats}
				close={() => setState(prev => ({ ...prev, repeats: null }))}
				submit={repeats => {
					setState({})
					setTask(prev => ({ ...prev, repeats }))
				}}
			/>

			<BottomBar
				rightSideData={[
					{
						Component: () => (
							<View style={{ flexDirection: "row", justifyContent: "flex-end", width: "100%" }}>
								<ThemeButton style={globalStyles.ractButton} rippleBordered>
									<ThemeText style={globalStyles.ractButtonText} theme>
										Mark as completed
									</ThemeText>
								</ThemeButton>
							</View>
						)
					}
				]}
			/>
			<BottomMenu
				ref={refBottomSheet}
				heading={"Move task to"}
				data={[
					lists?.map(i => ({
						label: i.title,
						value: i._id,
						...(task?.listId === i._id ? { Icon: props => <Feather name="check" {...props} /> } : {}),
						action: () => {
							updateTask({ ...task, listId: i._id }), refBottomSheet.current.close()
						}
					}))
				]}
			/>
		</Screen>
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
		fontSize: FONT.xLarge
	},
	details: {
		height: "auto",
		flex: 1
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
		marginTop: 18
	}
})

export default Task
