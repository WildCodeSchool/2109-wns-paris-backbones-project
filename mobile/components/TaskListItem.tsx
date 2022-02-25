import React, { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import tw from "../lib/tailwind";
import { type TaskData } from "../customTypes";
import { type Style } from "twrnc/dist/esm/types";
import screen from "../constants/Layout";
import UserBadge from "./UserBadge";
import type { RootTabScreenProps } from "../types";
import StatusIcon from "./StatusIcon";

interface IProps {
	task: TaskData;
	style?: Style;
	navigation: RootTabScreenProps<
		"Home" | "Tasks" | "Projects" | "Profile"
	>["navigation"];
	userId: number;
}

export const TaskListItem = ({ task, navigation, userId }: IProps) => {
	const width = (screen.window.width * 11) / 12;

	const onPress = () =>
		navigation.navigate("TaskDetail", {
			taskId: task.id,
			userId: userId,
		});
	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				...tw`flex-row items-center justify-start px-2 py-1 my-1 bg-light-dark dark:bg-dark-dark rounded-3xl`,
				...{ width: width },
			}}
		>
			<View style={tw`flex-row items-center justify-start `}>
				<StatusIcon style={tw`self-start px-2 `} task={task} />
				<Text
					numberOfLines={1}
					style={tw`w-8/12 px-1 text-dark-medium dark:text-light-light flex-nowrap `}
				>
					{task.title}
				</Text>
				<View style={tw`w-1`} />
				<FlatList
					data={task.users}
					horizontal={true}
					contentContainerStyle={tw`ml-auto`}
					renderItem={({ item }) => (
						<View style={tw`-ml-1`}>
							<UserBadge
								user={item}
								withFirstName={false}
								size={5}
							/>
						</View>
					)}
				/>
			</View>
		</TouchableOpacity>
	);
};
