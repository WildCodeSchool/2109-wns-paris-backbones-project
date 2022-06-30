import React, { useState } from "react";
import FormTitleInput from "./FormElements/FormTitleInput";
import FormTextInput from "./FormElements/FormTextInput";
import DropdownStatuses from "../utils/DropdownStatuses";
import { BackBonesUser, Project, Status, TaskInput } from "../types";
import DropdownUsers from "../utils/DropdownUsers";

interface AddTaskFormProps {
	project: Project;
}

const AddTaskForm = ({ project }: AddTaskFormProps) => {
	const [taskToAdd, setTaskToAdd] = useState<TaskInput>({});

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setTaskToAdd({
			...taskToAdd,
			[event.target.name]: event.target.value,
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
			<FormTitleInput label="Title" value="" onChange={handleChange} />
			<FormTextInput
				label="Description"
				value=""
				onChange={handleChange}
			/>
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
	);
};

export default AddTaskForm;
