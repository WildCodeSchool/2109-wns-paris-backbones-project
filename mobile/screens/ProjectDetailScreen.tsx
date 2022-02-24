import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";
import tw from "../lib/tailwind";
import { Dimensions, FlatList, Image } from "react-native";
import UserBadge from "../components/UserBadge";

const ProjectDetailScreen = ({
	route,
}: RootStackScreenProps<"ProjectDetail">) => {
	const { project } = route.params;
	const taskCount = project.tasks.length;
	const userCount = project.users.length;
	const cardWidth = (Dimensions.get("window").width * 45) / 100;
	const imageSize = {
		width: (cardWidth * 2) / 5,
		height: (cardWidth * 2) / 5,
	};

	return (
		<>
			<View style={tw`bg-dark-dark mx-2 h-50 rounded-2xl`}>
				<View style={tw`bg-dark-dark flex-row justify-around`}>
					<Text
						style={tw`text-lg text-center bg-dark-dark font-main-bold pt-7`}
					>
						{project.title}
					</Text>
					<Image
						style={{
							...tw`rounded-xl mt-4`,
							...imageSize,
						}}
						source={{ uri: project.photo }}
					/>
				</View>
				<Text style={tw`mt-5 text-center`}>{project.description}</Text>
				<View style={tw`flex-row justify-end mt-8 bg-dark-dark`}>
					<Text style={tw`font-main-light`}>
						{taskCount} {taskCount > 1 ? "tasks" : "task"}
					</Text>
					<Text style={tw`font-main-light mx-5`}>
						{userCount} {userCount > 1 ? "users" : "user"}
					</Text>
				</View>
			</View>
			<FlatList
				data={project.users}
				horizontal
				inverted
				renderItem={({ item }) => (
					<View style={tw`mx-2 mt-3`}>
						<UserBadge user={item} />
					</View>
				)}
			/>
		</>
	);
};

export default ProjectDetailScreen;
