import React, { useEffect, useState } from "react";
import { Project } from "../types";
import ProgressBar from "../utils/ProgressBar";
import UserBadge from "../UserBadge/UserBadge";
import { TasksList } from "../Task/TasksList";
import AddAccordion from "../utils/AddAccordion";
import Counter from "../utils/Counter";
import AddTaskForm from "../Form/AddTaskForm";

interface ProjectDetailProps {
	project: Project;
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
	const [progress, setProgress] = useState(0);
	const { tasks, users, title, description } = project;

	useEffect(() => {
		const tasksDone = tasks
			? tasks.filter((task) => task.status && task.status.isDoneStatus)
					.length
			: 0;
		const tasksTotal = tasks ? tasks.length : 0;
		setProgress(Math.floor((tasksDone / tasksTotal) * 100));
	}, [tasks]);

	return (
		<div className="project-detail-card mb-4">
			<div className="project-header w-full mt-3 justify-between">
				<div className="project-header-title-progress flex flex-col lg:flex-row justify-between gap-4">
					<div className="project-title w-1/2">
						<h1 className="font-main-bold text-xl">{title}</h1>
					</div>
					<div className="project-progress-bar w-full lg:w-1/3">
						<ProgressBar progress={progress} />
					</div>
				</div>
				<div className="project-description mt-4">
					<p className="text-sm">{description}</p>
				</div>
				<div className="project-infos flex justify-end mt-4 font-main-extralight text-sm">
					<div className="project-tasks-count mr-3">
						<Counter count={tasks?.length} unit={"task"} />
					</div>
					<div className="project-members-count">
						<Counter count={users?.length} unit={"user"} />
					</div>
				</div>
				<div className="project-members flex justify-end">
					{users &&
						users.map((user) => (
							<div className="ml-2" key={user.id}>
								<UserBadge
									user={user}
									size="small"
									withFirstName={false}
								/>
							</div>
						))}
				</div>
			</div>
			<div className="project-tasks">
				<AddAccordion title={"New Task"}>
					<AddTaskForm project={project} />
				</AddAccordion>
				<div className="project-tasks-list bg-dark-darker rounded-2xl">
					{tasks ? <TasksList tasks={tasks} /> : "No tasks yet"}
				</div>
			</div>
		</div>
	);
};

export default ProjectDetail;
