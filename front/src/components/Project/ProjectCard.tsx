import React, { Fragment, useEffect, useState } from "react";
import { Project } from "../types";
import { Dialog, Transition } from "@headlessui/react";
import ProjectDetail from "./ProjectDetail";

interface ProjectCardProps {
	project: Project;
}
function ProjectCard({ project }: ProjectCardProps) {
	const [taskCount, setTaskCount] = useState(0);
	const [userCount, setUserCount] = useState(0);
	const [isOpen, setIsOpen] = useState(false);

	function closeModal() {
		setIsOpen(false);
	}

	function openModal() {
		setIsOpen(true);
	}

	useEffect(() => {
		project.tasks && setTaskCount(project.tasks.length);
		project.users && setUserCount(project.users.length);
	}, [project.tasks, project.users]);

	return (
		<>
			<button
				className="project-card  p-4 m-4 bg-light-dark dark:bg-dark-dark rounded-xl lg:w-1/5 flex flex-col items-center justify-center"
				onClick={openModal}
			>
				<div className="flex flex-col items-center ">
					<img
						className="project-card-image rounded-xl w-4/12 aspect-square"
						src={project.photo}
						alt={project.title}
					/>
					<span className="pt-3 text-lg text-center font-main-bold">
						{project.title}
					</span>
					<div className="pt-4 w-full flex justify-around text-sm font-main-extralight">
						<span>
							{taskCount} {taskCount > 1 ? "tasks" : "task"}
						</span>
						<span>
							{userCount} {userCount > 1 ? "users" : "user"}
						</span>
					</div>
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
								<Dialog.Panel className="w-8/12 h-5/6 p-6 overflow-hidden text-left align-middle transition-all dark:bg-dark-dark  transform  shadow-xl rounded-2xl">
									<ProjectDetail
										project={project}
										close={closeModal}
									/>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

export default ProjectCard;
