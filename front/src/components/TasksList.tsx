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

const rolesData = [{ id: 1, title: "Développeur" }];

// Table status {
//   id int [pk,ref: < projects_status.status_id]
//   title varchar
// }

const statusData = [{ id: 1, title: "En cours" }];

interface IProps {
	userId: string;
}

export const TasksList = ({ userId }: IProps) => (
	<ul className="flex">
		{tasksData
			.filter(({ user_id }) => !userId || user_id === Number(userId))
			.map(({ title, status_id, user_id }) => {
				const currStatus = statusData.find(
					({ id }) => id === status_id
				);
				return (
					<li className="flex-1 border border-purple-800 p-2">
						<header className="flex justify-between">
							<span>
								<strong>{title}</strong> (user {user_id})
							</span>{" "}
							{currStatus && <span>{currStatus.title}</span>}
						</header>
					</li>
				);
			})}
	</ul>
);
