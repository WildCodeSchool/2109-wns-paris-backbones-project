import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import { UserResolver } from "./resolver/UserResolver";
import { buildSchema } from "type-graphql";

async function main() {
	await createConnection();
	const schema = await buildSchema({ resolvers: [UserResolver] });
	const server = new ApolloServer({
		schema,
	});
	await server.listen(4000);
	console.log("Apollo Server has started! visit: http://localhost:4000/");
}

main();
