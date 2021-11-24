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

const userId = gql`
	query Query($userId: Float!) {
		getUserById(UserId: $userId) {
			id
			firstName
			lastName
			email
			avatar
			password
			role {
				title
			}
			tasks {
				id
				title
				description
			}
		}
	}
`;

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

describe("test resolvers", () => {
	it("getUserById'", async () => {
		const response = await server.executeOperation({
			query: userId,
			variables: { userId: 1 },
		});
		expect(response.data?.getUserById.firstName).toBe("Myriam");
	});
});
