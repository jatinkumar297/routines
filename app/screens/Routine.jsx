import React from "react"
import { StyleSheet, View, ScrollView } from "react-native"
import { COLORS, FONT } from "../utils/constants"
import { Feather } from "@expo/vector-icons"
import { ThemeText, ThemeButton } from "../components/ThemeComponents"
import TimeInput from "../components/TimeInput"

const tasks = [
	"Complete React Native Tutorial",
	"Create a new project in React Native",
	"Improve task management UI",
	"Schedule weekly team meeting",
	"Implement dark mode in the app",
	"Review and refactor codebase",
	"Write unit tests for critical functions",
	"Plan marketing strategy for the month",
	"Learn a new JavaScript framework",
	"Optimize app performance",
	"Brainstorm new feature ideas",
	"Attend virtual conference on mobile development",
	"Create wireframes for upcoming features",
	"Write documentation for API endpoints",
	"Research latest design trends",
	"Implement user authentication",
	"Write blog post about coding tips",
	"Update project dependencies",
	"Test app on multiple devices",
	"Collaborate with UX designer on UI improvements",
	"Plan and execute social media campaign",
	"Investigate and fix a bug reported by users",
	"Explore new libraries for state management",
	"Create tutorial video for a coding concept",
	"Review and respond to user feedback",
	"Implement push notifications",
	"Create a checklist for project milestones",
	"Practice responsive design principles",
	"Backup and secure project data"
]

function Routine({ navigation }) {
	return (
		<ScrollView>
			{tasks?.map((item, index) => (
				<ThemeButton rippleBordered key={item} onPress={() => navigation.push("task", { id: 1 })}>
					<View style={[styles.task, index + 1 === tasks.length ? styles.lastTask : {}]}>
						<Feather name="circle" size={FONT.xLarge} color={COLORS.FONT_PRIMARY} style={{ top: FONT.xSmall }} />
						<View style={{ flexShrink: 1, gap: 4 }}>
							<ThemeText style={{ fontSize: FONT.medium }}>{item}</ThemeText>
							<View style={{ paddingBottom: 5, paddingRight: 20 }}>
								<ThemeText style={{ fontSize: FONT.small }} numberOfLines={2}>
									The leather jacked showed the scars of being his favorite for years. It wore those scars with
									pride, feeling that they enhanced his presence rather than diminishing it. The scars gave it
									character and had not overwhelmed to the point that it had become ratty. The jacket was in its
									prime and it knew it.
								</ThemeText>
							</View>
							<TimeInput />
						</View>
					</View>
				</ThemeButton>
			))}
			<ThemeText style={styles.completedHeading}>Completed (2)</ThemeText>
			{tasks?.map((item, index) => (
				<ThemeButton key={item + index} rippleBordered>
					<View style={styles.task}>
						<Feather name="check" size={FONT.xLarge} color={COLORS.THEME} style={{ top: FONT.xSmall }} />
						<View style={{ flexShrink: 1, gap: 4 }}>
							<ThemeText style={{ fontSize: FONT.medium, textDecorationLine: "line-through" }}>{item}</ThemeText>
							<ThemeText style={{ fontSize: FONT.small, textDecorationLine: "line-through" }} numberOfLines={2}>
								The leather jacked showed the scars of being his favorite for years. It wore those scars with
								pride, feeling that they enhanced his presence rather than diminishing it. The scars gave it
								character and had not overwhelmed to the point that it had become ratty. The jacket was in its
								prime and it knew it.
							</ThemeText>
						</View>
					</View>
				</ThemeButton>
			))}
		</ScrollView>
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

export default Routine
