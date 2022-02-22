import { Text, View } from "./Themed";
import tw from "../lib/tailwind";
import { MaterialIcons } from "@expo/vector-icons";
import { ReactNode, useState } from "react";
import { LayoutAnimation, TouchableOpacity } from "react-native";

interface accordionProps {
	title: string;
	children: ReactNode;
}

const Accordion = ({ title, children }: accordionProps) => {
	const [expanded, setExpanded] = useState(false);

	const expandAccordion = () => {
		LayoutAnimation.configureNext(
			LayoutAnimation.create(700, "easeOut", "opacity")
		);
		setExpanded(!expanded);
	};
	return (
		<>
			<View style={tw`flex-row justify-between w-100 h-20`}>
				<View style={tw`justify-center`}>
					<Text style={tw`font-main-bold text-2xl`}>{title}</Text>
				</View>
				<TouchableOpacity
					style={tw`justify-center`}
					onPress={() => expandAccordion()}
				>
					<View style={tw`flex-row`}>
						<Text style={tw`text-2xl font-main-light `}>
							{" "}
							View More{" "}
						</Text>
						<MaterialIcons
							style={tw`text-4xl leading-1`}
							color={tw.color("light-light")}
							name={
								expanded
									? "keyboard-arrow-up"
									: "keyboard-arrow-down"
							}
						/>
					</View>
				</TouchableOpacity>
			</View>
			{expanded && children}
		</>
	);
};

export default Accordion;
