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
	UPDATE_USER, GET_ROLE_BY_ID, ADD_ROLE, UPDATE_ROLE, GET_STATUS_BY_ID, ADD_STATUS, UPDATE_STATUS,
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
		await expect(project?.title).toBe("Appli");
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
			const response = await server.executeOperation(GET_USER_BY_ID(1));
			const user = await BackBonesUser.findOne(1);
			expect(response.data?.getUserById.firstName).toBe(user?.firstName);
		});

		it("test query getUserById expect user id 100 throw an error", async () => {
			const response = await server.executeOperation(GET_USER_BY_ID(100));
			expect(response.errors).toBeTruthy();
		});

		it("test mutation addUser expect createdUser id equal to user with same id", async () => {
			const response = await server.executeOperation(
				ADD_USER("timtim@gmail.com", "Cook")
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
				ADD_USER("myriam@gmail.com", "Cook")
			);
			expect(response.errors).toBeTruthy();
		});

		it("test mutation addUser expect user rejected because no lastname", async () => {
			const response = await server.executeOperation(
				ADD_USER("myriam@gmail.com", "")
			);
			expect(response.errors).toBeTruthy();
		});

		it("test mutation updateUser expect updatedUser name equal to user name with same id", async () => {
			const response = await server.executeOperation(UPDATE_USER(5));
			const updatedUser = await BackBonesUser.findOne(
				response.data?.updateUser.id
			);
			let firstName = updatedUser?.firstName;
			const role = await updatedUser?.role;

			expect(response.data?.updateUser.firstName).toBe(firstName);
			expect(response.data?.updateUser.role.title).toBe(role?.title);
		});

		it("test mutation updateUser expect updatedUser can't be updated because not found", async () => {
			const response = await server.executeOperation(UPDATE_USER(1900));
			expect(response.errors).toBeTruthy();
		});
	});

	describe("test TaskResolver", () => {
		it("test query getTasks comparing data in db  ", async () => {
			const tasks = await Task.find();
			const response = await server.executeOperation(GET_TASKS());
			expect(response.data?.getTasks.length).toEqual(tasks.length);
		});

		it("test query getTaskById expect task id 1 to be 'task title 0'", async () => {
			const response = await server.executeOperation(GET_TASK_BY_ID(1));
			const task = await Task.findOne(1);
			expect(response.data?.getTaskById.title).toBe(task?.title);
		});

		it("test query getTaskById expect task id 100 throw an error", async () => {
			const response = await server.executeOperation(GET_TASK_BY_ID(100));
			expect(response.errors).toBeTruthy();
		});

		it("test mutation addTask expect createdTask id equal to task with same id", async () => {
			const response = await server.executeOperation(
				ADD_TASK("brand new task")
			);
			console.log(response);
			const createdTask = await Task.findOne(response.data?.addTask.id);
			const id = createdTask?.id;
			await createdTask?.remove();
			expect(response.data?.addTask.id).toBe(id);
		});

		it("test mutation addTask expect createdTask with no title throw an error", async () => {
			const response = await server.executeOperation(ADD_TASK(""));
			expect(response.errors).toBeTruthy();
		});

		it("test mutation addTask expect createdTask with same title on a project throw an error", async () => {
			const response = await server.executeOperation(ADD_TASK("task title 0"));
			expect(response.errors).toBeTruthy();
		});

		it("test mutation updateTask expect updatedTask title equal to task title with same id", async () => {
			const response = await server.executeOperation(UPDATE_TASK(3, "Brand new task name"));
			const updatedTask = await Task.findOne(
				response.data?.updateTask.id
			);
			const title = updatedTask?.title;
			const status = await updatedTask?.status;

			expect(response.data?.updateTask.title).toBe(title);
			expect(response.data?.updateTask.status.title).toBe(status?.title);
		});

		it("test mutation updateTask expect updatedTask can't be updated because not found", async () => {
			const response = await server.executeOperation(UPDATE_TASK(1900, "balek"));

			expect(response.errors).toBeTruthy();
		});

		it("test mutation Update Task expect updatedTask with same title on a project throw an error", async () => {
			const response = await server.executeOperation(UPDATE_TASK(2, "task title 0"));
			expect(response.errors).toBeTruthy();
		});

		it("test mutation Update Task expect updatedTask project's destination contain a task with same title throw an error", async () => {
			const response = await server.executeOperation(UPDATE_TASK(2, undefined, 2));
			expect(response.errors).toBeTruthy();
		});
	});

	describe("test ProjectResolver", () => {
		it("test query getProjects comparing data in db  ", async () => {
			const projects = await Project.find();
			const response = await server.executeOperation(GET_PROJECTS());
			expect(response.data?.getProjects.length).toEqual(projects.length);
		});

		it("test query getProjectById expect Project id 1 to be 'Appli'", async () => {
			const response = await server.executeOperation(
				GET_PROJECT_BY_ID(1)
			);
			const project = await Project.findOne(1);
			expect(response.data?.getProjectById.title).toBe(project?.title);
		});

		it("test query getProjectById expect Project id 100 throw an error", async () => {
			const response = await server.executeOperation(
				GET_PROJECT_BY_ID(100)
			);
			expect(response.errors).toBeTruthy();
		});

		it("test mutation addProject expect createdProject id equal to project with same id", async () => {
			const response = await server.executeOperation(
				ADD_PROJECT("brand new project")
			);
			const createdProject = await Project.findOne(
				response.data?.addProject.id
			);
			const id = createdProject?.id;
			await createdProject?.remove();
			expect(response.data?.addProject.id).toBe(id);
		});

		it("test mutation addProject expect createdProject with no title throw an error", async () => {
			const response = await server.executeOperation(ADD_PROJECT(""));
			expect(response.errors).toBeTruthy();
		});

		it("test mutation updateProject expect updatedProject title equal to project title with same id", async () => {
			const response = await server.executeOperation(UPDATE_PROJECT(2));
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

		it("test mutation updateProject expect updatedProject can't be updated because not found", async () => {
			const response = await server.executeOperation(
				UPDATE_PROJECT(1900)
			);

			expect(response.errors).toBeTruthy();
		});
	});

	describe("test RoleResolver", () => {
		it("test query getRoles comparing data in db  ", async () => {
			const roles = await Role.find();
			const response = await server.executeOperation(GET_ROLES());
			expect(response.data?.getRoles.length).toEqual(roles.length);
		});

		it("test query getRoleById expect Role id 1 to be 'CTO'", async () => {
			const response = await server.executeOperation(
				GET_ROLE_BY_ID(1)
			);
			const role = await Role.findOne(1);
			expect(response.data?.getRoleById.title).toBe(role?.title);
		});

		it("test query getProjectRoleById expect Role id 100 throw an error", async () => {
			const response = await server.executeOperation(
				GET_ROLE_BY_ID(100)
			);
			expect(response.errors).toBeTruthy();
		});

		it("test mutation addRole expect created Role id equal to role with same id", async () => {
			const response = await server.executeOperation(
				ADD_ROLE("brand new role")
			);
			const createdRole = await Role.findOne(
				response.data?.addRole.id
			);
			const id = createdRole?.id;
			await createdRole?.remove();
			expect(response.data?.addRole.id).toBe(id);
		});

		it("test mutation addRole expect created Role with no title throw an error", async () => {
			const response = await server.executeOperation(ADD_ROLE(""));
			expect(response.errors).toBeTruthy();
		});

		it("test mutation updateProject expect updatedROLE title equal to role title with same id", async () => {
			const response = await server.executeOperation(UPDATE_ROLE(2));
			const updatedRole = await Role.findOne(
				response.data?.updateRole.id
			);
			const title = updatedRole?.title;

			expect(response.data?.updateRole.title).toBe(title);
		});

		it("test mutation updateRole expect updatedRole can't be updated because not found", async () => {
			const response = await server.executeOperation(
				UPDATE_ROLE(1900)
			);
			expect(response.errors).toBeTruthy();
		});
	});

	describe("test StatusResolver", () => {
		it("test query getStatuses comparing data in db  ", async () => {
			const statuses = await Status.find();
			const response = await server.executeOperation(GET_STATUSES());
			expect(response.data?.getStatuses.length).toEqual(statuses.length);
		});

		it("test query getStatusById expect Status id 1 to be 'in progress'", async () => {
			const response = await server.executeOperation(
				GET_STATUS_BY_ID(1)
			);
			const status = await Status.findOne(1);
			expect(response.data?.getStatusById.title).toBe(status?.title);
		});

		it("test query getStatusById expect Status id 100 throw an error", async () => {
			const response = await server.executeOperation(
				GET_STATUS_BY_ID(100)
			);
			expect(response.errors).toBeTruthy();
		});

		it("test mutation addStatus expect created Status id equal to status with same id", async () => {
			const response = await server.executeOperation(
				ADD_STATUS("brand new status")
			);
			const createdStatus = await Status.findOne(
				response.data?.addStatus.id
			);
			const id = createdStatus?.id;
			await createdStatus?.remove();
			expect(response.data?.addStatus.id).toBe(id);
		});

		it("test mutation addStatus expect created Status with no title throw an error", async () => {
			const response = await server.executeOperation(ADD_STATUS(""));
			expect(response.errors).toBeTruthy();
		});

		it("test mutation updateStatus expect updatedStatus title equal to status title with same id", async () => {
			const response = await server.executeOperation(UPDATE_STATUS(2));
			const updatedStatus = await Status.findOne(
				response.data?.updateStatus.id
			);
			const title = updatedStatus?.title;

			expect(response.data?.updateStatus.title).toBe(title);
		});

		it("test mutation updateStatus expect updatedStatus can't be updated because not found", async () => {
			const response = await server.executeOperation(
				UPDATE_STATUS(1900)
			);
			expect(response.errors).toBeTruthy();
		});
	});
});
