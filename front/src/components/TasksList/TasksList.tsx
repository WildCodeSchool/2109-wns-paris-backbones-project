import React, { useEffect, useState } from "react";
import { Task } from "../types";
import TaskCard from "../TaskCard/TaskCard";
import Dropdown from "../Dropdown/Dropdown";

export const TasksList = ({ tasks }: { tasks: Task[] }) => {
	const [tasksToShow, setTasksToShow] = useState(tasks);
	const [statusList, setStatusList] = useState<string[]>([]);

	useEffect(() => {
		const statuses = tasks
			.map((task) => task.status)
			.filter((value, index, self) => self.indexOf(value) === index);
		let newStatuses = ["All"];
		statuses.forEach((status) => {
			if (status?.title) {
				newStatuses.push(status.title);
			}
		});
		setStatusList(newStatuses);
	}, [tasks]);

	function filterTasksByStatus(option: string) {
		const filteredTasks = tasks.filter((task) => {
			if (option === "All") {
				return true;
			} else if (task.status) {
				return task.status.title === option;
			} else {
				return false;
			}
		});
		setTasksToShow(filteredTasks);
	}

	return (
		<div className="tasks-list my-2">
			<h1 className="text-2xl text-center">Tasks</h1>
			<div className="filter-container flex justify-center">
				<Dropdown
					className="filter-dropdown w-2/12"
					onChange={filterTasksByStatus}
					title={"Status"}
					options={statusList}
					selected={statusList[0]}
				/>
			</div>
			<div className="flex flex-col items-center justify-center">
				<ul className="w-3/4">
					{tasksToShow.map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
				</ul>
			</div>
		</div>
	);
};
