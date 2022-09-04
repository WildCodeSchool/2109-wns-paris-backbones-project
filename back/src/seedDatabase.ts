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
	{ title: "CTO" },
	{ title: "Project Manager" },
	{ title: "Product Owner" },
	{ title: "Developer" },
	{ title: "Scrum Master" },
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
	{ title: "in progress", isDoneStatus: false },
	{ title: "to do", isDoneStatus: false },
	{ title: "done", isDoneStatus: true },
	{ title: "Dev in progress", isDoneStatus: false },
	{ title: "to test", isDoneStatus: false },
];

const myTasks = [
	{
		title: "Create campaign posters",
		description:
			"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
		effective_time: new Date(),
		estimated_time: new Date(2022, 4, 12, 15, 0, 0),
		start_date: new Date(2022, 3, 12, 15, 0, 0),
		end_date: new Date(2022, 4, 12, 15, 0, 0),
	},
	{
		title: "Ask Julien Keita for a salary raise",
		description:
			"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
		effective_time: new Date(),
		estimated_time: new Date(2022, 4, 12, 15, 0, 0),
		start_date: new Date(2022, 3, 12, 15, 0, 0),
		end_date: new Date(2022, 4, 12, 15, 0, 0),
	},
	{
		title: "Gather a team of 18 amazing students",
		description:
			"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
		effective_time: new Date(),
		estimated_time: new Date(2022, 4, 12, 15, 0, 0),
		start_date: new Date(2022, 3, 12, 15, 0, 0),
		end_date: new Date(2022, 4, 12, 15, 0, 0),
	},
	{
		title: "Subscribe to a cooking course",
		description:
			"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
		effective_time: new Date(),
		estimated_time: new Date(2022, 4, 12, 15, 0, 0),
		start_date: new Date(2022, 3, 12, 15, 0, 0),
		end_date: new Date(2022, 4, 12, 15, 0, 0),
	},
	{
		title: "Organize photoshoot",
		description:
			"In order to start making posters and advertise the campaign on and offline, we need to book a photoshoot Important: don’t forget to bring props (such as a Wild-flag banner, a crown, a 'foule en délire' background image, etc.)",
		effective_time: new Date(),
		estimated_time: new Date(2022, 4, 12, 15, 0, 0),
		start_date: new Date(2022, 3, 12, 15, 0, 0),
		end_date: new Date(2022, 4, 12, 15, 0, 0),
	},
];

