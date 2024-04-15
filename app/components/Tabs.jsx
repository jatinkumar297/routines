import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import Routine from "../screens/Routine"
import { COLORS } from "../utils/constants"
import { StyleSheet } from "react-native"

const Tab = createMaterialTopTabNavigator()

export default function Tabs({ listNames }) {
	return (
		<Tab.Navigator
			sceneContainerStyle={{
				backgroundColor: COLORS.DARK_PRIMARY
			}}
			screenOptions={{
				tabBarGap: 24,
				tabBarActiveTintColor: COLORS.THEME,
				tabBarInactiveTintColor: COLORS.FONT_PRIMARY,
				tabBarPressColor: COLORS.THEME_SEMI,
				tabBarStyle: {
					backgroundColor: COLORS.DARK_PRIMARY,
					marginHorizontal: 0,
					paddingHorizontal: 20,
					borderBottomColor: COLORS.BORDER,
					borderBottomWidth: StyleSheet.hairlineWidth
				},
				tabBarItemStyle: {
					width: "auto",
					paddingHorizontal: 5,
					paddingVertical: 10
				},
				tabBarLabelStyle: { fontSize: 15, textTransform: "none" },
				tabBarIndicatorStyle: {
					height: 3,
					backgroundColor: COLORS.THEME,
					marginLeft: 20,
					marginBottom: -StyleSheet.hairlineWidth
				}
			}}
		>
			<Tab.Screen key="starred" name="Starred" component={Routine} initialParams={{ listId: 0 }} />
			{listNames?.map(i => (
				<Tab.Screen key={i._id} name={i.title} component={Routine} initialParams={{ listId: i._id }} />
			))}
		</Tab.Navigator>
	)
}
