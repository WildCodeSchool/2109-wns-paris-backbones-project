import React, { useEffect, useState } from "react";
import { TasksList } from "../components/Task/TasksList";
import { Task } from "../components/types";
import Dropdown from "../components/utils/Dropdown";

interface TasksProps {
	tasks: Task[];
}

function Tasks({ tasks }: TasksProps) {
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
		<div className="flex flex-col justify-center">
			<h1 className="text-2xl text-center">Tasks</h1>
			<div className="flex justify-center filter-container">
				<Dropdown
					className=" filter-dropdown w-40 sd:w-full"
					setSelected={setSelectedProject}
					title={"Project"}
					options={projectsList}
					selected={projectsList[0]}
				/>
			</div>
			<div className="w-8/12 self-center">
				<TasksList tasks={filterTasksByProject(selectedProject)} />
			</div>
		</div>
	);
}

export default Tasks;
