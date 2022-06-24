import React, {
	ChangeEvent,
	DOMElement,
	useEffect,
	useRef,
	useState,
} from "react";
import { BackBonesUser, Status, Task } from "../types";
import { gql, useMutation } from "@apollo/client";
import DropdownUsers from "../utils/DropdownUsers";
import Button from "../utils/Button";
import internal from "stream";
import Dropdown from "../utils/Dropdown";
import DropdownStatuses from "../utils/DropdownStatuses";

const UPDATE_TASK = gql`
	mutation UpdateTask($TaskId: Float!, $updateTaskInput: UpdateTaskInput) {
		updateTask(taskId: $TaskId, updateTaskInput: $updateTaskInput) {
			id
		}
	}
`;

interface TaskDetailProps {
	task: Task;
}

const TaskDetail = ({ task }: TaskDetailProps) => {
	const [isModify, setIsModify] = useState(false);
	const [taskToUpdate, setTaskToUpdate] = useState(task);

	const [updateTask, { loading, error }] = useMutation(UPDATE_TASK);

	const handleUpdate = async () => {
		await updateTask({
			variables: {
				TaskId: taskToUpdate.id,
				updateTaskInput: {
					title: taskToUpdate.title,
					description: taskToUpdate.description,
					status: { id: taskToUpdate.status?.id },
					start_date: taskToUpdate.start_date,
					end_date: taskToUpdate.end_date,
					estimated_time: taskToUpdate.estimated_time,
					effective_time: taskToUpdate.effective_time,
				},
			},
			refetchQueries: ["GetAuthorizedUser"],
			onError: (error) => {
				console.log(error);
			},
		});
	};

	console.log(task);

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setTaskToUpdate({
			...taskToUpdate,
			[event.target.name]: event.target.value,
		});
		setIsModify(true);
		console.log(taskToUpdate);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		console.log(isModify);
		e.preventDefault();
		if (isModify) {
			await handleUpdate();
			setIsModify(false);
		}
	};

	const updateTaskUsers = async (user: BackBonesUser) => {
		console.log("updateTaskUsers");
		await updateTask({
			variables: {
				TaskId: task.id,
				updateTaskInput: {
					users: [{ id: user?.id }],
				},
			},
			onError: (error) => {
				console.log(error);
			},
			refetchQueries: ["GetAuthorizedUser"],
		});
	};

	const updateStatus = async (status: Status) => {
		console.log("updateStatus");
		console.log(task.project?.id);
		await updateTask({
			variables: {
				TaskId: task.id,
				updateTaskInput: {
					status: { id: status?.id },
				},
			},
			onError: (error) => {
				console.log(error);
			},
			refetchQueries: ["GetAuthorizedUser"],
		});
	};
	console.log("task", task);

	// @ts-ignore
	// @ts-ignore
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="title-input">
					<input
						autoFocus={true}
						type="text"
						style={{
							maxWidth: 0,
							maxHeight: 0,
							overflow: "hidden",
						}}
					/>
					<input
						id="title"
						name="title"
						type="text"
						onChange={handleChange}
						className="text-lg font-main-light text-dark-darker focus:outline-none w-full truncate"
						value={taskToUpdate.title}
					/>
				</div>
				<div className="description-input">
					<textarea
						id="description"
						name="description"
						onChange={handleChange}
						className="text-sm font-main-light text-dark-darker outline-none focus:outline-primary-medium w-full h-24"
						value={taskToUpdate.description}
					/>
				</div>
			</form>
			<div className="flex justify-end">
				<div className="status-input">
					{task.status && task.project.statuses && (
						<DropdownStatuses
							updateStatus={updateStatus}
							title={"Statuses"}
							projectStatuses={task.project.statuses}
							taskStatus={task.status}
						/>
					)}
				</div>
				<div className="user-input text-sm">
					{task.project.users && task.users ? (
						<DropdownUsers
							title="Assigned Users"
							projectUsers={task.project?.users}
							taskUsers={task.users}
							updateUsers={updateTaskUsers}
						/>
					) : (
						<div>No users</div>
					)}
				</div>
			</div>
			<div className="buttons">
				<Button
					label="Save"
					state={isModify ? "enabled" : "disabled"}
					onClick={(e: React.FormEvent<HTMLFormElement>) =>
						handleSubmit(e)
					}
				/>
			</div>
		</div>
	);
};

export default TaskDetail;
