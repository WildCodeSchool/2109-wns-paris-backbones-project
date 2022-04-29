import React, { useEffect, useState } from "react";
import { Project } from "../types";

interface ProjectCardProps {
	project: Project;
}
function ProjectCard({ project }: ProjectCardProps) {
	const [taskCount, setTaskCount] = useState(0);
	const [userCount, setUserCount] = useState(0);

	useEffect(() => {
		project.tasks && setTaskCount(project.tasks.length);
		project.users && setUserCount(project.users.length);
	}, [project.tasks, project.users]);

	console.log(project);

	return (
		<div className="project-card p-2 m-2 bg-light-dark dark:bg-dark-dark rounded-xl w-4/12 flex flex-col items-center justify-center">
			<img
				className="project-card-image rounded-xl  w-1/2"
				src={project.photo}
				alt={project.title}
			/>
			<span className="pt-3 text-lg text-center font-main-bold dark:text-light-light">
				{project.title}
			</span>
			<div className="flex gap-96 pt-4 font-main-light dark:text-light-light">
				<span>
					{taskCount} {taskCount > 1 ? "tasks" : "task"}
				</span>
				<span>
					{userCount} {userCount > 1 ? "users" : "user"}
				</span>
			</div>
		</div>
	);
}

export default ProjectCard;
