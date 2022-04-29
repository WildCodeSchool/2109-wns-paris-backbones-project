import React, { useEffect, useState } from "react";
import { Project } from "../types";

interface ProjectCardSmallProps {
	project: Project;
}
function ProjectCardSmall({ project }: ProjectCardSmallProps) {
	const [taskCount, setTaskCount] = useState(0);
	const [userCount, setUserCount] = useState(0);

	useEffect(() => {
		setTaskCount(project.tasks.length);
		setUserCount(project.users.length);
	}, [project.tasks, project.users]);

	console.log(project);

	return (
		<div className="project-card-small">
			<div className="project-card-small-image">
				<img src={project.photo} alt={project.title} />
			</div>
			<div className="project-card-small-title">{project.title}</div>
			<div>
				<span>
					{taskCount} {taskCount > 1 ? "tasks" : "task"}
				</span>
				<span>
					{userCount} {userCount > 1 ? "users" : "user"}
				</span>
			</div>
			<div className="project-card-small-description">
				{project.description}
			</div>
		</div>
	);
}
