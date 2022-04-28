import React from "react";

interface IProps {
	connectedUserId: string;
	tasks: Array<{
		id: number;
		title: string;
		description: string;
		status: { title: string };
		// effective_time:,
		// estimated_date:,
		// start_date:,
		// end_date:,
		// created_at:,
		users: Array<{ id: number }>;
		project_id: number;
	}>;
}

export const TasksList = ({ connectedUserId, tasks }: IProps) => (
	<ul className="flex bg-slate-700">
		{tasks
			.filter(
				// NOTE: FOR NOW: if user is not connected, by default, we still want to display all tasks
				// TODO: when authentication is implemented, change the default behaviour: user should not see tasks unless they are logged in
				({ users }) =>
					!connectedUserId ||
					users.some(({ id }) => id === Number(connectedUserId))
			)
			.map(({ title, status, users, id: taskId }) => {
				return (
					<li
						className="flex-1 p-2 border"
						key={taskId}
					>
						<header className="flex justify-between">
							<span>
								{/* TODO: remove user_id later // only used to check if properly fetched from db */}
								<strong>{title}</strong> (users{" "}
								{users.map(({ id }) => id).join(", ")})
							</span>{" "}
							{status && <span>{status.title}</span>}
						</header>
					</li>
				);
			})}
	</ul>
);
