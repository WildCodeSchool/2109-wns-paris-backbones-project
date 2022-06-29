import React, { useEffect, useRef, useState } from "react";
import { Project } from "../types";
import { Disclosure, Transition } from "@headlessui/react";
import { Close, Settings } from "@material-ui/icons";
import ProgressBar from "../utils/ProgressBar";
import UserBadge from "../UserBadge/UserBadge";
import { TasksList } from "../Task/TasksList";
import AddOutlined from "@material-ui/icons/AddOutlined";

interface ProjectDetailProps {
	project: Project;
	close: () => void;
}

const ProjectDetail = ({ project, close }: ProjectDetailProps) => {
	const [progress, setProgress] = useState(0);
	const [buttonClicked, setButtonClicked] = useState(false);
	const iconAddTask = useRef<HTMLDivElement>(null);
	const { tasks, users, title, description } = project;

	useEffect(() => {
		const tasksDone = tasks
			? tasks.filter(
					(task) => task.status && task.status.title === "done"
			  ).length
			: 0;
		const tasksTotal = tasks ? tasks.length : 0;
		setProgress((tasksDone / tasksTotal) * 100);
	}, [tasks]);

	useEffect(() => {
		if (iconAddTask.current) {
			iconAddTask.current.style.transform = buttonClicked
				? "rotate(45deg)"
				: "rotate(0deg)";
		}
	}, [buttonClicked]);

	return (
		<div className="project-detail-card p-4">
			<div className="project-controls flex justify-between">
				<button className="project-settings">
					<Settings className="text-primary-medium" />
					<span className="font-main-extralight px-4">Settings</span>
				</button>
				<button className="project-close" onClick={close}>
					<Close />
				</button>
			</div>
			<div className="project-header w-full mt-3 justify-between">
				<div className="project-header-title-progress flex justify-between">
					<div className="project-title w-1/2">
						<h1 className="font-main-bold text-xl">
							{title} ouais ouais t’as vu super projet ouais ouais
							t’as vu super projet
						</h1>
					</div>
					<div className="project-progress-bar">
						<ProgressBar progress={progress} />
					</div>
				</div>
				<div className="project-description mt-4">
					<p className="text-sm">{description}</p>
				</div>
				<div className="project-infos flex justify-end mt-4 font-main-extralight text-sm">
					<div className="project-tasks-count mr-3">
						<span>
							{tasks
								? `${tasks.length} tasks`
								: "No tasks on this project"}{" "}
						</span>
					</div>
					<div className="project-members-count">
						<span>
							{users
								? `${users.length} users`
								: "No users on this project"}{" "}
						</span>
					</div>
				</div>
				<div className="project-members flex justify-end">
					{users &&
						users.map((user) => (
							<div className="ml-2">
								<UserBadge
									user={user}
									key={user.id}
									size="small"
									withFirstName={false}
								/>
							</div>
						))}
				</div>
			</div>
			<div className="project-tasks">
				<Disclosure>
					<Disclosure.Button
						onClick={() => setButtonClicked(!buttonClicked)}
					>
						<div className="project-tasks-add flex items-center">
							<div ref={iconAddTask}>
								<AddOutlined
									className="text-primary-medium"
									fontSize="large"
								/>
							</div>
							<span className="font-main-bold px-4">
								New Task
							</span>
						</div>
					</Disclosure.Button>
					<Transition
						enter="transition duration-100 ease-out"
						enterFrom="transform scale-95 opacity-0"
						enterTo="transform scale-100 opacity-100"
						leave="transition duration-75 ease-out"
						leaveFrom="transform scale-100 opacity-100"
						leaveTo="transform scale-95 opacity-0"
					>
						<Disclosure.Panel>BLA BLA BLA BLA</Disclosure.Panel>
					</Transition>
				</Disclosure>
				<div className="project-tasks-list bg-dark-darker rounded-2xl">
					{tasks ? <TasksList tasks={tasks} /> : "No tasks yet"}
				</div>
			</div>
		</div>
	);
};

export default ProjectDetail;
