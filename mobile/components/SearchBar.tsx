import React from "react";
import { Text, View } from "./Themed";
import { TextInput, TouchableOpacity } from "react-native";
import tw from "../lib/tailwind";
import { MaterialIcons } from "@expo/vector-icons";

const SearchBar = () => {
	const [text, onChangeText] = React.useState("");
	return (
		<View style={tw`flex-row w-5/6 my-6`}>
			<View
				style={tw`flex-row items-center flex-1 px-4 py-1 rounded-xl dark:bg-dark-dark bg-light-dark`}
			>
				<Text style={tw`mr-4`}>
					<MaterialIcons name="search" style={tw`text-3xl`} />
				</Text>

				<TextInput
					style={tw`flex-1 ml-auto text-dark-darker dark:text-white`}
					onChangeText={onChangeText}
					value={text}
					placeholder={"Search projects or tasks..."}
					placeholderTextColor={tw.color("dark-light")}
				/>
			</View>
			<TouchableOpacity accessibilityRole="button" style={tw`ml-4`}>
				<View
					style={tw`px-4 py-1 rounded-xl dark:bg-dark-dark bg-light-dark`}
				>
					<Text>
						<MaterialIcons name="sort" style={tw`text-3xl`} />
					</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default SearchBar;
