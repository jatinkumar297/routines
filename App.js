import React from "react"
import { COLORS, theme_colors } from "./app/utils/constants"
import { Appearance, StatusBar, View } from "react-native"
import { MasterState } from "./app/utils/MasterContext"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "./app/screens/Home"
import NameModal from "./app/screens/NameModal"
import Task from "./app/screens/Task"
import Repeats from "./app/screens/Repeats"

Appearance.setColorScheme("dark")
const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<View style={{ flex: 1, backgroundColor: COLORS.DARK_PRIMARY }}>
			<StatusBar barStyle={"light-content"} />
			<MasterState>
				<NavigationContainer theme={{ colors: theme_colors, dark: true }}>
					<Stack.Navigator
						screenOptions={{
							headerShown: false,
							navigationBarColor: COLORS.DARK_PRIMARY,
							statusBarColor: COLORS.DARK_PRIMARY,
							contentStyle: { paddingVertical: StatusBar.currentHeight },
							animation: "slide_from_right"
						}}
					>
						<Stack.Screen name="home" component={Home} />
						<Stack.Screen name="task" component={Task} />
						<Stack.Screen name="name" component={NameModal} options={{ animation: "fade_from_bottom" }} />
						<Stack.Screen name="repeats" component={Repeats} options={{ animation: "fade_from_bottom" }} />
					</Stack.Navigator>
				</NavigationContainer>
			</MasterState>
		</View>
	)
}
