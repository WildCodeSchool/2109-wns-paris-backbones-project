import { createConnection, getConnectionOptions } from "typeorm";
import { ApolloServer } from "apollo-server";
import { UserResolver } from "./resolvers/UserResolver";
import { TaskResolver } from "./resolvers/TaskResolver";
import { StatusResolver } from "./resolvers/StatusResolver";
import { RoleResolver } from "./resolvers/RoleResolver";
import { ProjectResolver } from "./resolvers/ProjectResolver";
import { buildSchema } from "type-graphql";
import { config } from "dotenv";
import { NotificationResolver } from "./resolvers/NotificationResolver";
import { customAuthChecker } from "./auth";
import { AuthResolver } from "./resolvers/AuthResolver";

config({ path: `.env.${process.env.NODE_ENV}` });

console.log(`You are in ${process.env.NODE_ENV} environment`);

async function main() {
	const connectionOptions = await getConnectionOptions(process.env.DB_NAME);

	let retries = 3;
	while (retries) {
		try {
			await createConnection({ ...connectionOptions, name: "default" });
			break;
		} catch (err) {
			console.log(err);
			retries -= 1;
			await new Promise((res) => setTimeout(res, 5000));
		}
	}

	const schema = await buildSchema({
		resolvers: [
			UserResolver,
			TaskResolver,
			StatusResolver,
			RoleResolver,
			ProjectResolver,
			NotificationResolver,
			AuthResolver,
		],
		authChecker: customAuthChecker,
	});
	const server = new ApolloServer({
		schema,
		context: ({ req }) => {
			return { token: req.headers.authorization, userId: null };
		},
	});
	await server.listen(4000);
	console.log("Apollo Server has started! visit: http://localhost:4000/");
}

main();
