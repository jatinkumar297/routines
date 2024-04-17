import React from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { COLORS, FONT } from "../utils/constants"
import { Feather } from "@expo/vector-icons"
import { ThemeText, ThemeButton } from "../components/ThemeComponents"
import TimeInput from "../components/TimeInput"
import { useStore } from "../store"
import EmptyMessage from "../components/EmptyMessage"

function List({ navigation, route }) {
	const tasks = useStore(state => state.lists.find(i => i._id === route.params?.listId)?.tasks)

	return (
		<>
			<ScrollView style={{ flexGrow: 0 }}>
				{tasks?.map((task, index) => (
					<ThemeButton rippleBordered key={task._id} onPress={() => navigation.push("task", { id: 1 })}>
						<View style={[styles.task, index + 1 === tasks.length ? styles.lastTask : {}]}>
							<Feather name="circle" size={FONT.xLarge} color={COLORS.FONT_PRIMARY} style={{ top: FONT.xSmall }} />
							<View style={{ flexShrink: 1, gap: 4 }}>
								<ThemeText style={{ fontSize: FONT.medium }}>{task.title}</ThemeText>
								{Boolean(title.description) && (
									<View style={{ paddingBottom: 5, paddingRight: 20 }}>
										<ThemeText style={{ fontSize: FONT.small }} numberOfLines={2}>
											{title.description}
										</ThemeText>
									</View>
								)}
								<TimeInput />
							</View>
						</View>
					</ThemeButton>
				))}
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

			{!tasks?.[0] && <EmptyMessage type={route.params.listId === 0 ? 0 : 1} />}
		</>
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
