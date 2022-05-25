import React, { Fragment, useState } from "react";
import { Task } from "../types";
import UserBadge from "../UserBadge/UserBadge";
import { Dialog, Transition } from '@headlessui/react';


interface TaskCardProps {
	task: Task
}

const TaskCard = ({ task }: TaskCardProps) => {
	const { title, users } = task;
	let [isOpen, setIsOpen] = useState(true)

	function closeModal() {
		setIsOpen(false);
		console.log('coucou close');
	}

	function openModal() {
		setIsOpen(true);
		console.log('coucou open');
	}

	return (
		<>
			<button
				type="button"
				onClick={openModal}
				className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
			>
				<div className="task-holder flex flex-row w-full items-center justify-start px-2 py-1 my-3 bg-light-dark dark:bg-dark-dark rounded-3xl">
					<div className="icon"></div>
					<span className="task-title w-8/12 px-1 flex-nowrap">{title}</span>
					{users && (
						<ul className="ml-auto flex flex-row">
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
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Payment successful
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											Your payment has been successfully submitted. We’ve sent
											you an email with all of the details of your order.
										</p>
									</div>

									<div className="mt-4">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeModal}
										>
											Got it, thanks!
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>)
};

export default TaskCard;
