import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import type { RootTabScreenProps } from "../types";
import tw from "../lib/tailwind";
import { View } from "../components/Themed";

interface IProps {
	navigation: RootTabScreenProps<"TabOne" | "TabTwo">["navigation"];
	colorScheme: "light" | "dark";
}

const NotificationButton = ({ navigation, colorScheme }: IProps) => {
	return (
		<Pressable
			onPress={() => navigation.navigate("Modal")}
			style={({ pressed }) => ({
				opacity: pressed ? 0.5 : 1,
			})}
		>
			<View style={tw`bg-dark-transparent relative z-0 rounded-lg p-2`}>
				<MaterialIcons
					style={tw`text-3xl leading-1 relative  z-10`}
					color={tw.color("primary-dark")}
					name={"notifications"}
				/>
			</View>
		</Pressable>
	);
};

export default NotificationButton;
