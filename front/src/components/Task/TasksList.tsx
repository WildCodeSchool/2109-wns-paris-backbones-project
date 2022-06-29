import React from "react";
import { Task } from "../types";
import TaskCard from "../Task/TaskCard";

export const TasksList = ({ tasks }: { tasks: Task[] }) => {
	return (
		<div className="p-4 tasks-list">
			<div className="flex flex-col">
				<ul className="text-center">
					{tasks.map((task) => (
						<TaskCard key={task.id} task={task} />
					))}
				</ul>
			</div>
		</div>
	);
};
