import { Text } from "../components/Themed";
import { View } from "react-native";
import { RootStackScreenProps } from "../types";
import tw from "../lib/tailwind";
import { FlatList } from "react-native";
import UserBadge from "../components/UserBadge";
import { useLayoutEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { TaskData } from "../customTypes";
import StatusIcon from "../components/StatusIcon";
import { format } from "date-fns";
import { Btn } from "../components/Btn";

export const GET_TASK_BY_ID = gql`
	query GetTaskById($taskId: Float!) {
		getTaskById(taskId: $taskId) {
			id
			title
			description
			effective_time
			estimated_time
			start_date
			end_date
			status {
				title
			}
			users {
				id
				firstName
				lastName
				avatar
				email
				roles {
					id
					title
				}
			}
			project {
				id
				title
			}
		}
	}
`;

const TaskDetailScreen = ({
	navigation,
	route,
}: RootStackScreenProps<"TaskDetail">) => {
	const { taskId, userId } = route.params;

	const { loading, error, data } = useQuery<{ getTaskById: TaskData }>(
		GET_TASK_BY_ID,
		{
			variables: {
				taskId: taskId,
			},
		}
	);

	const { getTaskById: task } = data ?? {};

	useLayoutEffect(() => {
		if (task?.title) {
			navigation.setOptions({ title: task.title });
		}
	}, [task]);

	if (!loading && task) {
		const userCount = task.users.length;
		return (
			<View>
				<View style={tw`mt-9`}>
					<View
						style={tw`h-auto px-5 mx-2 bg-dark-dark text-light-dark pt-7 rounded-2xl`}
					>
						<View style={tw`flex-row items-center `}>
							<StatusIcon task={task} />
							<Text
								style={tw`ml-4 text-lg text-left font-main-bold`}
							>
								To do before
								{` ${format(
									new Date(task.end_date),
									"dd/MM/yy"
								)}`}
							</Text>
						</View>
						<View
							style={tw`flex-row items-center justify-between mt-5 `}
						>
							<Text
								style={tw`text-left font-main-light text-light-dark `}
							>
								Created :
								{` ${format(
									new Date(task.start_date),
									"dd/MM/yy"
								)}`}
							</Text>
							<Text
								numberOfLines={1}
								style={tw`w-7/12 text-left text-right text-light-dark`}
							>
								In project
								{` ${
									(
										task as unknown as {
											project: { title: string };
										}
									).project.title
								}`}
							</Text>
						</View>
						<Text style={tw`mt-5 text-left`}>
							{task.description}
						</Text>
						<View style={tw`flex-row my-7 `}>
							<Btn
								content="Edit task"
								buttonType="enabled"
								onPress={() =>
									console.log(`Task ${task.title} edited !`)
								}
							/>
						</View>
					</View>
					<View
						style={tw`flex-row items-center justify-between mx-2`}
					>
						<Text style={tw`text-light-light`}>
							In charge ({userCount})
						</Text>
						<FlatList
							data={task.users}
							horizontal
							inverted
							renderItem={({ item }) => (
								<View
									key={`userBadge${item.id}`}
									style={tw`mx-2 mt-3`}
								>
									<UserBadge user={item} />
								</View>
							)}
						/>
					</View>
				</View>
			</View>
		);
	} else if (error) {
		console.log(error);
		return <Text>error</Text>;
	} else {
		return <Text>LOADING</Text>;
	}
};

export default TaskDetailScreen;
