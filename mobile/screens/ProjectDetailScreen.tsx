import { Text } from "../components/Themed";
import { View } from "react-native";
import { RootStackScreenProps } from "../types";
import tw from "../lib/tailwind";
import { FlatList, Image } from "react-native";
import UserBadge from "../components/UserBadge";
import { useLayoutEffect } from "react";
import screen from "../constants/Layout";
import Accordion from "../components/Accordion";
import { TaskListItem } from "../components/TaskListItem";
import { gql, useQuery } from "@apollo/client";
import { ProjectData } from "../customTypes";

export const GET_PROJECT_BY_ID = gql`
	query GetProjectById($projectId: Float!) {
		getProjectById(projectId: $projectId) {
			id
			title
			description
			photo
			start_date
			end_date
			users {
				id
				firstName
				lastName
				email
				avatar
				roles {
					id
					title
				}
			}
			tasks {
				id
				title
				description
				effective_time
				estimated_time
				start_date
				end_date
				status {
					id
					title
				}
				users {
					id
					avatar
					firstName
				}
			}
			roles {
				id
				title
			}
		}
	}
`;

const ProjectDetailScreen = ({
	navigation,
	route,
}: RootStackScreenProps<"ProjectDetail">) => {
	const { projectId, userId } = route.params;

	const { loading, error, data } = useQuery<{ getProjectById: ProjectData }>(
		GET_PROJECT_BY_ID,
		{
			variables: {
				projectId: projectId,
			},
		}
	);

	const { getProjectById: project } = data ?? {};

	const halfScreen = (screen.window.width * 45) / 100;
	const imageSize = {
		width: (halfScreen * 2) / 5,
		height: (halfScreen * 2) / 5,
	};

	useLayoutEffect(() => {
		if (project?.title) {
			navigation.setOptions({ title: project.title });
		}
	}, [project]);

	if (!loading && project) {
		const userTasks = project.tasks.filter(
			(task) => !!task.users.find((user) => user.id === userId)
		);
		const taskCount = project.tasks.length;
		const userCount = project.users.length;
		return (
			<View>
				<View style={tw`mt-9`}>
					<View style={tw`bg-dark-dark mx-2 h-auto rounded-2xl `}>
						<View style={tw`flex-row justify-around`}>
							<Text
								style={tw`text-lg text-center font-main-bold pt-7`}
							>
								Project: {project.title}
							</Text>
							<Image
								style={{
									...tw`rounded-xl mt-4`,
									...imageSize,
								}}
								source={{ uri: project.photo }}
							/>
						</View>
						<Text style={tw`mt-5 text-center`}>
							{project.description}
						</Text>
						<View style={tw`flex-row justify-end mt-8 `}>
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
				</View>
				<View style={tw`items-center`}>
					<Accordion title={"My Tasks"}>
						<FlatList
							data={userTasks}
							horizontal={false}
							renderItem={({ item }) => (
								<TaskListItem task={item} />
							)}
						/>
					</Accordion>
					<Accordion title={"Project Tasks"}>
						<FlatList
							data={project.tasks}
							horizontal={false}
							renderItem={({ item }) => (
								<TaskListItem task={item} />
							)}
						/>
					</Accordion>
				</View>
			</View>
		);
	} else if (error) {
		return <Text>{error}</Text>;
	} else {
		return <Text>LOADING</Text>;
	}
};

export default ProjectDetailScreen;
