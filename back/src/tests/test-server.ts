import {config} from "dotenv";
import {createConnection, getConnectionOptions} from "typeorm";
import {buildSchema} from "type-graphql";
import {UserResolver} from "../resolvers/UserResolver";
import {TaskResolver} from "../resolvers/TaskResolver";
import {StatusResolver} from "../resolvers/StatusResolver";
import {RoleResolver} from "../resolvers/RoleResolver";
import {ProjectResolver} from "../resolvers/ProjectResolver";
import {AuthResolver} from "../resolvers/AuthResolver";
import {customAuthChecker} from "../auth";
import {ApolloServer} from "apollo-server";
import {SIGNIN} from "./gqlQueries/auth.query";


export const testServer = async () => {
  config({path: `.env.${process.env.NODE_ENV}`});
  const connectionOptions = await getConnectionOptions("test");
  await createConnection({...connectionOptions, name: "default"});
  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      TaskResolver,
      StatusResolver,
      RoleResolver,
      ProjectResolver,
      AuthResolver,
    ],
    authChecker: customAuthChecker,
  });
  const server = new ApolloServer({
    schema,
    context: ({req}) => {
      return {token: req?.headers.authorization, userId: null};
    },
  });
  await server.listen(9000);
  console.log(
    "Apollo Server Test has started! visit: http://localhost:9000/"
  );
  return server;
};
