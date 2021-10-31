import "reflect-metadata";
import { createConnection } from "typeorm";
import { BackBonesUser } from "./entity/User";
import { Role } from "./entity/Role";

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

createConnection()
	.then(async (connection) => {
		console.log("deleting database");
		const prevUsers = await connection.manager.find(BackBonesUser);
		await connection.manager.remove(prevUsers);
		const prevRoles = await connection.manager.find(Role);
		await connection.manager.remove(prevRoles);

		for (const role of rolesName) {
			const r = new Role();
			r.title = role;
			await connection.manager.save(r);
			console.log("Saved a new role: " + r.title);
		}
		const roles = await connection.manager.find(Role);

		for (const user of usersName) {
			console.log("Inserting a new user into the database...");
			const u = new BackBonesUser();
			u.firstName = user.firstName;
			u.lastName = user.lastName;
			u.email = user.email;
			u.role = roles.find((role) => role.title === user.role) || roles[0];
			await connection.manager.save(u);
			console.log("Saved a new user with named: " + u.firstName);
		}

		console.log("Loading users from the database...");
		const users = await connection.manager.find(BackBonesUser);
		console.log("Loaded users: ", users);
	})
	.catch((error) => console.log(error));
