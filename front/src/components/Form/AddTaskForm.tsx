import React, { useState } from "react";
import FormTitleInput from "./FormElements/FormTitleInput";
import FormTextInput from "./FormElements/FormTextInput";
import DropdownStatuses from "../utils/DropdownStatuses";
import { BackBonesUser, Project, Status, TaskInput } from "../types";
import DropdownUsers from "../utils/DropdownUsers";
import FormDateInput from "./FormElements/FormDateInput";
import Duration from "../utils/Duration";
import Button from "../utils/Button";
import { gql, useMutation } from "@apollo/client";

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

const AddTaskForm = ({ project }: AddTaskFormProps) => {
	const [taskToAdd, setTaskToAdd] = useState<TaskInput>({});

	const [addTask] = useMutation(ADD_TASK);

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
			refetchQueries: ["GetAuthorizedUser"],
			onError: (error) => {
				console.log(error);
			},
		});
	};

	const handleChangeInput = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setTaskToAdd({
			...taskToAdd,
			[event.target.name]: event.target.value,
		});
	};

	const handleChangeDate = (date: string, name: string) => {
		setTaskToAdd({
			...taskToAdd,
			[name]: date,
		});
	};

	const addStatus = (status: Status) => {
		setTaskToAdd({
			...taskToAdd,
			status: { id: status.id },
		});
	};

	const addUsers = (user: BackBonesUser) => {
		if (taskToAdd.users && taskToAdd.users.find((u) => u.id === user.id)) {
			setTaskToAdd({
				...taskToAdd,
				users: taskToAdd.users.filter((u) => u.id !== user.id),
			});
		} else if (taskToAdd.users) {
			setTaskToAdd({
				...taskToAdd,
				users: [...taskToAdd.users, { id: user.id }],
			});
		} else {
			setTaskToAdd({
				...taskToAdd,
				users: [{ id: user.id }],
			});
		}
	};

	return (
		<div className="p-4 w-full">
			<FormTitleInput
				label="Title"
				value=""
				onChange={handleChangeInput}
			/>
			<FormTextInput
				label="Description"
				value=""
				onChange={handleChangeInput}
			/>
			<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
				<div className="w-full lg:w-1/3 flex flex-col gap-2 lg:gap-1">
					{project.statuses && (
						<DropdownStatuses
							updateStatus={addStatus}
							title="Add task status"
							projectStatuses={project.statuses}
							taskStatus={taskToAdd.status}
						/>
					)}
					{project.users && (
						<DropdownUsers
							title="Assign task to"
							projectUsers={project.users}
							taskUsers={taskToAdd.users}
							updateUsers={addUsers}
						/>
					)}
				</div>
				<div className="flex flex-col h-auto justify-around gap-2 lg:gap-1">
					<FormDateInput
						label={"Start date"}
						onChange={handleChangeDate}
						name="start_date"
					/>
					<FormDateInput
						label={"End date"}
						onChange={handleChangeDate}
						name="end_date"
					/>
				</div>
				<Duration
					start={taskToAdd.start_date}
					end={taskToAdd.end_date}
					label="Estimated time"
				/>
			</div>
			<div className="buttons flex w-full justify-center mt-2">
				<Button label={"Save"} state="enabled" onClick={handleAdd} />
			</div>
		</div>
	);
};

export default AddTaskForm;
