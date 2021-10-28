import "reflect-metadata";
import { createConnection } from "typeorm";
import { CustomUser } from "./entity/User";
// import { ApolloServer } from "apollo-server";
// import { BookResolver } from "./resolvers/BookResolver.ts";

createConnection()
  .then(async (connection) => {
    console.log("Inserting a new user into the database...");
    const user = new CustomUser();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(CustomUser);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");
  })
  .catch((error) => console.log(error));

// async function main() {
//   const connection = await createConnection();
//   const schema = await buildSchema({ resolvers: [BookResolver] });
//   const server = new ApolloServer({ schema });
//   await server.listen(4000);
//   console.log("Server has started!");
// }
