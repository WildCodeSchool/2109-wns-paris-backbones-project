import { config } from "dotenv";
import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import { BackBonesUser } from "./entities/User";
import { Role } from "./entities/Role";
import { Task } from "./entities/Task";
import { Status } from "./entities/Status";
import { Project } from "./entities/Project";
import { createNotification } from "./utils/resolverHelpers";
import * as bcrypt from "bcrypt";

config({ path: `.env.${process.env.NODE_ENV}` });

console.log(`seedDatabase starting in ${process.env.NODE_ENV} environment`);
console.log(`DB name: ${process.env.DB_NAME}`);

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
		lastName: "Mira",
		email: "myriam@gmail.com",
		avatar: "https://avatars.githubusercontent.com/u/77079498?v=4",
	},
	{
		firstName: "Laura",
		lastName: "Fremy",
		email: "laura@gmail.com",
		avatar: "https://avatars.githubusercontent.com/u/75318984?v=4",
	},
	{
		firstName: "Jonathan",
		lastName: "Carnos",
		email: "jonathan@gmail.com",
		avatar: "https://avatars.githubusercontent.com/u/51161811?v=4",
	},
	{
		firstName: "Nate",
		lastName: "Labreuil",
		email: "nate@gmail.com",
		avatar: "https://avatars.githubusercontent.com/u/24679993?v=4",
	},
	{
		firstName: "Thomas",
		lastName: "Bro",
		email: "thomas@gmail.com",
		avatar: "https://avatars.githubusercontent.com/u/58857363?v=4",
	},
	{
		firstName: "Bad",
		lastName: "Boy",
		email: "badboy@gmail.com",
		avatar: "https://avatars.githubusercontent.com/u/58857363?v=4",
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
		title: "Karim Président",
		description:
			"This project aims at making Karim our President: organizing the campaign, splitting preparatory work, etc.",
		start_date: new Date(),
		end_date: new Date(2022, 6, 12, 15, 0, 0),
		photo: "http://iaphare.org/wp-content/uploads/2018/11/Project-BG-2005.jpg",
	},
	{
		title: "Undefined For ALL",
		description:
			"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
		start_date: new Date(),
		end_date: new Date(2022, 6, 12, 15, 0, 0),
		photo: "https://www.pme-web.com/wp-content/uploads/bfi_thumb/Outils-Gestion-de-projet-nbbkudn0pflrlumlok5nm2rumkqjeawlw2uxsd3ztk.png",
	},
	{
		title: "Appli-Test",
		description: "bliblibli",
		start_date: new Date(),
		end_date: new Date(2022, 6, 12, 15, 0, 0),
		photo: "http://iaphare.org/wp-content/uploads/2018/11/Project-BG-2005.jpg",
	},
];

const myTasks = [
	{
		title: "Create campaign posters",
		description:
			"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
		effective_time: new Date(),
		estimated_time: new Date(2022, 4, 12, 15, 0, 0),
		start_date: new Date(),
		end_date: new Date(2022, 4, 12, 15, 0, 0),
	},
	{
		title: "Ask Julien Keita for a salary raise",
		description:
			"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
		effective_time: new Date(),
		estimated_time: new Date(2022, 4, 12, 15, 0, 0),
		start_date: new Date(),
		end_date: new Date(2022, 4, 12, 15, 0, 0),
	},
	{
		title: "Gather a team of 18 amazing students",
		description:
			"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
		effective_time: new Date(),
		estimated_time: new Date(2022, 4, 12, 15, 0, 0),
		start_date: new Date(),
		end_date: new Date(2022, 4, 12, 15, 0, 0),
	},
	{
		title: "Subscribe to a cooking course",
		description:
			"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
		effective_time: new Date(),
		estimated_time: new Date(2022, 4, 12, 15, 0, 0),
		start_date: new Date(),
		end_date: new Date(2022, 4, 12, 15, 0, 0),
	},
	{
		title: "Organize photoshoot",
		description:
			"In order to start making posters and advertise the campaign on and offline, we need to book a photoshoot Important: don’t forget to bring props (such as a Wild-flag banner, a crown, a 'foule en délire' background image, etc.)",
		effective_time: new Date(),
		estimated_time: new Date(2022, 4, 12, 15, 0, 0),
		start_date: new Date(),
		end_date: new Date(2022, 4, 12, 15, 0, 0),
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

			// CREATE USERS
			console.log("CREATE USERS");
			for (const user of usersName) {
				const u = new BackBonesUser();
				u.firstName = user.firstName;
				u.lastName = user.lastName;
				u.email = user.email;
				u.avatar = user.avatar;
				u.password = bcrypt.hashSync("azerty", 10);
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
				p.photo = project.photo;
				p.start_date = project.start_date;
				p.end_date = project.end_date;
				p.users = project != projectName[2] ? users : [];
				const createdProject = await connection.manager.save(p);
				console.log("Saved a new project with named: " + p.title);
				await createNotification(
					`You've been added to the project ${project.title}! Keep calm and take your mark`,
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
				const projectStatuses = await project.statuses;
				let i = 1;
				for (let index = 0; index < 5; index++) {
					const t = new Task();
					t.title = myTasks[index].title;
					t.description = myTasks[index].description;
					t.status = projectStatuses[index];
					t.project = project;
					if (project != projects[2]) {
						t.users = [
							users[index],
							users[index + 1] ? users[index + 1] : users[0],
						];
					}
					t.effective_time = myTasks[index].effective_time;
					t.estimated_time = myTasks[index].estimated_time;
					t.start_date = myTasks[index].start_date;
					t.end_date = myTasks[index].end_date;
					const createdTask = await connection.manager.save(t);
					console.log(
						`Saved a new Task: ${t.title}. On project id: ${project.id}`
					);
					await createNotification(
						`${project.title}: You have a new task: ${t.title}`,
						await t?.users,
						createdTask
					);
					i++;
				}
			}
			console.log("database seeded. 🚀");
		})
		.catch((error) => console.log(error));
};

runSeed();
