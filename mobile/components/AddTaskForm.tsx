import React, { useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { TextInput, View, Text, Button } from "react-native";
import tw from "../lib/tailwind";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { BackBonesUser, Project, Status, TaskInput } from "../customTypes";
import DropdownUsers from "./DropdownUsers";
import DropdownStatus from "./DropdownStatus";

const ADD_TASK = gql`
	mutation AddTask($createTaskInput: CreateTaskInput!) {
		addTask(createTaskInput: $createTaskInput) {
			id
		}
	}
`;

interface AddTaskFormProps {
	project: Project;
}

export default function AddTaskForm({ project }: AddTaskFormProps) {
	const [taskToAdd, setTaskToAdd] = useState<TaskInput>({});

	const [addTask] = useMutation(ADD_TASK);

	useEffect(() => {
		console.log("task to add", taskToAdd);
	}, [taskToAdd]);

	const handleAdd = async () => {
		await addTask({
			variables: {
				createTaskInput: {
					title: taskToAdd.title,
					description: taskToAdd.description,
					status: taskToAdd.status,
					start_date: taskToAdd.start_date,
					end_date: taskToAdd.end_date,
					estimated_time: taskToAdd.estimated_time,
					effective_time: taskToAdd.effective_time,
					users: taskToAdd.users,
					project: { id: project.id },
				},
			},
			refetchQueries: ["GetProjectById"],
			onError: (error) => {
				console.log(error);
			},
		});
	};

	const handleUsersChange = (users: BackBonesUser[]) => {
		setTaskToAdd({
			...taskToAdd,
			users: users.map((user) => {
				return { id: user.id };
			}),
		});
	};

	const handleStatusChange = (statuses: Status) => {
		setTaskToAdd({
			...taskToAdd,
			status: { id: statuses.id },
		});
	};

	return (
		<View style={tw`w-full`}>
			<View>
				<Text style={tw`text-light-light ml-3`}>Title</Text>
				<TextInput
					style={tw`w-full dark:text-dark-dark bg-light-light p-3 rounded-2xl`}
					placeholder="Enter title"
					onChangeText={(text) =>
						setTaskToAdd({ ...taskToAdd, title: text })
					}
				/>
				<Text style={tw`text-light-light ml-3 mt-4`}>Description</Text>
				<TextInput
					style={tw`w-full dark:text-dark-dark bg-light-light p-3 rounded-2xl`}
					placeholder="Enter description"
					onChangeText={(text) =>
						setTaskToAdd({ ...taskToAdd, description: text })
					}
				/>
				<View style={tw`mt-4 flex-row justify-around`}>
					<View>
						<Text style={tw`text-light-light`}>Start Date: </Text>
						<RNDateTimePicker
							style={tw`w-30`}
							value={
								taskToAdd.start_date
									? new Date(taskToAdd.start_date)
									: new Date()
							}
							onChange={(event, date) =>
								setTaskToAdd({
									...taskToAdd,
									start_date: date?.toISOString(),
								})
							}
						/>
					</View>
					<View>
						<Text style={tw`text-light-light`}>End Date: </Text>
						<RNDateTimePicker
							style={tw`w-30`}
							value={
								taskToAdd.end_date
									? new Date(taskToAdd.end_date)
									: new Date()
							}
							minimumDate={
								taskToAdd.start_date
									? new Date(taskToAdd.start_date)
									: new Date()
							}
							onChange={(event, date) =>
								setTaskToAdd({
									...taskToAdd,
									end_date: date?.toISOString(),
								})
							}
						/>
					</View>
				</View>
				{project.users && (
					<View style={tw`mt-4`}>
						<DropdownUsers
							users={project.users}
							onChange={handleUsersChange}
						/>
					</View>
				)}
				{project.statuses && (
					<View style={tw`mt-4`}>
						<DropdownStatus
							statuses={project.statuses}
							onChange={handleStatusChange}
						/>
					</View>
				)}
			</View>
			<View>
				<Button title="Add Task" onPress={handleAdd} />
			</View>
		</View>
	);
}
