import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import tw from "../lib/tailwind";

const iconsPerRoute = {
	TabOne: "home-filled",
	TabTwo: "check-box",
	TabThree: "create-new-folder",
	TabFour: "person",
} as const;

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
	const focusedOptions = descriptors[state.routes[state.index].key].options;
	if ((focusedOptions as { tabBarVisible: boolean }).tabBarVisible === false)
		return null;

	return (
		<View
			style={tw`flex-row justify-between px-5 py-2 mx-4 mb-4 rounded-md bg-dark-dark`}
		>
			{state.routes.map((route, index) => {
				const { options } = descriptors[route.key];
				const label =
					options.tabBarLabel !== undefined
						? options.tabBarLabel
						: options.title !== undefined
						? options.title
						: route.name;

				const isFocused = state.index === index;

				const onPress = () => {
					const event = navigation.emit({
						type: "tabPress",
						target: route.key,
						canPreventDefault: true,
					});

					if (!isFocused && !event.defaultPrevented) {
						navigation.navigate(route.name);
					}
				};

				const onLongPress = () => {
					navigation.emit({
						type: "tabLongPress",
						target: route.key,
					});
				};

				return (
					<TouchableOpacity
						accessibilityRole="button"
						accessibilityState={isFocused ? { selected: true } : {}}
						accessibilityLabel={options.tabBarAccessibilityLabel}
						testID={options.tabBarTestID}
						onPress={onPress}
						onLongPress={onLongPress}
						style={tw`flex-grow`}
						key={route.name}
					>
						<View
							style={tw.style({
								"flex-row items-center rounded-lg p-2": true,
								"bg-primary-medium/10": isFocused,
							})}
						>
							<MaterialIcons
								style={tw`mx-auto text-3xl`}
								color={tw.color("primary-medium")}
								name={
									iconsPerRoute[
										route.name as keyof typeof iconsPerRoute
									]
								}
							/>
							{isFocused && (
								<Text
									style={tw`flex-grow text-xs text-center font-main-light text-light-light`}
								>
									{label}
								</Text>
							)}
						</View>
					</TouchableOpacity>
				);
			})}
		</View>
	);
};

export default TabBar;
