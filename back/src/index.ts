import "reflect-metadata";
import { createConnection } from "typeorm";
import { BackBonesUser } from "./entity/User";
import { Role } from "./entity/Role";
// import { ApolloServer } from "apollo-server";

createConnection()
	.then(async (connection) => {
		console.log("Inserting a new Role into the database...");
		const role = new Role();
		role.title = "CTO";
		await connection.manager.save(role);
		console.log("Saved a new role with id: " + role.id);
		console.log("Inserting a new user into the database...");
		const user = new BackBonesUser();
		user.firstName = "Thomas";
		user.lastName = "Brouillet";
		user.email = "thomas@thomas.com";
		user.role = role;
		await connection.manager.save(user);
		console.log("Saved a new user with id: " + user.id);

		console.log("Loading users from the database...");
		const users = await connection.manager.find(BackBonesUser);
		console.log("Loaded users: ", users);

		console.log(
			"Here you can setup and run express/koa/any other framework."
		);
		console.log(user.role);
	})
	.catch((error) => console.log(error));

// async function main() {
//   const connection = await createConnection();
//   const schema = await buildSchema({ resolvers: [BookResolver] });
//   const server = new ApolloServer({ schema });
//   await server.listen(4000);
//   console.log("Server has started!");
// }
