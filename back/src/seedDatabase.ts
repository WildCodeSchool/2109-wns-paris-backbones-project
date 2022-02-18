import { config } from "dotenv";
import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import { BackBonesUser } from "./entities/User";
import { Role } from "./entities/Role";
import { Task } from "./entities/Task";
import { Status } from "./entities/Status";
import { Project } from "./entities/Project";
import { Notification } from "./entities/Notification";

config({ path: `.env.${process.env.NODE_ENV}` });

console.log(`seedDatabase starting in ${process.env.NODE_ENV} environement`);

//Create test DB
const Database = require("better-sqlite3");

function openDb(filename: string) {
	new Database(`${filename}.db`, { verbose: console.log });
}

openDb("test");

const rolesName = [
	"CTO",
	"Project Manager",
	"Product Owner",
	"Developer",
	"Scrum Master",
];
const usersName = [
	{
		firstName: "Myriam",
		lastName: "Test",
		email: "myriam@gmail.com",
	},
	{
		firstName: "Laura",
		lastName: "Test",
		email: "laura@gmail.com",
	},
	{
		firstName: "Jonathan",
		lastName: "Test",
		email: "jonathan@gmail.com",
	},
	{
		firstName: "Nate",
		lastName: "Test",
		email: "nate@gmail.com",
	},
	{
		firstName: "Thomas",
		lastName: "Test",
		email: "thomas@gmail.com",
	},
	{
		firstName: "Bad",
		lastName: "Boy",
		email: "badboy@gmail.com",
	},
];
const statusName = [
	"in progress",
	"to do",
	"done",
	"dev in progress",
	"to test",
];
const projectName = [
	{
		title: "Appli",
		description: "blablabla",
	},
	{
		title: "Appli-2",
		description: "blobloblo",
	},
	{
		title: "Appli-Test",
		description: "bliblibli",
	},
];

const runSeed = async () => {
	const connectionOptions = await getConnectionOptions(process.env.DB_NAME);

	createConnection({ ...connectionOptions, name: "default" })
		.then(async (connection) => {
			// DELETING DB
			console.log("deleting previous DB ...");
			await connection.dropDatabase();
			console.log("deleting previous DB ...Done");
			console.log("synchronizing new DB...");
			await connection.synchronize();
			console.log("synchronizing new DB...Done");

			const createNotification = async (
				users: BackBonesUser[],
				task?: Task,
				project?: Project
			) => {
				for (const user of users) {
					const n = new Notification();
					n.created_at = new Date();
					n.user = user;
					if (project) {
						n.title = `Welcome to the project: ${project.title}!`;
						n.description = `You've been added to the project ${project.title}! Keep calm and take your mark`;
						n.project = project;
					}
					if (task) {
						const taskProject = await task?.project;
						n.title = `${taskProject.title}: new ${task.title}!`;
						n.description = `${taskProject.title}: You have a new task: ${task.title}`;
						n.task = task;
					}
					await connection.manager.save(n);
					console.log(
						`Saved a new Notification: ${n.title}. On user id: ${user.id}`
					);
				}
			};

			// CREATE USERS
			console.log("CREATE USERS");
			for (const user of usersName) {
				const u = new BackBonesUser();
				u.firstName = user.firstName;
				u.lastName = user.lastName;
				u.email = user.email;
				u.avatar =
					"https://tooommm.github.io/profile/images/profile.jpg";
				u.password = "azerty";
				await connection.manager.save(u);
				console.log("Saved a new user with named: " + u.firstName);
			}
			let users = await connection.manager.find(BackBonesUser);
			users = users.filter((user) => user.id < 6); // remove Bad Boy for tests

			// CREATE PROJECTS
			console.log("CREATE PROJECTS");
			for (const project of projectName) {
				const p = new Project();
				p.title = project.title;
				p.description = project.description;
				p.start_date = new Date();
				p.end_date = new Date();
				p.users = project != projectName[2] ? users : [];
				const createdProject = await connection.manager.save(p);
				console.log("Saved a new project with named: " + p.title);
				await createNotification(
					await p?.users,
					undefined,
					createdProject
				);
			}
			const projects = await connection.manager.find(Project);

			// CREATE STATUS
			console.log("CREATE STATUS");
			for (const status of statusName) {
				const s = new Status();
				s.title = status;
				s.project = projects[0];
				await connection.manager.save(s);
				console.log(
					`Saved a new status: ${s.title}. On project id: ${projects[0].id}`
				);
			}
			for (const status of statusName) {
				const s = new Status();
				s.title = status;
				s.project = projects[1];
				await connection.manager.save(s);
				console.log(
					`Saved a new status: ${s.title}. On project id: ${projects[1].id}`
				);
			}
			const statuses = await connection.manager.find(Status);

			// CREATE ROLES
			console.log("CREATE ROLES");
			let rolesCount = 0;
			for (const role of rolesName) {
				const r = new Role();
				r.title = role;
				r.project = projects[0];
				r.users = [users[rolesCount]];
				await connection.manager.save(r);
				console.log(
					`Saved a new role: ${r.title}. On project id: ${projects[0].id}`
				);
				rolesCount++;
			}
			rolesCount = 4;
			for (const role of rolesName) {
				const r = new Role();
				r.title = role;
				r.project = projects[1];
				r.users = [users[rolesCount]];
				await connection.manager.save(r);
				console.log(
					`Saved a new role: ${r.title}. On project id: ${projects[1].id}`
				);
				rolesCount--;
			}

			// CREATE TASKS
			console.log("CREATE TASKS");
			for (const project of projects) {
				let i = 1;
				for (let index = 0; index < 5; index++) {
					const t = new Task();
					t.title = "task title " + index;
					t.description = "task description " + index;
					t.status = statuses.filter(
						(status) => status.project.id === project.id
					)[index]; // Shuffle maison des familles
					t.project = project;
					t.users = users.filter((user, index) => index % i === 0);
					t.effective_time = new Date();
					t.estimated_time = new Date();
					t.start_date = new Date();
					t.end_date = new Date();
					const createdTask = await connection.manager.save(t);
					console.log(
						`Saved a new Task: ${t.title}. On project id: ${project.id}`
					);
					await createNotification(await t?.users, createdTask);
					i++;
				}
			}
			console.log("database seeded. 🚀");
		})
		.catch((error) => console.log(error));
};

runSeed();
