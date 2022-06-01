import React, { useEffect, useState } from "react";
import { Task } from "../types";
import TaskCard from "../Task/TaskCard";
import Dropdown from "../utils/Dropdown";

export const TasksList = ({ tasks }: { tasks: Task[] }) => {
	const [statusList, setStatusList] = useState<string[]>([]);
	const [selectedStatus, setSelectedStatus] = useState<string>("");

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
		return tasks.filter((task) => {
			if (option === "All") {
				return true;
			} else if (task.status) {
				return task.status.title === option;
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
					setSelectedStatus={setSelectedStatus}
					title={"Status"}
					options={statusList}
					selected={statusList[0]}
				/>
			</div>
			<div className="flex flex-col items-center justify-center">
				<ul className="w-3/4">
					{filterTasksByStatus(selectedStatus).map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
				</ul>
			</div>
		</div>
	);
};
