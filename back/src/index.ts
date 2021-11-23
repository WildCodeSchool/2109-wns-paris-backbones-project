import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { UserResolver } from "./resolvers/UserResolver";
import { TaskResolver } from "./resolvers/TaskResolver";
import { StatusResolver } from "./resolvers/StatusResolver";
import { RoleResolver } from "./resolvers/RoleResolver";
import { buildSchema } from "type-graphql";

async function main() {
	await createConnection();
	const schema = await buildSchema({
		resolvers: [UserResolver, TaskResolver, StatusResolver, RoleResolver],
	});
	const server = new ApolloServer({
		schema,
	});
	await server.listen(4000);
	console.log("Apollo Server has started! visit: http://localhost:4000/");
}
main();
