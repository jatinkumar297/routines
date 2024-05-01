import React from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { COLORS, FONT, generateDateTimeString, generateRepeatsString } from "../utils/constants"
import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { ThemeText, ThemeButton } from "../components/ThemeComponents"
import TimeLabel from "../components/TimeLabel"
import useStore from "../store/zustand"
import EmptyMessage from "../components/EmptyMessage"
import Screen from "../components/Screen"

function List({ navigation, route }) {
	const { listId } = route.params
	const tasks = useStore(state => state.tasks.filter(i => (!listId ? i?.starred : i?.listId === listId)))
	const updateTask = useStore(state => state.updateTask)

	return (
		<Screen>
			<ScrollView style={{ flexGrow: 0 }}>
				{tasks?.map((task, index) => (
					<ThemeButton
						rippleBordered
						key={task._id}
						onPress={() => navigation.push("task", { taskId: task._id })}
						_containerStyle={{ width: "100%" }}
					>
						<View style={[styles.task, index + 1 === tasks.length ? styles.lastTask : {}]}>
							<Feather name="circle" size={FONT.xLarge} color={COLORS.FONT_PRIMARY} style={{ top: FONT.xSmall }} />
							<View style={{ flex: 1, gap: 4, justifyContent: "center" }}>
								<ThemeText style={{ fontSize: FONT.medium }}>{task.title}</ThemeText>

								{Boolean(task.details) && (
									<View style={{ paddingBottom: 5, paddingRight: 20 }}>
										<ThemeText style={{ fontSize: FONT.small }} numberOfLines={2}>
											{task.details}
										</ThemeText>
									</View>
								)}

								{(task?.repeats || task?.date || task?.time) && (
									<TimeLabel
										theme
										text={
											task?.repeats
												? generateRepeatsString(task?.repeats)
												: generateDateTimeString(task?.date, task?.time)
										}
										RightIcon={task?.repeats ? props => <MaterialIcons name="repeat" {...props} /> : null}
									/>
								)}
							</View>

							<ThemeButton
								rippleBordered
								onPress={() => updateTask({ ...task, starred: !task?.starred })}
								_containerStyle={{ marginTop: FONT.xSmall / 2 }}
								style={{ paddingVertical: 5, paddingHorizontal: 10 }}
								borderRadius={20}
								rippleColor={COLORS.HIGHLIGHT_THEME}
							>
								<MaterialCommunityIcons
									name={task?.starred ? "star" : "star-outline"}
									size={FONT.xxLarge}
									color={task?.starred ? COLORS.THEME : COLORS.FONT_PRIMARY}
									style={{ opacity: task?.starred ? 1 : 0.5 }}
								/>
							</ThemeButton>
						</View>
					</ThemeButton>
				))}
				<View style={{ height: 75 }}></View>
				{/* <ThemeText style={styles.completedHeading}>Completed (2)</ThemeText>
					{tasks?.map((item, index) => (
						<ThemeButton key={item + index} rippleBordered>
							<View style={styles.task}>
								<Feather name="check" size={FONT.xLarge} color={COLORS.THEME} style={{ top: FONT.xSmall }} />
								<View style={{ flexShrink: 1, gap: 4 }}>
									<ThemeText style={{ fontSize: FONT.medium, textDecorationLine: "line-through" }}>{item}</ThemeText>
									<ThemeText style={{ fontSize: FONT.small, textDecorationLine: "line-through" }} numberOfLines={2}>
									</ThemeText>
								</View>
							</View>
						</ThemeButton>
					))}*/}
			</ScrollView>
			{!tasks?.[0] && <EmptyMessage type={listId === 0 ? 0 : 1} />}
		</Screen>
	)
}

const styles = StyleSheet.create({
	task: {
		flexDirection: "row",
		gap: 16,
		paddingVertical: 18,
		paddingHorizontal: 24
	},
	lastTask: {
		borderBottomWidth: 1,
		borderBottomColor: COLORS.BORDER
	},
	completedHeading: {
		fontSize: FONT.normal,
		paddingHorizontal: 24,
		paddingVertical: 18
	}
})

export default List
