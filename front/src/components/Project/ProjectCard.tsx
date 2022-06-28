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

	return (
		<div className="project-card  p-4 m-4 bg-light-dark dark:bg-dark-dark rounded-xl lg:w-1/5 flex flex-col items-center justify-center">
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
		</div>
	);
}

export default ProjectCard;
