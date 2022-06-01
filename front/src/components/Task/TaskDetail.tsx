import React from "react";
import { Dialog } from "@headlessui/react";
import { Task } from "../types";
import { gql, useMutation } from "@apollo/client";

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
	const {
		title,
		description,
		project,
		start_date,
		end_date,
		status,
		estimated_time,
		effective_time,
		users,
	} = task;
	const [updatedTask, setUpdatedTask] = React.useState(task);

	const [updateTask] = useMutation(UPDATE_TASK);

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setUpdatedTask({ ...updatedTask, [name]: value });
		await updateTask({
			variables: {
				TaskId: task.id,
				updateTaskInput: {
					[name]: value,
				},
			},
			onError: (error) => {
				console.log(error);
			},
			refetchQueries: ["GetAuthorizedUser"],
		});
	};

	console.log(updatedTask);

	return (
		<Dialog.Panel>
			<Dialog.Title
				as="h3"
				className="text-lg font-medium leading-6 text-gray-900"
			>
				<input
					onChange={handleChange}
					value={updatedTask.title}
					name="title"
					className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
					placeholder="Title"
				/>
			</Dialog.Title>
			<div className="mt-2">
				<div className="flex items-center justify-between">
					<div className="flex-1">
						<div className="flex items-center">
							<div className="ml-3">
								<img
									className="mt-2"
									src={project.photo}
									alt="Project picture"
								/>
								<div className="text-sm leading-5 text-gray-900">
									{project.title}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-2">
				<p className="text-sm text-gray-500">{description}</p>
			</div>
			<div className="mt-2">
				<div className="flex items-center">
					<div className="flex-1">
						<div className="flex items-center">
							<div className="ml-3">
								<div className="text-sm leading-5 text-gray-900">
									Start date
								</div>
								<div className="text-sm leading-5 text-gray-900">
									{start_date}
								</div>
							</div>
						</div>
					</div>
					<div className="flex-1">
						<div className="flex items-center">
							<div className="ml-3">
								<div className="text-sm leading-5 text-gray-900">
									End date
								</div>
								<div className="text-sm leading-5 text-gray-900">
									{end_date}
								</div>
							</div>
						</div>
					</div>
					<div className="flex-1">
						<div className="flex items-center">
							<div className="ml-3">
								<div className="text-sm leading-5 text-gray-900">
									Status
								</div>
								<div className="text-sm leading-5 text-gray-900">
									{status?.title}
								</div>
							</div>
						</div>
					</div>
					<div className="flex-1">
						<div className="flex items-center">
							<div className="ml-3">
								<div className="text-sm leading-5 text-gray-900">
									Estimated time
								</div>
								<div className="text-sm leading-5 text-gray-900">
									{estimated_time}
								</div>
							</div>
						</div>
					</div>
					<div className="flex-1">
						<div className="flex items-center">
							<div className="ml-3">
								<div className="text-sm leading-5 text-gray-900">
									Effective time
								</div>
								<div className="text-sm leading-5 text-gray-900">
									{effective_time}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-2">
				<div className="flex items-center">
					<div className="flex-1">
						<div className="flex items-center">
							<div className="ml-3">
								<div className="text-sm leading-5 text-gray-900">
									Users
								</div>
								{users && (
									<div className="text-sm leading-5 text-gray-900">
										{users
											.map((user) => user.firstName)
											.join(", ")}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Dialog.Panel>
	);
};

export default TaskDetail;
