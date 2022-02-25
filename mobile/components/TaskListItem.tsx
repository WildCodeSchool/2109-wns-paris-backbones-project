import React, { useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import tw from "../lib/tailwind";
import { MaterialIcons } from "@expo/vector-icons";
import { type TaskData } from "../customTypes";
import { type Style } from "twrnc/dist/esm/types";
import screen from "../constants/Layout";
import UserBadge from "./UserBadge";

interface IProps {
	task: TaskData;
	style?: Style;
}

interface Statuses {
	[key: string]: {
		status: "to do" | "done" | "in progress" | "late";
		icon:
			| "check-circle-outline"
			| "check-circle"
			| "access-time"
			| "timelapse";
		color: {
			dark: string;
			light: string;
		};
	};
}

const statuses: Statuses = {
	toDo: {
		status: "to do",
		icon: "check-circle-outline",
		color: {
			dark: "light-light",
			light: "dark-medium",
		},
	},
	done: {
		status: "done",
		icon: "check-circle",
		color: {
			dark: "primary-medium",
			light: "primary-medium",
		},
	},
	// @todo: handle these statuses later, only using to do and done for now
	inProgress: {
		status: "in progress",
		icon: "timelapse",
		color: {
			dark: "light-light",
			light: "dark-medium",
		},
	},
	late: {
		status: "late",
		icon: "access-time",
		color: {
			dark: "secondary-medium",
			light: "secondary-medium",
		},
	},
} as const;

export const TaskListItem = ({ task }: IProps) => {
	const width = (screen.window.width * 5) / 6;

	let badgeStyle = statuses.toDo;

	useEffect(() => {
		if (task.status) {
			// @todo: implement custom statuses logic here
			if (task.status.title === "done") {
				badgeStyle = statuses.done;
			} else if (task.status.title === "in progress") {
				badgeStyle = statuses.inProgress;
			} else {
				badgeStyle = statuses.toDo;
			}
		} else {
			badgeStyle = statuses.toDo;
		}
	}, []);

	const onPress = () => {
		// @todo: open taskdetails
		console.log("Would love to know more about this task!");
	};

	return (
		<TouchableOpacity
			onPress={onPress}
			style={{
				...tw`flex-row items-center justify-start bg-light-dark dark:bg-dark-dark rounded-3xl px-2 py-1 my-1`,
				...{ width: width },
			}}
		>
			<View style={tw` flex-row items-center justify-start`}>
				<MaterialIcons
					style={tw`text-3xl px-2 self-start`}
					color={
						tw.prefixMatch("dark")
							? tw.color(badgeStyle.color.dark)
							: tw.color(badgeStyle.color.light)
					}
					name={badgeStyle.icon}
				/>
				<Text style={tw`text-dark-medium dark:text-light-light px-1`}>
					{task.title}
				</Text>
			</View>

			<FlatList
				data={task.users}
				horizontal={true}
				contentContainerStyle={tw`ml-auto`}
				renderItem={({ item }) => (
					<View style={tw`-ml-1`}>
						<UserBadge user={item} withFirstName={false} size={5} />
					</View>
				)}
			/>
		</TouchableOpacity>
	);
};
