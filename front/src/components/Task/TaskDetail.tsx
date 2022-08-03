import React, { useState } from "react";
import { BackBonesUser, Status, Task } from "../types";
import { gql, useMutation } from "@apollo/client";
import DropdownUsers from "../utils/DropdownUsers";
import Button from "../utils/Button";
import DropdownStatuses from "../utils/DropdownStatuses";
import FormDateInput from "../Form/FormElements/FormDateInput";
import Duration from "../utils/Duration";

const DELETE_TASK_MUTATION = gql`
	mutation DeleteTask($taskId: Float!) {
		deleteTask(taskId: $taskId)
	}
`;

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

	const [updateTask] = useMutation(UPDATE_TASK);
	const [deleteTask] = useMutation(DELETE_TASK_MUTATION);

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

	const handleDelete = async () => {
		await deleteTask({
			variables: { taskId: task.id },
			refetchQueries: ["GetAuthorizedUser"],
		});
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setTaskToUpdate({
			...taskToUpdate,
			[event.target.name]: event.target.value,
		});
		setIsModify(true);
	};

	const handleChangeDate = async (date: string, name: string) => {
		await updateTask({
			variables: {
				TaskId: taskToUpdate.id,
				updateTaskInput: {
					[name]: date,
				},
			},
			onError: (error) => {
				console.log(error);
			},
			refetchQueries: ["GetAuthorizedUser"],
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isModify) {
			await handleUpdate();
			setIsModify(false);
		}
	};

	const updateTaskUsers = async (user: BackBonesUser) => {
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

	return (
		<div className="card-detail flex flex-col">
			<form
				onSubmit={handleSubmit}
				className={"flex flex-col gap-4 mb-4"}
			>
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
						className="text-xl dark:bg-dark-dark font-main-bold focus:outline-none w-full truncate"
						value={taskToUpdate.title}
					/>
					<span className="text-sm">
						Project: {task.project.title}
					</span>
				</div>
				<div className="description-input">
					<textarea
						id="description"
						name="description"
						onChange={handleChange}
						className="text-sm dark:bg-dark-dark font-main-light outline-none focus:outline-primary-medium w-full h-24"
						value={taskToUpdate.description}
					/>
				</div>
			</form>
			<div className="task-infos flex flex-col lg:flex-row gap-4 justify-between mb-4">
				<div className="task-users-status flex flex-col lg:w-1/3 gap-4">
					<div className="task-users flex flex-col gap-1">
						<div className="task-status-title">
							Status: {task.status?.title}
						</div>
						<div className="status-status-input">
							{task.status && task.project.statuses && (
								<DropdownStatuses
									updateStatus={updateStatus}
									title={"Select a status"}
									projectStatuses={task.project.statuses}
									taskStatus={task.status}
								/>
							)}
						</div>
					</div>
					<div className="task-users flex flex-col gap-1">
						<div className="task-users-firstname flex gap-4">
							Users:
							{task.users &&
								task.users.length > 0 &&
								task.users.map((user) => (
									<span
										className="task-user-firstname"
										key={user.id}
									>
										{user.firstName}
									</span>
								))}
						</div>
						<div className="task-user-input text-sm">
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
				</div>
				<div className="task-dates flex flex-col gap-4">
					<div className="task-start-date">
						<FormDateInput
							label={"Start Date"}
							onChange={handleChangeDate}
							name={"start_date"}
							date={
								taskToUpdate.start_date
									? new Date(taskToUpdate.start_date)
									: undefined
							}
						/>
					</div>
					<div className="task-end-date">
						<FormDateInput
							label={"End Date"}
							onChange={handleChangeDate}
							name={"end_date"}
							date={
								taskToUpdate.end_date
									? new Date(taskToUpdate.end_date)
									: undefined
							}
						/>
					</div>
				</div>
				<div className="task-duration">
					{task.start_date && task.end_date && (
						<Duration
							label={"Estimated Time"}
							start={task.start_date}
							end={task.end_date}
						/>
					)}
					{task.effective_date && (
						<Duration
							label={"Effective Time"}
							fixValue={task.effective_date}
						/>
					)}
				</div>
			</div>
			<div className="buttons flex justify-center gap-20">
				<Button
					label="Save"
					state={isModify ? "enabled" : "disabled"}
					onClick={(e: React.FormEvent<HTMLFormElement>) =>
						handleSubmit(e)
					}
				/>
				<Button label="Delete" state="danger" onClick={handleDelete} />
			</div>
		</div>
	);
};

export default TaskDetail;
