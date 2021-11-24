import { render, screen } from "@testing-library/react";
import { TasksList } from "./TasksList";

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

describe("TasksList", () => {
	// 1 composant qui affiche une liste de tâches depending on wether user is logged in or not
	describe("no connected user", () => {
		// TODO: (authentication) for now, it has to display all tasks but ultimately, no task should be displayed if user is not connected
		it("displays all tasks", () => {
			render(<TasksList connectedUserId={""} />);
			tasksData.forEach(({ title }) =>
				expect(screen.getByText(title)).toBeInTheDocument()
			);
		});
	});
	describe("connected user with no task", () => {
		it("displays no task", () => {
			render(<TasksList connectedUserId={"-1"} />);
			expect(screen.queryAllByRole("listitem")).toHaveLength(0);
		});
	});
	describe("connected user with task(s)", () => {
		it("display the connected user's task(s)", () => {
			render(<TasksList connectedUserId={"1"} />);
			// fetches tasks assigned to connectedUserId
			const currentUserTasks = tasksData.filter(
				({ user_id }) => user_id === 1
			);

			// checks that all tasks are rendered
			currentUserTasks.forEach(({ title }) =>
				expect(screen.getByText(title)).toBeInTheDocument()
			);

			// checks that the number of tasks displayed equals connectedUserId's number of tasks
			expect(screen.queryAllByRole("listitem")).toHaveLength(
				currentUserTasks.length
			);
		});
	});
});
