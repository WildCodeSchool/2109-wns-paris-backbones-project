import { createConnection, getConnectionOptions } from "typeorm";
import { ApolloServer } from "apollo-server";
import { UserResolver } from "./resolvers/UserResolver";
import { TaskResolver } from "./resolvers/TaskResolver";
import { StatusResolver } from "./resolvers/StatusResolver";
import { RoleResolver } from "./resolvers/RoleResolver";
import { ProjectResolver } from "./resolvers/ProjectResolver";
import { buildSchema } from "type-graphql";

async function main() {
	const connectionOptions = await getConnectionOptions("prod");
	await createConnection({ ...connectionOptions, name: "default" });

	const schema = await buildSchema({
		resolvers: [
			UserResolver,
			TaskResolver,
			StatusResolver,
			RoleResolver,
			ProjectResolver,
		],
	});
	const server = new ApolloServer({
		schema,
	});
	await server.listen(4000);
	console.log("Apollo Server has started! visit: http://localhost:4000/");
}
main();
