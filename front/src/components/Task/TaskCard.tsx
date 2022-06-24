import React, { Fragment, useState } from "react";
import { Task } from "../types";
import UserBadge from "../UserBadge/UserBadge";
import { Dialog, Transition } from "@headlessui/react";
import TaskDetail from "../Task/TaskDetail";
import { gql, useMutation } from "@apollo/client";

const DELETE_TASK_MUTATION = gql`
	mutation DeleteTask($taskId: Float!) {
		deleteTask(taskId: $taskId)
	}
`;

interface TaskCardProps {
	task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
	const { title, users, description } = task;
	let [isOpen, setIsOpen] = useState(false);

	const [deleteTask, { loading, error }] = useMutation(DELETE_TASK_MUTATION);

	const handleDelete = async () => {
		await deleteTask({
			variables: { taskId: task.id },
			refetchQueries: ["GetAuthorizedUser"],
		});
	};

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	return (
		<>
			<button
				type="button"
				onClick={openModal}
				className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
			>
				<div className="flex flex-row items-center justify-start w-full px-2 py-1 my-3 task-holder bg-light-dark dark:bg-dark-dark rounded-3xl">
					<div className="icon"></div>
					<span className="w-8/12 px-1 task-title flex-nowrap">
						{title}
					</span>
					{users && (
						<ul className="flex flex-row ml-auto">
							{users.map((user) => (
								<UserBadge
									key={user.id}
									user={user}
									withFirstName={false}
									size={"small"}
								/>
							))}
						</ul>
					)}
				</div>
			</button>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-full p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full h-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
									<TaskDetail task={task} />
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

export default TaskCard;
