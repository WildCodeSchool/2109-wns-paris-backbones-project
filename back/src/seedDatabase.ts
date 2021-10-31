import "reflect-metadata";
import { createConnection } from "typeorm";
import { BackBonesUser } from "./entity/User";
import { Role } from "./entity/Role";
import { Task } from "./entity/Task";
import { title } from "process";

const rolesName = ["CTO", "Project Manager", "Product Owner", "Developer"];
const usersName = [
	{
		firstName: "Myriam",
		lastName: "Test",
		email: "myriam@gmail.com",
		role: "CTO",
		tasks: [{ title: "title" }],
	},
	{
		firstName: "Laura",
		lastName: "Test",
		email: "laura@gmail.com",
		role: "Project Manager",
		tasks: [{ title: "title" }],
	},
	{
		firstName: "Jonathan",
		lastName: "Test",
		email: "jonathan@gmail.com",
		role: "Product Owner",
		tasks: [{ title: "title" }],
	},
	{
		firstName: "Nate",
		lastName: "Test",
		email: "nate@gmail.com",
		role: "Developer",
		tasks: [{ title: "title" }],
	},
	{
		firstName: "Thomas",
		lastName: "Test",
		email: "thomas@gmail.com",
		role: "Developer",
		tasks: [{ title: "title" }],
	},
];
const generateTasks = () => {
	let tasks = [];
	for (let index = 0; index < 5; index++) {
		tasks.push({
			title: "task " + index,
			description: "description " + index,
			effective_time: new Date(),
			estimated_time: new Date(),
			start_date: new Date(),
			end_date: new Date(),
		});
	}
	return tasks;
};

createConnection()
	.then(async (connection) => {
		// DELETING DB
		console.log("deleting database");
		const prevUsers = await connection.manager.find(BackBonesUser);
		await connection.manager.remove(prevUsers);
		const prevRoles = await connection.manager.find(Role);
		await connection.manager.remove(prevRoles);
		const prevTasks = await connection.manager.find(Task);
		await connection.manager.remove(prevTasks);

		// CREATE ROLES
		for (const role of rolesName) {
			const r = new Role();
			r.title = role;
			await connection.manager.save(r);
			console.log("Saved a new role: " + r.title);
		}
		const roles = await connection.manager.find(Role);

		// CREATE TASKS
		const t = new Task();
		// t.title = usersTasks[0].title;
		// t.description = usersTasks[0].description;
		// t.effective_time = usersTasks[0].effective_time;
		// t.estimated_time = usersTasks[0].effective_time;
		// t.start_date = usersTasks[0].start_date;
		// t.end_date = usersTasks[0].end_date;
		// await connection.manager.save(t);
		// console.log("Saved a new task: " + t.title);
		// const tasks = await connection.manager.find(Task);

		// CREATE USERS
		for (const user of usersName) {
			console.log("Inserting a new user into the database...");
			const u = new BackBonesUser();
			u.firstName = user.firstName;
			u.lastName = user.lastName;
			u.email = user.email;
			u.role = roles.find((role) => role.title === user.role) || roles[0];
			u.tasks = [
				tasks.find((task) => task.title === user.tasks[0].title) ||
					tasks[0],
			];
			await connection.manager.save(u);
			console.log("Saved a new user with named: " + u.firstName);
		}

		console.log("Loading users from the database...");
		const users = await connection.manager.find(BackBonesUser);
		console.log("Loaded users: ", users);
		console.log(users[0].tasks);
	})
	.catch((error) => console.log(error));
