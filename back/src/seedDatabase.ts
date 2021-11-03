import "reflect-metadata";
import { createConnection } from "typeorm";
import { BackBonesUser } from "./entities/User";
import { Role } from "./entities/Role";
import { Task } from "./entities/Task";
import { Status } from "./entities/Status";

const rolesName = ["CTO", "Project Manager", "Product Owner", "Developer"];
const usersName = [
	{
		firstName: "Myriam",
		lastName: "Test",
		email: "myriam@gmail.com",
		role: "CTO",
	},
	{
		firstName: "Laura",
		lastName: "Test",
		email: "laura@gmail.com",
		role: "Project Manager",
	},
	{
		firstName: "Jonathan",
		lastName: "Test",
		email: "jonathan@gmail.com",
		role: "Product Owner",
	},
	{
		firstName: "Nate",
		lastName: "Test",
		email: "nate@gmail.com",
		role: "Developer",
	},
	{
		firstName: "Thomas",
		lastName: "Test",
		email: "thomas@gmail.com",
		role: "Developer",
	},
];
const statusName = ["in progress", "to do", "done"];

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
		const prevStatus = await connection.manager.find(Status);
		await connection.manager.remove(prevStatus);

		// CREATE ROLES
		for (const role of rolesName) {
			const r = new Role();
			r.title = role;
			await connection.manager.save(r);
			console.log("Saved a new role: " + r.title);
		}
		const roles = await connection.manager.find(Role);

		// CREATE STATUS
		for (const status of statusName) {
			const s = new Status();
			s.title = status;
			await connection.manager.save(s);
			console.log("Saved a new status: " + s.title);
		}
		const status = await connection.manager.find(Status);

		// CREATE TASKS
		for (let index = 0; index < 5; index++) {
			const t = new Task();
			t.title = "task title " + index;
			t.description = "task description " + index;
			t.status = status.sort((a, b) => 0.5 - Math.random())[0]; // Shuffle maison des familles
			t.effective_time = new Date();
			t.estimated_time = new Date();
			t.start_date = new Date();
			t.end_date = new Date();
			await connection.manager.save(t);
			console.log("Saved a new task: " + t.title);
		}
		const tasks = await connection.manager.find(Task);

		// CREATE USERS
		for (const user of usersName) {
			console.log("Inserting a new user into the database...");
			const u = new BackBonesUser();
			u.firstName = user.firstName;
			u.lastName = user.lastName;
			u.email = user.email;
			u.role = roles.find((role) => role.title === user.role) || roles[0];
			u.tasks = tasks;
			u.avatar = "https://tooommm.github.io/profile/images/profile.jpg";
			u.password = "azerty";
			await connection.manager.save(u);
			console.log("Saved a new user with named: " + u.firstName);
		}

		console.log("Loading users from the database...");
		const users = await connection.manager.find(BackBonesUser);
		console.log("Loaded users: ", users);
		console.log("first user tasks", users[0].tasks);
	})
	.catch((error) => console.log(error));
