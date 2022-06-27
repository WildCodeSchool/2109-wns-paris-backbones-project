import React, { useEffect, useState } from "react";
import { Task } from "../types";
import TaskCard from "../Task/TaskCard";
import Dropdown from "../utils/Dropdown";

export const TasksList = ({ tasks }: { tasks: Task[] }) => {
	const [projectsList, setProjectsList] = useState<string[]>([]);
	const [selectedProject, setSelectedProject] = useState<string>("");

	useEffect(() => {
		const projects = tasks
			.map((task) => task.project)
			.filter((value, index, self) => self.indexOf(value) === index);
		let newProject = ["All"];
		projects.forEach((project) => {
			if (project?.title) {
				newProject.push(project.title);
			}
		});
		setProjectsList(newProject);
	}, [tasks]);

	function filterTasksByProject(option: string) {
		return tasks.filter((task) => {
			if (option === "All") {
				return true;
			} else if (task.project) {
				return task.project?.title === option;
			} else {
				return false;
			}
		});
	}

	return (
		<div className="my-2 tasks-list">
			<h1 className="text-2xl text-center">Tasks</h1>
			<div className="flex justify-center filter-container">
				<Dropdown
					className="w-2/12 filter-dropdown"
					setSelected={setSelectedProject}
					title={"Project"}
					options={projectsList}
					selected={projectsList[0]}
				/>
			</div>
			<div className="flex flex-col items-center justify-center">
				<ul className="w-3/4">
					{filterTasksByProject(selectedProject).map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
				</ul>
			</div>
		</div>
	);
};
