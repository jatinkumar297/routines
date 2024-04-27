import React from "react"
import { COLORS, theme_colors } from "./app/utils/constants"
import { Appearance, StatusBar } from "react-native"
import { MasterState } from "./app/utils/MasterContext"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "./app/screens/Home"
import Task from "./app/screens/Task"
import Repeats from "./app/screens/Repeats"
import ListTitle from "./app/screens/ListTitle"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"

Appearance.setColorScheme("dark")
const Stack = createNativeStackNavigator()

export default function App() {
	return (
		<SafeAreaProvider>
			<StatusBar barStyle={"light-content"} backgroundColor={COLORS.DARK_PRIMARY} showHideTransition={"slide"} />
			<GestureHandlerRootView style={{ flex: 1 }}>
				<MasterState>
					<NavigationContainer theme={{ colors: theme_colors, dark: true }}>
						<Stack.Navigator
							screenOptions={{
								headerShown: false,
								statusBarColor: COLORS.DARK_PRIMARY,
								navigationBarColor: COLORS.DARK_BOTTOM_BG,
								contentStyle: { paddingTop: StatusBar.currentHeight, backgroundColor: COLORS.DARK_PRIMARY },
								animation: "slide_from_right"
							}}
						>
							<Stack.Screen name="home" component={Home} />
							<Stack.Screen name="task" component={Task} />
							<Stack.Screen name="list-title" component={ListTitle} options={{ animation: "fade_from_bottom" }} />
						</Stack.Navigator>
					</NavigationContainer>
				</MasterState>
			</GestureHandlerRootView>
		</SafeAreaProvider>
	)
}
