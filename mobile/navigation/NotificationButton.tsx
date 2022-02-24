import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import type { RootTabScreenProps } from "../types";
import tw from "../lib/tailwind";
import { View } from "../components/Themed";

interface IProps {
	navigation: RootTabScreenProps<
		"Home" | "Tasks" | "Projects" | "Profile"
	>["navigation"];
	colorScheme: "light" | "dark";
}

const NotificationButton = ({ navigation }: IProps) => {
	return (
		<Pressable
			onPress={() => navigation.navigate("Modal")}
			style={({ pressed }) => ({
				opacity: pressed ? 0.5 : 1,
			})}
		>
			<View
				style={tw`relative z-0 p-2 rounded-lg dark:bg-dark-dark bg-light-dark`}
			>
				<MaterialIcons
					style={tw`relative z-10 text-3xl leading-1`}
					color={tw.color("primary-dark")}
					name={"notifications"}
				/>
			</View>
		</Pressable>
	);
};

export default NotificationButton;
