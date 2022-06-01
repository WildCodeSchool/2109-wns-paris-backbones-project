import React from "react";
import { TasksList } from "../components/Task/TasksList";
import { Task } from "../components/types";

interface TasksProps {
	tasks: Task[];
}

function Tasks({ tasks }: TasksProps) {
	return (
		<>
			<TasksList tasks={tasks} />
		</>
	);
}

export default Tasks;