const projectName = [
	{
		title: "Accor",
		description:
			"Refondre toutes les entités du groupe sous le CMS Adobe Experience Manager. Création du MVP :\n" +
			"https://www.movenpick.com/",
		start_date: new Date(2021, 9, 15, 0, 0, 0, 0),
		end_date: new Date(2022, 1, 14, 15, 0, 0),
		photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHcAAABmCAMAAADGbf6GAAAAtFBMVEX////Zrm2wiFjSqGnhtnG+lV/No2e2jVvpvXXcsW65kF2shFbvw3j49O+3lW/zxnqxjWbGnGOpgFDEqIr8+vjJnmDq4dj7zXj7zn72zIPy4cnnwof58+nkz7L17ODMpnTRrn62i1Tg0cC8lWbPuaHAn3iqf0nk2cykeEb71I786Mb979b84bP82Jf54br88d7826Hkw5Dz1KHhxZzft3vp0KvVtozLnVjWu5faxrDgsWTBk1J/5HWPAAAEmUlEQVRoge2ZeXOqPBTGXalWg4JBEMKquFe0LNfl+3+vN0ISqHr1j9fQuTM8085gOvLrkxPOOQm1WqVKlSpVqvQerdGvYDfq9jew8Eud/Ibhrappu/KxwUTTBl/lG95j7GBQuuFAvXL7A1gyF0cXY/t9vVwsWmXYjgFK5QaTFNvvdMo1vKHYjlFqhDMuxrZapRoOJhTbOpRpGBkU2+qWaRh+U2yrW6rhzZli6+UaprPcrdcPJXJra4atN8s0DAyGbYZlRlhn2GYJhsGGXUUM20y4c9GEeYsZVlAs3twgL30oIlxBUI68I7wedAza3MQUK0g2b8Pf+Ln9JjUXRQQrSMqRLzZLF7SritPYKvhHkvga3qRZKiIQhLG2aVleIl34Gv7OkjLNjPGfI4ILU7dMm2uEA5KU6wRimdBKJEWyj0n7xA8Lv2lSjumQJ+DYSlK73bb59fBBXoKyJQ11SSLYNj/D0MiwmJutLCtRcuynzaul3XQoNi19ULcVx2TYzw9OhsGBYtMKhM0qJoRHiv389PkYDgrYphkKimDiUSvlfl79cjIctwoVFydH7PY6nBAs5k65cKMbLKlB42ySMfZj7nHAwu5PrENKH0zaBPvR4BFh0P2JZWliwbCNBgfDsIgtdhjQZ9iGz6H+G90cmy5lqoVLsQ0eEY4LbotYbJhiG/Lo/YatqHmzlKk8im30eou3c2FI7Zo3poDPsDwMB1nvqNxiseE5wfZ4GNZTrDN+8Kch48r+u7E4vtjs8WFqODG7bzds1ZuKkPyliwIiw743wsBs/mmG+l9veZLlKzP9fZ9hYEbNg46eGAHikGn0LiwKY/1V1wYKehcXln36WalSpUr/miBCd0UB3g/VAAL/I6Xu9tsf37Z2eOMbHeJCaYBW4giCkxRbHmCOptOpP1rkY7MR1eJ1sQhUVdvkH+G6c24ZRtQ6t1j5RXgPKjiOrVwcVmwXvutOfX/qugljiDLRcim+BG/VlbrPP+JtYGwBgKywS0/WQaII+nVMTy70HGc8dbEpACwPX1CGKJ/GqbzhcvbKrrYKViozbJ1bAbnUQzLTseLQfudIZhraLr0x8uf0UpTpdHi9V4b36ra2yw2H5/wYn0wzcBT9Zqimu/le0JtPwS13Ib/gBtoE1dDXYE3ua9y/mLKU+yOUk5sf2MHGfEy5XtaBjMVX87xP39qvB1+ZE2SwaWbSFfvuaZm5hftOc+5QTNVbDp/b3WiTAP9/wYAYfuxXeOA354KC37TR68lD7zkW7jVtctVgsMo8xXl84ZP4Ltwpe7y9uQgpN53nk/zCLbarrTL1+5nhIH8RZx7IKjbZeoZHsn+Avkv79bEv36xnOJNfnECsVHq2vOuTc3Wz2z0EOE9aB/aiCIYXwbTwkGe7bfr8iq7vIQTGp8ac7Rjoegaj5dOTgI2q0dlCfRphvXuuR1FUP9fZbhsclYtk27Z7YQ8ytjl3p6LYmM9Z2oDikjxHqLecPQGv92t2rW+pdaSHh+gQmsXW3Tomju8ci2sOejNfFEezwhZqxj6MZ6NH+8gXgg8KDQT3tQc8GKtUqVKlSv+S/gNDMnmHWLgZlAAAAABJRU5ErkJggg==",
		tasks: [
			{
				title: "AEM (CMS: Java, Javascript, HTL, CSS)",
				description: "AEM (CMS: Java, Javascript, HTL, CSS)",
				effective_time: new Date(),
				estimated_time: new Date(2022, 1, 14, 15, 0, 0),
				start_date: new Date(2021, 9, 15, 0, 0, 0, 0),
				end_date: new Date(2022, 1, 14, 15, 0, 0),
			},
			{
				title: "Travail en collaboration avec développeurs ADOBE",
				description: "Travail en collaboration avec développeurs ADOBE",
				effective_time: new Date(),
				estimated_time: new Date(2022, 1, 14, 15, 0, 0),
				start_date: new Date(2021, 9, 15, 0, 0, 0, 0),
				end_date: new Date(2022, 1, 14, 15, 0, 0),
			},
			{
				title: "Certification ADOBE AEM Front-End Developper",
				description: "Certification ADOBE AEM Front-End Developper",
				effective_time: new Date(),
				estimated_time: new Date(2022, 1, 14, 15, 0, 0),
				start_date: new Date(2021, 9, 15, 0, 0, 0, 0),
				end_date: new Date(2022, 1, 14, 15, 0, 0),
			},
			{
				title: "Création template et composants page restaurant",
				description: "Création template et composants page restaurant",
				effective_time: new Date(),
				estimated_time: new Date(2022, 1, 14, 15, 0, 0),
				start_date: new Date(2021, 9, 15, 0, 0, 0, 0),
				end_date: new Date(2022, 1, 14, 15, 0, 0),
			},
			{
				title: "Création du composant image (ADOBE Sensei)",
				description: "Création du composant image (ADOBE Sensei)",
				effective_time: new Date(),
				estimated_time: new Date(2022, 1, 14, 15, 0, 0),
				start_date: new Date(2021, 9, 15, 0, 0, 0, 0),
				end_date: new Date(2022, 1, 14, 15, 0, 0),
			},
		],
		statuses: statusName,
		roles: rolesName,
	},
	{
		title: "CNAV - OGEDA",
		description:
			"OGEDA est l’outil de gestion interne des alertes de la CNAV. J’ai pu maintenir l’application et développer de nouvelles fonctionnalités.",
		start_date: new Date(2022, 1, 17, 0, 0, 0, 0),
		end_date: new Date(2022, 6, 10, 15, 0, 0),
		photo: "data:image/jpeg;base64,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",
		tasks: [
			{
				title: "Java et GWT (Google Web Toolkit)",
				description: "Java et GWT (Google Web Toolkit)",
				effective_time: new Date(),
				estimated_time: new Date(2022, 6, 10, 15, 0, 0),
				start_date: new Date(2022, 1, 17, 0, 0, 0, 0),
				end_date: new Date(2022, 6, 10, 15, 0, 0),
			},
			{
				title: "Corrections bug de production et régression",
				description: "Corrections bug de production et régression",
				effective_time: new Date(2022, 6, 10, 15, 0, 0),
				estimated_time: new Date(2022, 6, 10, 15, 0, 0),
				start_date: new Date(2022, 1, 17, 0, 0, 0, 0),
				end_date: new Date(2022, 6, 10, 15, 0, 0),
			},
			{
				title: "Développement fonctionnalité rapport d’enquête",
				description: "Développement fonctionnalité rapport d’enquête",
				effective_time: new Date(2022, 6, 10, 15, 0, 0),
				estimated_time: new Date(2022, 6, 10, 15, 0, 0),
				start_date: new Date(2022, 1, 17, 0, 0, 0, 0),
				end_date: new Date(2022, 6, 10, 15, 0, 0),
			},
			{
				title: "Maintenance Administration Locale et nationale",
				description: "Maintenance Administration Locale et nationale",
				effective_time: new Date(2022, 6, 10, 15, 0, 0),
				estimated_time: new Date(2022, 6, 10, 15, 0, 0),
				start_date: new Date(2022, 1, 17, 0, 0, 0, 0),
				end_date: new Date(2022, 6, 10, 15, 0, 0),
			},
			{
				title: "Livraisons applications ",
				description: "Livraisons applications ",
				effective_time: new Date(2022, 6, 10, 15, 0, 0),
				estimated_time: new Date(2022, 6, 10, 15, 0, 0),
				start_date: new Date(2022, 1, 17, 0, 0, 0, 0),
				end_date: new Date(2022, 6, 10, 15, 0, 0),
			},
		],
		statuses: statusName,
		roles: rolesName,
	},
	{
		title: "Appli-Test",
		description: "bliblibli",
		start_date: new Date(),
		end_date: new Date(2022, 6, 12, 15, 0, 0),
		photo: "http://iaphare.org/wp-content/uploads/2018/11/Project-BG-2005.jpg",
		tasks: [
			{
				title: "Livraisons applications ",
				description: "Livraisons applications ",
				effective_time: new Date(2022, 6, 10, 15, 0, 0),
				estimated_time: new Date(2022, 6, 10, 15, 0, 0),
				start_date: new Date(2022, 1, 17, 0, 0, 0, 0),
				end_date: new Date(2022, 6, 10, 15, 0, 0),
			},
		],
	},
	{
		title: "CNAV - PBV",
		description:
			"Apport Amélioration au portail CNAV Pour Bien Vieillir permettant aux retraités de trouver des activités autour de chez eux. Apport de nouvelles fonctionnalités",
		start_date: new Date(2022, 6, 20, 0, 0, 0, 0),
		end_date: new Date(2022, 8, 30, 15, 0, 0),
		photo: "data:image/jpeg;base64,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",
		tasks: [
			{
				title: "Back API Java, Front Polymer.js",
				description: "Back API Java, Front Polymer.js",
				effective_time: new Date(2022, 8, 30, 15, 0, 0),
				estimated_time: new Date(2022, 8, 30, 15, 0, 0),
				start_date: new Date(2022, 6, 20, 0, 0, 0, 0),
				end_date: new Date(2022, 8, 30, 15, 0, 0),
			},
			{
				title: "Amélioration (style, cartographie, date picker)",
				description: "Amélioration (style, cartographie, date picker)",
				effective_time: new Date(2022, 6, 10, 15, 0, 0),
				estimated_time: new Date(2022, 6, 10, 15, 0, 0),
				start_date: new Date(2022, 1, 17, 0, 0, 0, 0),
				end_date: new Date(2022, 6, 10, 15, 0, 0),
			},
			{
				title: "Développement d’un nouveau date picker",
				description: "Développement d’un nouveau date picker",
				effective_time: new Date(2022, 6, 10, 15, 0, 0),
				estimated_time: new Date(2022, 6, 10, 15, 0, 0),
				start_date: new Date(2022, 1, 17, 0, 0, 0, 0),
				end_date: new Date(2022, 6, 10, 15, 0, 0),
			},
			{
				title: "Gestion des cookies",
				description: "Gestion des cookies",
				effective_time: new Date(2022, 6, 10, 15, 0, 0),
				estimated_time: new Date(2022, 6, 10, 15, 0, 0),
				start_date: new Date(2022, 1, 17, 0, 0, 0, 0),
				end_date: new Date(2022, 6, 10, 15, 0, 0),
			},
			{
				title: "Gestion état utilisateur connecté",
				description: "Livraisons applications ",
				effective_time: new Date(2022, 6, 10, 15, 0, 0),
				estimated_time: new Date(2022, 6, 10, 15, 0, 0),
				start_date: new Date(2022, 1, 17, 0, 0, 0, 0),
				end_date: new Date(2022, 6, 10, 15, 0, 0),
			},
		],
		statuses: statusName,
		roles: rolesName,
	},
	{
		title: "Appli-Test",
		description: "bliblibli",
		start_date: new Date(),
		end_date: new Date(2022, 6, 12, 15, 0, 0),
		photo: "http://iaphare.org/wp-content/uploads/2018/11/Project-BG-2005.jpg",
		tasks: myTasks,
		statuses: statusName,
		roles: rolesName,
	},
	{
		title: "Titre de Concepteur Développeur d'application",
		description:
			"Projet pour réaliser une démo lors de l'entretien de passage du titre",
		start_date: new Date(2022, 8, 1, 15, 0, 0),
		end_date: new Date(2022, 9, 12, 15, 0, 0),
		photo: "https://images.unsplash.com/photo-1556244573-c3686c0f0e78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80",
		tasks: [
			{
				title: "Passer le titre de concepteur développeur d'applications",
				description:
					"Passer le titre de concepteur développeur d'applications devant un jury incroyable et bienveillant",
				effective_time: new Date(2022, 9, 12, 15, 0, 0),
				estimated_time: new Date(2022, 9, 12, 15, 0, 0),
				start_date: new Date(2022, 8, 1, 15, 0, 0),
				end_date: new Date(2022, 9, 12, 15, 0, 0),
			},
			{
				title: "Créér une l'application TicketApp",
				description: "Créér une l'application TicketApp",
				effective_time: new Date(2022, 9, 12, 15, 0, 0),
				estimated_time: new Date(2022, 9, 12, 15, 0, 0),
				start_date: new Date(2022, 8, 1, 15, 0, 0),
				end_date: new Date(2022, 9, 12, 15, 0, 0),
			},
			{
				title: "Rédiger le cahier des charges",
				description: "Rédiger le cahier des charges",
				effective_time: new Date(2022, 9, 12, 15, 0, 0),
				estimated_time: new Date(2022, 9, 12, 15, 0, 0),
				start_date: new Date(2022, 8, 1, 15, 0, 0),
				end_date: new Date(2022, 9, 12, 15, 0, 0),
			},
			{
				title: "Rédiger le dossier Projet",
				description: "Rédiger le dossier Projet",
				effective_time: new Date(2022, 9, 12, 15, 0, 0),
				estimated_time: new Date(2022, 9, 12, 15, 0, 0),
				start_date: new Date(2022, 8, 1, 15, 0, 0),
				end_date: new Date(2022, 9, 12, 15, 0, 0),
			},
			{
				title: "Rédiger le dossier professionnel",
				description: "Rédiger le dossier professionnel",
				effective_time: new Date(2022, 9, 12, 15, 0, 0),
				estimated_time: new Date(2022, 9, 12, 15, 0, 0),
				start_date: new Date(2022, 8, 1, 15, 0, 0),
				end_date: new Date(2022, 9, 12, 15, 0, 0),
			},
		],
		statuses: statusName,
		roles: rolesName,
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
				p.users = project.title != "Appli-Test" ? users : [];
				const createdProject = await connection.manager.save(p);
				console.log("Saved a new project with named: " + p.title);
				await createNotification(
					`You've been added to the project ${project.title}! Keep calm and take your mark`,
					await p?.users,
					undefined,
					createdProject
				);
				if (project.statuses) {
					for (const status of project.statuses) {
						const s = new Status();
						s.title = status.title;
						s.isDoneStatus = status.isDoneStatus;
						s.project = createdProject;
						await connection.manager.save(s);
						console.log(
							"Saved a new status with named: " + s.title
						);
					}
				}
				const projectStatuses = await connection.manager.find(Status, {
					where: { project: createdProject },
				});
				if (project.roles) {
					let i = 0;
					for (const role of project.roles) {
						const r = new Role();
						r.title = role.title;
						r.project = createdProject;
						r.users = [users[i]];
						i++;
						await connection.manager.save(r);
						console.log("Saved a new role with named: " + r.title);
					}
				}
				if (project.tasks) {
					for (const task of project.tasks) {
						const t = new Task();
						t.title = task.title;
						t.description = task.description;
						t.status =
							(projectStatuses &&
								projectStatuses.find(
									(status) => status.title === "done"
								)) ||
							projectStatuses[0];
						t.project = createdProject;
						t.users = [users[4]] || [];
						t.effective_time = task.effective_time.toISOString();
						t.estimated_time = task.estimated_time.toISOString();
						t.start_date = task.start_date;
						t.end_date = task.end_date;
						const createdTask = await connection.manager.save(t);
						console.log(
							`Saved a new Task: ${t.title}. On project id: ${createdProject.id}`
						);
						await createNotification(
							`${project.title}: You have a new task: ${t.title}`,
							await createdTask.users,
							createdTask
						);
					}
				}
			}
			console.log("database seeded. 🚀");
		})
		.catch((error) => console.log(error));
};

runSeed();
