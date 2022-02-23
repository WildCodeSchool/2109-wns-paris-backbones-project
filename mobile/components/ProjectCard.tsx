import { Text, View } from "./Themed";
import { ProjectData } from "../types/index";
import { Image } from "react-native";
import tw from "../lib/tailwind";

interface IProps {
	project: ProjectData;
}

const ProjectCard = ({ project }: IProps) => {
	const taskCount = project.tasks.length;
	const userCount = project.users.length;

	return (
		<View
			style={tw`bg-dark-transparent p-4 rounded-xl h-45 m-3 w-45 justify-center`}
		>
			<Image
				style={tw`w-3/5 h-20 rounded-xl self-center`}
				source={{ uri: project.photo }}
			/>
			<View style={tw`place-items-center`}>
				<Text
					style={tw`bg-dark-transparent font-main-bold text-lg pt-3 text-center`}
				>
					{project.title}
				</Text>
				<View
					style={tw`flex-row bg-dark-transparent justify-between pt-4`}
				>
					<Text style={tw`font-main-light`}>
						{taskCount} {taskCount > 1 ? "tasks" : "task"}
					</Text>
					<Text style={tw`font-main-light`}>
						{userCount} {userCount > 1 ? "users" : "user"}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default ProjectCard;
