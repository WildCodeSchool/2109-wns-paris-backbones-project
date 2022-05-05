import React from "react";
import { Task } from "../types";
import TaskCard from "../TaskCard/TaskCard";

export const TasksList = ({ tasks }: { tasks: Task[] }) => (
	<div className="tasks-list my-2">
		<h1 className="text-2xl text-center">Tasks</h1>
		<div className="flex flex-col items-center justify-center">
			<ul className="w-3/4">
				{tasks.map((task) => (
					<TaskCard key={task.id} task={task} />
				))}
			</ul>
		</div>
	</div>
);
