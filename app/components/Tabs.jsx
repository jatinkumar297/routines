import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import List from "../screens/List"
import { COLORS, FONT } from "../utils/constants"
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { ThemeButton, ThemeText } from "./ThemeComponents"
import React from "react"

const Tab = createMaterialTopTabNavigator()

export default function Tabs({ navigate, listNames }) {
	return (
		<Tab.Navigator
			sceneContainerStyle={{
				backgroundColor: COLORS.DARK_PRIMARY
			}}
			screenOptions={{
				lazy: true,
				tabBarScrollEnabled: true,
				tabBarActiveTintColor: COLORS.THEME,
				tabBarInactiveTintColor: COLORS.FONT_PRIMARY,
				tabBarPressColor: COLORS.HIGHLIGHT_THEME,
				tabBarStyle: {
					backgroundColor: COLORS.DARK_PRIMARY,
					borderBottomColor: COLORS.BORDER,
					borderBottomWidth: 1,
					paddingHorizontal: 10
				},
				tabBarItemStyle: {
					width: "auto",
					paddingHorizontal: 15,
					paddingVertical: 10
				},
				tabBarLabelStyle: { fontSize: 14, fontWeight: 600, textTransform: "none" },
				tabBarIndicatorStyle: {
					height: 3,
					width: 0.6,
					backgroundColor: COLORS.THEME,
					marginHorizontal: 10,
					marginBottom: -1
				}
			}}
		>
			<Tab.Screen
				name="starred"
				component={List}
				initialParams={{ listId: 0 }}
				options={{
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="star" size={FONT.xxLarge} color={color} />,
					tabBarShowLabel: false
				}}
			/>
			{listNames?.map(i => (
				<Tab.Screen key={i._id} name={i?.title} component={List} initialParams={{ listId: i._id }} />
			))}
			<Tab.Screen
				name="AddNewList"
				children={() => null}
				options={({ route, navigation }) => ({
					tabBarIconStyle: {
						height: "auto",
						width: "auto"
					},
					tabBarShowLabel: false,
					tabBarIcon: () => (
						<ThemeButton
							style={{
								flexDirection: "row",
								itemsCenter: true,
								gap: 5
							}}
						>
							<MaterialIcons name="add" color={COLORS.FONT_PRIMARY} size={20} />
							<ThemeText style={{ verticalAlign: "middle", fontSize: 14, fontWeight: 600, textTransform: "none" }}>
								New List
							</ThemeText>
						</ThemeButton>
					)
				})}
				listeners={({ navigation }) => ({
					focus: ({}) => {
						navigation.navigate(listNames?.at(-1)?.title || "starred")
						navigate("list-title")
					},
					tabPress: ({ preventDefault }) => {
						preventDefault()
						navigate("list-title")
					}
				})}
			/>
		</Tab.Navigator>
	)
}
