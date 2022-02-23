/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import {
	type BottomTabBarProps,
	createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";

import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import HomeScreen from "../screens/HomeScreen";
import TasksScreen from "../screens/TasksScreen";
import ProjectsScreen from "../screens/ProjectsScreen";
import TabFourScreen from "../screens/ProjectsScreen";
import {
	RootStackParamList,
	RootTabParamList,
	RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";

import NotificationButton from "./NotificationButton";
import TabBar from "./TabBar";
import tw from "../lib/tailwind";

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName;
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	);
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Root"
				component={BottomTabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name="NotFound"
				component={NotFoundScreen}
				options={{ title: "Oops!" }}
			/>
			<Stack.Group screenOptions={{ presentation: "modal" }}>
				<Stack.Screen name="Modal" component={ModalScreen} />
			</Stack.Group>
		</Stack.Navigator>
	);
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
	const colorScheme = useColorScheme();

	return (
		<BottomTab.Navigator
			initialRouteName="TabOne"
			tabBar={(props: BottomTabBarProps) => <TabBar {...props} />}
			screenOptions={({
				navigation,
			}: RootTabScreenProps<keyof RootTabParamList>) => ({
				// tabBarActiveTintColor: Colors[colorScheme].tint,
				headerTitleAlign: "left",
				headerStyle: tw`h-33`,
				headerTitleStyle: tw`text-3xl font-main-bold`,
				headerRight: () => (
					<NotificationButton
						navigation={navigation}
						colorScheme={colorScheme}
					/>
				),
			})}
		>
			<BottomTab.Screen
				name="TabOne"
				component={HomeScreen}
				options={{
					title: "Home",
					//   tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="TabTwo"
				component={TasksScreen}
				options={{
					title: "Tasks",
					//   tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="TabThree"
				component={ProjectsScreen}
				options={{
					title: "Projects",
					//   tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
				}}
			/>
			<BottomTab.Screen
				name="TabFour"
				component={TabFourScreen}
				options={{
					title: "Profile",
					//   tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
