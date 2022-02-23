import { Text, View } from "./Themed";
import { ProjectData } from "../types/index";
import { Dimensions, Image } from "react-native";
import tw from "../lib/tailwind";

interface IProps {
	project: ProjectData;
}

const ProjectCard = ({ project }: IProps) => {
	const taskCount = project.tasks.length;
	const userCount = project.users.length;
	const cardWidth = (Dimensions.get("window").width * 45) / 100;
	const imageWidth = (cardWidth * 2) / 5;

	return (
		<View
			style={{
				...tw`justify-center p-2 m-2 bg-dark-dark rounded-xl`,
				...{
					width: cardWidth,
					height: cardWidth,
				},
			}}
		>
			<Image
				style={{
					...tw`self-center  rounded-xl`,
					...{
						width: imageWidth,
						height: imageWidth,
					},
				}}
				source={{ uri: project.photo }}
			/>
			<View>
				<Text
					style={tw`pt-3 text-lg text-center bg-dark-dark font-main-bold`}
				>
					{project.title}
				</Text>
				<View style={tw`flex-row justify-between pt-4 bg-dark-dark`}>
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
