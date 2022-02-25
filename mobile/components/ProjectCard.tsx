import { Text } from "./Themed";
import { View } from "react-native";
import { ProjectData } from "../customTypes";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import tw from "../lib/tailwind";
import { RootTabScreenProps } from "../types";

interface IProps {
	project: ProjectData;
	navigation: RootTabScreenProps<
		"Home" | "Tasks" | "Projects" | "Profile"
	>["navigation"];
	userId: number;
}

const ProjectCard = ({ project, navigation, userId }: IProps) => {
	const taskCount = project.tasks.length;
	const userCount = project.users.length;
	const halfScreen = (Dimensions.get("window").width * 45) / 100;
	const cardSize = {
		width: halfScreen,
		height: halfScreen,
	};
	const imageSize = {
		width: (halfScreen * 2) / 5,
		height: (halfScreen * 2) / 5,
	};

	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate("ProjectDetail", {
					projectId: project.id,
					userId: userId,
				});
			}}
		>
			<View
				style={{
					...tw`justify-around p-2 m-2 bg-light-dark dark:bg-dark-dark rounded-xl`,
					...cardSize,
				}}
			>
				<Image
					style={{
						...tw`self-center rounded-xl`,
						...imageSize,
					}}
					source={{ uri: project.photo }}
				/>
				<Text style={tw`pt-3 text-lg text-center font-main-bold`}>
					{project.title}
				</Text>
				<View style={tw`flex-row justify-between pt-4`}>
					<Text style={tw`font-main-light`}>
						{taskCount} {taskCount > 1 ? "tasks" : "task"}
					</Text>
					<Text style={tw`font-main-light`}>
						{userCount} {userCount > 1 ? "users" : "user"}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ProjectCard;
