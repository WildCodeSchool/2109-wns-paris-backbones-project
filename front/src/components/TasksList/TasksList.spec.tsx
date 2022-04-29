import { render, screen } from "@testing-library/react";
import { TasksList } from "./TasksList";
import { Task } from "../types";

const tasksData: Task[] = [
	{
		id: 1,
		title: "Tâche A",
		description:
			"C'est une tâche à faire, de préférence plus tôt que tard quand même",
		status: { id: 1, title: "A faire" },
		users: [
			{
				id: 1,
				firstName: "John",
				lastName: "Doe",
				email: "email@email.com",
			},
		],
		project: { id: 1, title: "Projet 1" },
	},
	{
		id: 2,
		title: "Tâche B",
		description:
			"C'est une tâche à faire, de préférence plus tôt que tard quand même",
		status: { id: 1, title: "A faire" },
		users: [
			{
				id: 2,
				firstName: "John",
				lastName: "Doe",
				email: "email@email.com",
			},
		],
		project: { id: 1, title: "Projet 1" },
	},
	{
		id: 3,
		title: "Tâche C",
		description:
			"C'est une tâche à faire, de préférence plus tôt que tard quand même",
		status: { id: 1, title: "A faire" },
		users: [
			{
				id: 3,
				firstName: "John",
				lastName: "Doe",
				email: "email@email.com",
			},
		],
		project: { id: 1, title: "Projet 1" },
	},
	{
		id: 4,
		title: "Tâche D",
		description:
			"C'est une tâche à faire, de préférence plus tôt que tard quand même",
		status: { id: 1, title: "A faire" },
		users: [
			{
				id: 4,
				firstName: "John",
				lastName: "Doe",
				email: "email@email.com",
			},
		],
		project: { id: 1, title: "Projet 1" },
	},
	{
		id: 5,
		title: "Tâche E",
		description:
			"C'est une tâche à faire, de préférence plus tôt que tard quand même",
		status: { id: 1, title: "A faire" },
		users: [
			{
				id: 6,
				firstName: "John",
				lastName: "Doe",
				email: "email@email.com",
			},
		],
		project: { id: 1, title: "Projet 1" },
	},
	{
		id: 6,
		title: "Tâche F",
		description:
			"C'est une tâche à faire, de préférence plus tôt que tard quand même",
		status: { id: 1, title: "A faire" },
		users: [
			{
				id: 7,
				firstName: "John",
				lastName: "Doe",
				email: "email@email.com",
			},
		],
		project: { id: 1, title: "Projet 1" },
	},
];

describe("TasksList", () => {
	// 1 composant qui affiche une liste de tâches depending on wether user is logged in or not
	describe("no connected user", () => {
		// TODO: (authentication) for now, it has to display all tasks but ultimately, no task should be displayed if user is not connected
		it("displays all tasks", () => {
			render(<TasksList tasks={tasksData} />);
			tasksData.forEach(({ title }) =>
				expect(screen.getByText(title)).toBeInTheDocument()
			);
		});
	});
});
