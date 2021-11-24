import { ApolloServer, gql } from "apollo-server";
import { createConnection } from "typeorm";
import { UserResolver } from "./resolvers/UserResolver";
import { TaskResolver } from "./resolvers/TaskResolver";
import { StatusResolver } from "./resolvers/StatusResolver";
import { RoleResolver } from "./resolvers/RoleResolver";
import { ProjectResolver } from "./resolvers/ProjectResolver";
import { buildSchema } from "type-graphql";
import { BackBonesUser } from "./entities/User";
import { Task } from "./entities/Task";
import { Role } from "./entities/Role";
import { Status } from "./entities/Status";
import { Project } from "./entities/Project";
import { ADD_USER, GET_USERS, GET_USER_BY_ID } from "./gqlQueries";

let server: ApolloServer;

beforeAll(async () => {
	await createConnection();
	const schema = await buildSchema({
		resolvers: [
			UserResolver,
			TaskResolver,
			StatusResolver,
			RoleResolver,
			ProjectResolver,
		],
	});
	server = new ApolloServer({
		schema,
	});
	await server.listen(4000);
	console.log("Apollo Server has started! visit: http://localhost:4000/");
});

afterAll(() => {
	server.stop();
});

describe("test data base", () => {
	it("user with id 1 is 'Myriam'", async () => {
		const user = await BackBonesUser.findOne(1);
		expect(user?.firstName).toBe("Myriam");
	});
	it("task with id 1 is 'task title 0'", async () => {
		const task = await Task.findOne(1);
		expect(task?.title).toBe("task title 0");
	});
	it("role with id 1 is 'CTO'", async () => {
		const role = await Role.findOne(1);
		expect(role?.title).toBe("CTO");
	});
	it("status with id 1 is 'in progress'", async () => {
		const status = await Status.findOne(1);
		expect(status?.title).toBe("in progress");
	});
	it("project with id 1 is 'Appli'", async () => {
		const project = await Project.findOne(1);
		expect(project?.title).toBe("Appli");
	});
});

describe("test Resolvers", () => {
	describe("test UserResolvers", () => {
		it("test query getUsers comparing data in db  ", async () => {
			const users = await BackBonesUser.find();
			const response = await server.executeOperation(GET_USERS());
			expect(response.data?.getUsers.length).toEqual(users.length);
		});

		it("test query getUserById expect user id 1 to be 'Myriam'", async () => {
			const response = await server.executeOperation(GET_USER_BY_ID());
			expect(response.data?.getUserById.firstName).toBe("Myriam");
		});

		it("test mutation addUser expect createdUser id equal to user with same id", async () => {
			const response = await server.executeOperation(ADD_USER());
			console.log(response);
			const createdUser = await BackBonesUser.findOne(
				response.data?.addUser.id
			);
			let id = createdUser?.id;
			await createdUser?.remove();
			expect(response.data?.addUser.id).toBe(id);
		});

		// it("test mutation updateUser expect updatedUser name equal to user name with same id", async () => {
		// 	const response = await server.executeOperation(ADD_USER());
		// 	console.log(response);
		// 	const createdUser = await BackBonesUser.findOne(
		// 		response.data?.addUser.id
		// 	);
		// 	let id = createdUser?.id;
		// 	await createdUser?.remove();
		// 	expect(response.data?.addUser.id).toBe(id);
		// });
	});
});
