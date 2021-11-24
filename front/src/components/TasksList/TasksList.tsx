import React from "react";

// Table projects {
//   id int [pk, ref: < projects_status.project_id]
//   title varchar [not null]
//   description text
//   photo varchar
//   start_date datetime
//   end_date datetime
//   created_at timestamp
//   user_id int [not null]
// }

const projectsData = [
	{
		id: 1,
		title: "Mon super projet",
		description: "Projet de fou furieux lel",
		photo: "https://via.placeholder.com/150",
		start_date: Date.now(),
		end_date: null,
		created_at: Date.now(),
		user_id: 1,
	},
];

// Table tasks {
//   id int [pk]
//   title varchar [not null]
//   description text
//   status_id int [not null]
//   effective_time datetime
//   estimated_time datetime
//   start_date datetime
//   end_date datetime
//   created_at timestamp
//   user_id int
//   project_id int [not null]
// }

const tasksData = [
	{
		id: 1,
		title: "Tâche A",
		description:
			"C'est une tâche à faire, de préférence plus tôt que tard quand même",
		status_id: 1,
		// effective_time:,
		// estimated_date:,
		// start_date:,
		// end_date:,
		// created_at:,
		user_id: 1,
		project_id: 1,
	},
	{
		id: 2,
		title: "Tâche B",
		description:
			"C'est une tâche à faire, de préférence plus tôt que tard quand même",
		status_id: 1,
		// effective_time:,
		// estimated_date:,
		// start_date:,
		// end_date:,
		// created_at:,
		user_id: 2,
		project_id: 1,
	},
	{
		id: 3,
		title: "Tâche C",
		description:
			"C'est une tâche à faire, de préférence plus tôt que tard quand même",
		status_id: 1,
		// effective_time:,
		// estimated_date:,
		// start_date:,
		// end_date:,
		// created_at:,
		user_id: 1,
		project_id: 1,
	},
	{
		id: 4,
		title: "Tâche D",
		description:
			"C'est une tâche à faire, de préférence plus tôt que tard quand même",
		status_id: 1,
		// effective_time:,
		// estimated_date:,
		// start_date:,
		// end_date:,
		// created_at:,
		user_id: 2,
		project_id: 1,
	},
	{
		id: 5,
		title: "Tâche E",
		description:
			"C'est une tâche à faire, de préférence plus tôt que tard quand même",
		status_id: 1,
		// effective_time:,
		// estimated_date:,
		// start_date:,
		// end_date:,
		// created_at:,
		user_id: 2,
		project_id: 1,
	},
	{
		id: 6,
		title: "Tâche F",
		description:
			"C'est une tâche à faire, de préférence plus tôt que tard quand même",
		status_id: 1,
		// effective_time:,
		// estimated_date:,
		// start_date:,
		// end_date:,
		// created_at:,
		user_id: 1,
		project_id: 1,
	},
];

// Table users as U {
//   id int [pk, increment] // auto-increment
//   first_name varchar
//   last_name varchar
//   email varchar [not null]
//   avatar varchar
//   password varchar
//   role_id int [not null]
//   created_at timestamp
// }

const usersData = [
	{
		id: 1,
		first_name: "Jean-Didier",
		last_name: "Lerandom",
		email: "a@b.com",
		avatar: "https://via.placeholder.com/50",
		// password:,
		role_id: 1,
		created_at: Date.now(),
	},
	{
		id: 2,
		first_name: "Josiane",
		last_name: "Laleatoire",
		email: "1@2.com",
		avatar: "https://via.placeholder.com/50",
		// password:,
		role_id: 1,
		created_at: Date.now(),
	},
];

// Table roles {
// id int [pk]
//   title varchar
// }

const rolesData = [{ id: 1, title: "Développeuse" }];

// Table status {
//   id int [pk,ref: < projects_status.status_id]
//   title varchar
// }

const statusData = [{ id: 1, title: "En cours" }];

interface IProps {
	connectedUserId: string;
}

export const TasksList = ({ connectedUserId }: IProps) => (
	<ul className="flex">
		{tasksData
			.filter(
				// NOTE: FOR NOW: if user is not connected, by default, we still want to display all tasks
				// TODO: when authentication is implemented, change the default behaviour: user should not see tasks unless they are logged in
				({ user_id }) =>
					!connectedUserId || user_id === Number(connectedUserId)
			)
			.map(({ title, status_id, user_id, id: taskId }) => {
				// display the status text instead of its id
				const currStatus = statusData.find(
					({ id }) => id === status_id
				);
				return (
					<li
						className="flex-1 border border-purple-800 p-2"
						key={taskId}
					>
						<header className="flex justify-between">
							<span>
								{/* TODO: remove user_id later // only used to check if properly fetched from db */}
								<strong>{title}</strong> (user {user_id})
							</span>{" "}
							{currStatus && <span>{currStatus.title}</span>}
						</header>
					</li>
				);
			})}
	</ul>
);
