import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable } from "react-native";
import Colors from "../constants/Colors";
import type { RootTabScreenProps } from "../types";

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
			<FontAwesome
				name="info-circle"
				size={25}
				color={Colors[colorScheme].text}
				style={{ marginRight: 15 }}
			/>
		</Pressable>
	);
};

export default NotificationButton;
