import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import { BackBonesUser } from "./entities/User";
import { Role } from "./entities/Role";
import { Task } from "./entities/Task";
import { Status } from "./entities/Status";
import { Project } from "./entities/Project";
import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV}` });

console.log(`You are in ${process.env.NODE_ENV} environement`);

//Create test DB
const Database = require("better-sqlite3");
function openDb(filename: string) {
	const db = new Database(`${filename}.db`, { verbose: console.log });
	console.log(db);
}
openDb("test");

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
const projectName = [
	{
		title: "Appli",
		description: "blablabla",
	},
	{
		title: "Appli-2",
		description: "blobloblo",
	},
];

const runSeed = async () => {
	const connectionOptions = await getConnectionOptions(process.env.DB_NAME);

	createConnection({ ...connectionOptions, name: "default" })
		.then(async (connection) => {
			// DELETING DB
			await connection.dropDatabase();
			await connection.synchronize();

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
		let i = 1;
		for (const user of usersName) {
			console.log("Inserting a new user into the database...");
			const u = new BackBonesUser();
			u.firstName = user.firstName;
			u.lastName = user.lastName;
			u.email = user.email;
			u.role = roles.find((role) => role.title === user.role) || roles[0];
			u.tasks = tasks.filter((task, index) => index % i === 0);
			u.avatar = "https://tooommm.github.io/profile/images/profile.jpg";
			u.password = "azerty";
			await connection.manager.save(u);
			console.log("Saved a new user with named: " + u.firstName);
			i++;
		}

			console.log("Loading users from the database...");
			const users = await connection.manager.find(BackBonesUser);
			console.log("Loaded users: ", users);
			console.log("first user tasks", users[0].tasks);

			// CREATE PROJECTS

			for (const project of projectName) {
				console.log("Inserting a new project into the database...");
				const p = new Project();
				p.title = project.title;
				p.description = project.description;
				p.start_date = new Date();
				p.end_date = new Date();
				p.users = users;
				p.tasks = tasks;
				await connection.manager.save(p);
				console.log("Saved a new project with named: " + p.title);
			}
		})
		.catch((error) => console.log(error));
};

runSeed();
