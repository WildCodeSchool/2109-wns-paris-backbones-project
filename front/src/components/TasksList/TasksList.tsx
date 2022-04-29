import React from "react";
import { Task } from "../types";

export const TasksList = ({ tasks }: { tasks: Task[] }) => (
	<ul className="flex bg-slate-700">
		{tasks.map((task) => (
			<li key={task.id} className="w-1/2 p-2">
				<ul>
					<li>{task.title}</li>
					<li>{task.description}</li>
				</ul>
			</li>
		))}
	</ul>
);
