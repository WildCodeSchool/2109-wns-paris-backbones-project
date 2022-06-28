import React, { Fragment, useState } from "react";
import { Task } from "../types";
import UserBadge from "../UserBadge/UserBadge";
import { Dialog, Transition } from "@headlessui/react";
import TaskDetail from "../Task/TaskDetail";

interface TaskCardProps {
	task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
	const { title, users } = task;
	let [isOpen, setIsOpen] = useState(false);

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
				className="w-8/12 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
			>
				<div className="flex flex-row items-center justify-center w-full px-2 py-1 my-2 task-holder bg-light-dark dark:bg-dark-dark rounded-3xl">
					<div className="icon"></div>
					<span className="px-1 task-title">{title}</span>
					{users && (
						<ul className="flex flex-row ml-auto mr-2">
							{users.map((user) => (
								<li className="-ml-2">
									<UserBadge
										key={user.id}
										user={user}
										withFirstName={false}
										size={"small"}
									/>
								</li>
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
						<div className="flex items-center justify-center h-full p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-8/12 h-5/6 p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
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
