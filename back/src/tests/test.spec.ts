import { ApolloServer } from "apollo-server";
import { createConnection, getConnectionOptions } from "typeorm";
import { UserResolver } from "../resolvers/UserResolver";
import { TaskResolver } from "../resolvers/TaskResolver";
import { StatusResolver } from "../resolvers/StatusResolver";
import { RoleResolver } from "../resolvers/RoleResolver";
import { ProjectResolver } from "../resolvers/ProjectResolver";
import { buildSchema } from "type-graphql";
import { BackBonesUser } from "../entities/User";
import { Task } from "../entities/Task";
import { Role } from "../entities/Role";
import { Status } from "../entities/Status";
import { Project } from "../entities/Project";
import {
	ADD_PROJECT,
	ADD_TASK,
	ADD_USER,
	GET_PROJECTS,
	GET_PROJECT_BY_ID,
	GET_ROLES,
	GET_STATUSES,
	GET_TASKS,
	GET_TASK_BY_ID,
	GET_USERS,
	GET_USER_BY_ID,
	UPDATE_PROJECT,
	UPDATE_TASK,
	UPDATE_USER,
} from "./gqlQueries/gqlQueries";
let server: ApolloServer;

beforeAll(async () => {
	const connectionOptions = await getConnectionOptions("test");
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
	server = new ApolloServer({
		schema,
	});
	await server.listen(9000);
	console.log(
		"Apollo Server Test has started! visit: http://localhost:9000/"
	);
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
	describe("test UserResolver", () => {
		it("test query getUsers comparing data in db  ", async () => {
			const users = await BackBonesUser.find();
			const response = await server.executeOperation(GET_USERS());
			expect(response.data?.getUsers.length).toEqual(users.length);
		});

		it("test query getUserById expect user id 1 to be 'Myriam'", async () => {
			const response = await server.executeOperation(GET_USER_BY_ID());
			const user = await BackBonesUser.findOne(1);
			expect(response.data?.getUserById.firstName).toBe(user?.firstName);
		});

		it("test mutation addUser expect createdUser id equal to user with same id", async () => {
			const response = await server.executeOperation(
				ADD_USER("timtim@gmail.com")
			);
			const createdUser = await BackBonesUser.findOne(
				response.data?.addUser.id
			);
			const id = createdUser?.id;
			await createdUser?.remove();
			expect(response.data?.addUser.id).toBe(id);
		});

		it("test mutation addUser expect user rejected because email conflict", async () => {
			const response = await server.executeOperation(
				ADD_USER("myriam@gmail.com")
			);
			console.log(response);
			expect(response.errors).toBeTruthy();
			//expect(response.data?.addUser.id).toBe(id);
		});

		it("test mutation updateUser expect updatedUser name equal to user name with same id", async () => {
			const response = await server.executeOperation(UPDATE_USER());
			const updatedUser = await BackBonesUser.findOne(
				response.data?.updateUser.id
			);
			let firstName = updatedUser?.firstName;
			const role = await updatedUser?.role;

			expect(response.data?.updateUser.firstName).toBe(firstName);
			expect(response.data?.updateUser.role.title).toBe(role?.title);
		});
	});

	describe("test TaskResolver", () => {
		it("test query getTasks comparing data in db  ", async () => {
			const tasks = await Task.find();
			const response = await server.executeOperation(GET_TASKS());
			expect(response.data?.getTasks.length).toEqual(tasks.length);
		});

		it("test query getTaskById expect task id 1 to be 'task title 0'", async () => {
			const response = await server.executeOperation(GET_TASK_BY_ID());
			const task = await Task.findOne(1);
			expect(response.data?.getTaskById.title).toBe(task?.title);
		});

		it("test mutation addTask expect createdTask id equal to task with same id", async () => {
			const response = await server.executeOperation(ADD_TASK());
			const createdTask = await Task.findOne(response.data?.addTask.id);
			const id = createdTask?.id;
			await createdTask?.remove();
			expect(response.data?.addTask.id).toBe(id);
		});

		it("test mutation updateTask expect updatedTask title equal to task title with same id", async () => {
			const response = await server.executeOperation(UPDATE_TASK());
			const updatedTask = await Task.findOne(
				response.data?.updateTask.id
			);
			const title = updatedTask?.title;
			const status = await updatedTask?.status;

			expect(response.data?.updateTask.title).toBe(title);
			expect(response.data?.updateTask.status.title).toBe(status?.title);
		});
	});

	describe("test ProjectResolver", () => {
		it("test query getProjects comparing data in db  ", async () => {
			const projects = await Project.find();
			const response = await server.executeOperation(GET_PROJECTS());
			expect(response.data?.getProjects.length).toEqual(projects.length);
		});

		it("test query getProjectById expect Project id 1 to be 'Appli'", async () => {
			const response = await server.executeOperation(GET_PROJECT_BY_ID());
			const project = await Project.findOne(1);
			expect(response.data?.getProjectById.title).toBe(project?.title);
		});

		it("test mutation addProject expect createdProject id equal to project with same id", async () => {
			const response = await server.executeOperation(ADD_PROJECT());
			const createdProject = await Project.findOne(
				response.data?.addProject.id
			);
			const id = createdProject?.id;
			await createdProject?.remove();
			expect(response.data?.addProject.id).toBe(id);
		});

		it("test mutation updateProject expect updatedProject title equal to project title with same id", async () => {
			const response = await server.executeOperation(UPDATE_PROJECT());
			const updatedProject = await Project.findOne(
				response.data?.updateProject.id
			);
			const title = updatedProject?.title;
			const status = await updatedProject?.status;

			expect(response.data?.updateProject.title).toBe(title);
			expect(response.data?.updateProject.status.title).toBe(
				status?.title
			);
		});
	});

	describe("test RoleResolver", () => {
		it("test query getRoles comparing data in db  ", async () => {
			const roles = await Role.find();
			const response = await server.executeOperation(GET_ROLES());
			expect(response.data?.getRoles.length).toEqual(roles.length);
		});
	});

	describe("test StatusResolver", () => {
		it("test query getStatuses comparing data in db  ", async () => {
			const statuses = await Status.find();
			const response = await server.executeOperation(GET_STATUSES());
			expect(response.data?.getStatuses.length).toEqual(statuses.length);
		});
	});
});
