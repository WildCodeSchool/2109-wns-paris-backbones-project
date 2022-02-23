import React from "react";
import {
	type GestureResponderEvent,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { type Style } from "twrnc/dist/esm/types";
import tw from "../lib/tailwind";
import GradientWrapper from "./GradientWrapper";

interface IBtn {
	buttonType: "enabled" | "disabled" | "danger";
	content: string;
	onPress: (event: GestureResponderEvent) => void;
	style?: Style;
}

export const Btn = ({ content, buttonType, onPress }: IBtn) => {
	const gradient =
		buttonType === "enabled"
			? `primary-linear`
			: buttonType === "disabled"
			? `light-linear`
			: `secondary-linear`;

	return (
		<TouchableOpacity onPress={onPress}>
			<GradientWrapper
				gradientName={gradient}
				style={tw`flex-row items-center justify-center w-32 h-12 rounded-xl`}
			>
				<Text
					style={tw.style({
						"text-dark-medium": buttonType === "disabled",
						"text-light-light": buttonType !== "disabled",
						"text-lg font-main-bold": true,
					})}
				>
					{content}
				</Text>
			</GradientWrapper>
		</TouchableOpacity>
	);
};
