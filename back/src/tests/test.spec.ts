import {ApolloServer} from "apollo-server";
import {createConnection, getConnectionOptions} from "typeorm";
import {UserResolver} from "../resolvers/UserResolver";
import {TaskResolver} from "../resolvers/TaskResolver";
import {StatusResolver} from "../resolvers/StatusResolver";
import {RoleResolver} from "../resolvers/RoleResolver";
import {ProjectResolver} from "../resolvers/ProjectResolver";
import {buildSchema} from "type-graphql";
import {BackBonesUser} from "../entities/User";
import {Task} from "../entities/Task";
import {Role} from "../entities/Role";
import {Status} from "../entities/Status";
import {Project} from "../entities/Project";
import {AuthResolver} from "../resolvers/AuthResolver";
import {customAuthChecker} from "../auth";
import {config} from "dotenv";
import {SIGNIN, SIGNUP} from "./gqlQueries/auth.query";
import {ADD_USER, GET_USER_BY_ID, GET_USERS, UPDATE_USER} from "./gqlQueries/user.query";
import {ADD_TASK, GET_TASK_BY_ID, GET_TASKS, UPDATE_TASK} from "./gqlQueries/task.query";
import {ADD_PROJECT, DELETE_PROJECT, GET_PROJECT_BY_ID, GET_PROJECTS, UPDATE_PROJECT} from "./gqlQueries/project.query";
import {ADD_ROLE, GET_ROLE_BY_ID, GET_ROLES, UPDATE_ROLE} from "./gqlQueries/role.query";
import {ADD_STATUS, GET_STATUS_BY_ID, GET_STATUSES, UPDATE_STATUS} from "./gqlQueries/status.query";

interface IuserJwt {
  token: string;
  userId: number;
}

let server: ApolloServer;
let userJwt: IuserJwt;

beforeAll(async () => {
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
  server = new ApolloServer({
    schema,
    context: ({req}) => {
      return {token: req?.headers.authorization, userId: null};
    },
  });
  await server.listen(9000);
  console.log(
    "Apollo Server Test has started! visit: http://localhost:9000/"
  );
  const response = await server.executeOperation(
    SIGNIN("thomas@gmail.com", "azerty")
  );
  userJwt = response.data?.signIn;
});

afterAll(async () => {
  await server.stop();
});

describe("test data base", () => {
  it("user with id 1 is 'Myriam'", async () => {
    const user = await BackBonesUser.findOne(1);
    expect(user?.firstName).toBe("Myriam");
  });
  it("task with id 1 is 'AEM (CMS: Java, Javascript, HTL, CSS)'", async () => {
    const task = await Task.findOne(1);
    expect(task?.title).toBe("AEM (CMS: Java, Javascript, HTL, CSS)");
  });
  it("role with id 1 is 'CTO'", async () => {
    const role = await Role.findOne(1);
    expect(role?.title).toBe("CTO");
  });
  it("status with id 1 is 'in progress'", async () => {
    const status = await Status.findOne(1);
    expect(status?.title).toBe("in progress");
  });
  it("project with id 1 is 'Accor'", async () => {
    const project = await Project.findOne(1);
    await expect(project?.title).toBe("Accor");
  });
});

describe("test Resolvers", () => {
  describe("test AuthResolver", () => {
    describe("test signIn", () => {
      it("should return token for login", async () => {
        const response = await server.executeOperation(
          SIGNIN("myriam@gmail.com", "azerty")
        );
        expect(response.data?.signIn).toBeDefined();
      });
      it('should throw an error if user not in db', async () => {
        const response = await server.executeOperation(SIGNIN("nope@gmail.com", 'nope'))
        expect(response.errors).toBeTruthy()
      })
      it('should throw an error if password is wrong', async () => {
        const response = await server.executeOperation(SIGNIN("thomas@gmail.com", 'nope'))
        expect(response.errors).toBeTruthy()
      })
      it('should throw an error if something bad happen', async () => {
        //mock bcrypt.compare to throw error
        const response = await server.executeOperation(SIGNIN("", 'azerty'))
        expect(response.errors).toBeTruthy()
      })
    });
    describe("test signUp", () => {
      it("should return token for new user", async () => {
        const response = await server.executeOperation(
          SIGNUP("new@gmail.com", "azerty", "new", "new", "new")
        );
        expect(response.data?.signUp).toBeDefined();
      });
      it('should throw an error if user already in db', async () => {
        const response = await server.executeOperation(SIGNUP("thomas@gmail.com", "azerty", "new", "new", "new"))
        expect(response.errors).toBeTruthy()
      })
      it('should throw an error if email is not valid', async () => {
        const response = await server.executeOperation(SIGNUP("hololol", "azerty", "new", "new", "new"))
        expect(response.errors).toBeTruthy()
      })
      it('should throw an error if record in db failed', async function () {
        //mock BackboneUser.create to throw error
        const mockedCreate = jest.spyOn(BackBonesUser, 'create')
        mockedCreate.mockImplementationOnce(() => {
          throw new Error()
        })
        const response = await server.executeOperation(SIGNUP("hello@gmail.com", "azerty", "new", "new", "new"))
        expect(response.errors).toBeTruthy()
      });
    })
  });

  describe("test UserResolver", () => {
    describe("test query getUsers", () => {
      it("test query getUsers comparing data in db  ", async () => {
        const users = await BackBonesUser.find();
        const response = await server.executeOperation(GET_USERS());
        expect(response.data?.getUsers.length).toEqual(users.length);
      });
    });

    describe("test query getUserById", () => {
      it("test query getUserById expect user id 1 to be 'Myriam'", async () => {
        const response = await server.executeOperation(GET_USER_BY_ID(1));
        const user = await BackBonesUser.findOne(1);
        expect(response.data?.getUserById.firstName).toBe(user?.firstName);
      });

      it("test query getUserById expect user id 1 role's on project id 1 to be 'CTO' and 'Developer' on project 2", async () => {
        const response = await server.executeOperation(GET_USER_BY_ID(1));
        const user = await BackBonesUser.findOne(1);
        const responseRoleOnProject1 = await response.data?.getUserById
          .roles[0];
        const userRoles = await user?.roles;
        const userRoleOnProject1 = userRoles ? userRoles[0] : userRoles;
        expect(responseRoleOnProject1.title).toBe(
          userRoleOnProject1?.title
        );
      });

      it("test query getUserById expect user id 100 throw an error", async () => {
        const response = await server.executeOperation(GET_USER_BY_ID(100));
        expect(response.errors).toBeTruthy();
      });
    });

    describe("test mutation addUser", () => {
      it("test mutation addUser expect createdUser id equal to user with same id", async () => {
        const response = await server.executeOperation(
          ADD_USER("timtim@gmail.com", "Cook")
        );
        const createdUser = await BackBonesUser.findOne(
          response.data?.addUser.id
        );
        const id = createdUser?.id;
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
          ADD_USER("mymy@gmail.com", "")
        );
        expect(response.errors).toBeTruthy();
      });

      it("test mutation addUser expect user rejected because tasks not on users projects", async () => {
        const response = await server.executeOperation(
          ADD_USER(
            "myriou@gmail.com",
            "Hyyyyy",
            [{id: 1}, {id: 2}],
            [{id: 3}, {id: 9}],
            [{id: 4}, {id: 14}]
          )
        );
        expect(response.errors).toBeTruthy();
      });

      it("test mutation addUser expect user rejected because roles not on users projects", async () => {
        const response = await server.executeOperation(
          ADD_USER(
            "myriou@gmail.com",
            "Hyyyyy",
            [{id: 1}],
            [{id: 9}],
            [{id: 4}, {id: 5}]
          )
        );
        expect(response.errors).toBeTruthy();
      });
    });

    describe("test mutation updateUser", () => {
      it("test mutation updateUser expect updatedUser name equal to user name with same id", async () => {
        const response = await server.executeOperation(UPDATE_USER(5));

        const updatedUser = await BackBonesUser.findOne(
          response.data?.updateUser.id
        );
        const responseUser = await response.data?.updateUser;

        expect(responseUser.firstName).toBe(updatedUser?.firstName);
      });

      it("test mutation updateUser expect updatedUser can't be updated because not found", async () => {
        const response = await server.executeOperation(UPDATE_USER(1900));
        expect(response.errors).toBeTruthy();
      });

      it("test mutation UpdateUser expect user rejected because tasks not on users projects", async () => {
        const response = await server.executeOperation(
          UPDATE_USER(
            3,
            "Yo firstname",
            [{id: 1}],
            [{id: 3}, {id: 1}],
            [{id: 4}, {id: 14}]
          )
        );
        expect(response.errors).toBeTruthy();
      });

      it("test mutation UpdateUser expect user rejected because roles not on users projects", async () => {
        const response = await server.executeOperation(
          UPDATE_USER(
            3,
            "Miche miche",
            [{id: 2}],
            [{id: 2}],
            [{id: 6}, {id: 7}]
          )
        );
        expect(response.errors).toBeTruthy();
      });
    });
  });

  describe("test TaskResolver", () => {
    it("test query getTasks comparing data in db  ", async () => {
      const tasks = await Task.find();
      const response = await server.executeOperation(GET_TASKS());
      expect(response.data?.getTasks.length).toEqual(tasks.length);
    });

    describe("test query getTaskById", () => {
      it("test query getTaskById expect task id 1 to be 'task title 0'", async () => {
        const response = await server.executeOperation(GET_TASK_BY_ID(1));
        const task = await Task.findOne(1);
        expect(response.data?.getTaskById.title).toBe(task?.title);
      });

      it("test query getTaskById expect task id 100 throw an error", async () => {
        const response = await server.executeOperation(GET_TASK_BY_ID(100));
        expect(response.errors).toBeTruthy();
      });
    });

    describe("test mutation addTask", () => {
      it("test mutation addTask expect createdTask id equal to task with same id", async () => {
        const response = await server.executeOperation(
          ADD_TASK("brand new task"),
          {req: {headers: {authorization: userJwt.token}}} as any
        );
        const createdTask = await Task.findOne(response.data?.addTask.id);
        const id = createdTask?.id;
        await createdTask?.remove();
        expect(response.data?.addTask.id).toBe(id);
      });

      it("test mutation addTask expect createdTask with no title throw an error", async () => {
        const response = await server.executeOperation(ADD_TASK(""), {
          req: {headers: {authorization: userJwt.token}},
        } as any);
        expect(response.errors).toBeTruthy();
      });

      it("test mutation addTask expect createdTask with same title on a project throw an error", async () => {
        const response = await server.executeOperation(
          ADD_TASK("Create campaign posters")
        );
        expect(response.errors).toBeTruthy();
      });

      it("test mutation addTask expect addTask users return users added on a task", async () => {
        const response = await server.executeOperation(
          ADD_TASK("another new task for project 2", 2, 8, [{id: 4}]),
          {req: {headers: {authorization: userJwt.token}}} as any
        );
        const newTask = await Task.findOne(response.data?.addTask.id);
        const taskUsers = await newTask?.users;
        let expectedResponse: any[] = [];
        if (taskUsers) {
          for (const user of taskUsers) {
            expectedResponse = [
              ...expectedResponse,
              {firstName: user.firstName, id: user.id},
            ];
          }
        }
        expect(response.data?.addTask.users).toEqual(expectedResponse);
      });

      it("test mutation addTask expect addTask users throw an error because one user is not on project 2", async () => {
        const response = await server.executeOperation(
          ADD_TASK("another new new task for project 2", 2, 4),
          {req: {headers: {authorization: userJwt.token}}} as any
        );
        expect(response.errors).toBeTruthy();
      });

      it("test mutation addTask expect addTask throw an error because one user is not on project 2", async () => {
        const response = await server.executeOperation(
          ADD_TASK("another brand new new task for project 2", 2, 3, [
            {id: 4},
            {id: 6},
          ]),
          {req: {headers: {authorization: userJwt.token}}} as any
        );
        expect(response.errors).toBeTruthy();
      });
    });

    describe("test mutation updateTask", () => {
      it("test mutation updateTask expect updatedTask title equal to task title with same id", async () => {
        const response = await server.executeOperation(
          UPDATE_TASK(3, "Brand new task name")
        );
        const updatedTask = await Task.findOne(
          response.data?.updateTask.id
        );
        const title = updatedTask?.title;
        const status = await updatedTask?.status;

        expect(response.data?.updateTask.title).toBe(title);
        expect(response.data?.updateTask.status.title).toBe(status?.title);
      });

      it("test mutation updateTask expect updatedTask can't be updated because not found", async () => {
        const response = await server.executeOperation(
          UPDATE_TASK(1900, "balek")
        );

        expect(response.errors).toBeTruthy();
      });

      it("test mutation Update Task expect updatedTask with same title on a project throw an error", async () => {
        const response = await server.executeOperation(
          UPDATE_TASK(2, "AEM (CMS: Java, Javascript, HTL, CSS)")
        );
        expect(response.errors).toBeTruthy();
      });

      it("test mutation updateTask expect updatedTask users return users updated on a task", async () => {
        const response = await server.executeOperation(
          UPDATE_TASK(4, "the task name", [{id: 4}])
        );
        const updatedTask = await Task.findOne(4);
        const taskUsers = await updatedTask?.users;
        let expectedResponse: any[] = [];
        if (taskUsers) {
          for (const user of taskUsers) {
            expectedResponse = [
              ...expectedResponse,
              {id: user.id, firstName: user.firstName},
            ];
          }
        }
        expect(response.data?.updateTask.users).toEqual(expectedResponse);
      });

      it("test mutation updateTask expect updatedTask user throw an error because this user is not on the project", async () => {
        const response = await server.executeOperation(
          UPDATE_TASK(1, "brand new task name 2", [{id: 4}, {id: 6}])
        );
        expect(response.errors).toBeTruthy();
      });

      it("test mutation updateTask expect updatedTask status throw an error because this status is not on the project", async () => {
        const response = await server.executeOperation(
          UPDATE_TASK(1, "brand new task name 2", undefined, 7)
        );
        expect(response.errors).toBeTruthy();
      });

      it("test mutation updateTask expected user removed from task", async () => {
        const response = await server.executeOperation(
          UPDATE_TASK(2, "", [{id: 3}])
        );
        const updatedTask = await Task.findOne(2);
        const taskUsers = await updatedTask?.users;
        const result: any[] | undefined = taskUsers?.map((user) => {
          return {id: user.id, firstName: user.firstName};
        });
        expect(response.data?.updateTask.users).toEqual(result);
      });
    });
  });

  describe("test ProjectResolver", () => {
    describe("test query projects", () => {
      it("test query getProjects comparing data in db  ", async () => {
        const projects = await Project.find();
        const response = await server.executeOperation(GET_PROJECTS());
        expect(response.data?.getProjects.length).toEqual(projects.length);
      });
    });

    describe("test query getProject", () => {
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
    });

    describe("test mutation addProject", () => {
      it("test mutation addProject expect createdProject id equal to project with same id", async () => {
        const response = await server.executeOperation(
          ADD_PROJECT("brand new project"),
          {req: {headers: {authorization: userJwt.token}}} as any
        );
        const createdProject = await Project.findOne(
          response.data?.addProject.id
        );
        const id = createdProject?.id;
        //await createdProject?.remove();
        expect(response.data?.addProject.id).toBe(id);
      });

      it("test mutation addProject expect createdProject with no title throw an error", async () => {
        const response = await server.executeOperation(ADD_PROJECT(""));
        expect(response.errors).toBeTruthy();
      });
    });

    describe("test mutation updateProject", () => {
      it("test mutation updateProject expect updatedProject title equal to project title with same id", async () => {
        const response = await server.executeOperation(UPDATE_PROJECT(2));
        const updatedProject = await Project.findOne(
          response.data?.updateProject.id
        );
        const title = updatedProject?.title;

        expect(response.data?.updateProject.title).toBe(title);
      });

      it('should update users on project', async () => {
        const response = await server.executeOperation(
          UPDATE_PROJECT(4, [{id: 1}, {id: 2}, {id: 3}, {id: 5}, {id: 6}])
        );
        const updatedProject = await Project.findOne(
          response.data?.updateProject.id
        );
        const users = await updatedProject?.users;
        const result: any[] | undefined = users?.map((user) => {
          return {id: user.id, firstName: user.firstName, lastName: user.lastName};
        });
        expect(response.data?.updateProject.users).toEqual(result);
      });

      it("test mutation updateProject expect updatedProject can't be updated because not found", async () => {
        const response = await server.executeOperation(
          UPDATE_PROJECT(1900)
        );

        expect(response.errors).toBeTruthy();
      });
    });
    describe("test mutation deleteProject", () => {
      it("delete project", async () => {
        const response = await server.executeOperation(
          DELETE_PROJECT(7),
          {req: {headers: {authorization: userJwt.token}}} as any
        );

        expect(response.data?.deleteProject).toBe(true);
      });
      it("test mutation deleteProject expect deletedProject can't be deleted because not found", async () => {
        const response = await server.executeOperation(
          DELETE_PROJECT(1900),
          {req: {headers: {authorization: userJwt.token}}} as any
        );

        expect(response.errors).toBeTruthy();
      });
      it('should failed because user is not on project', async function () {
        const project = await Project.create({
          title: 'test',
          users: [{id: 1}, {id: 2}]
        }).save();
        const response = await server.executeOperation(
          DELETE_PROJECT(project.id),
          {req: {headers: {authorization: userJwt.token}}} as any
        );
        expect(response.errors).toBeTruthy();
      });
    })
  });

  describe("test RoleResolver", () => {
    describe("test query getRoles", () => {
      it("test query getRoles comparing data in db  ", async () => {
        const roles = await Role.find();
        const response = await server.executeOperation(GET_ROLES());
        expect(response.data?.getRoles.length).toEqual(roles.length);
      });
    });

    describe("test query getRoleById", () => {
      it("test query getRoleById expect Role id 1 to be 'CTO'", async () => {
        const response = await server.executeOperation(GET_ROLE_BY_ID(1));
        const role = await Role.findOne(1);
        expect(response.data?.getRoleById.title).toBe(role?.title);
      });

      it("test query getProjectRoleById expect Role id 100 throw an error", async () => {
        const response = await server.executeOperation(GET_ROLE_BY_ID(100));
        expect(response.errors).toBeTruthy();
      });
    });

    describe("test mutation addRole", () => {
      it("test mutation addRole expect created Role id equal to role with same id", async () => {
        const response = await server.executeOperation(
          ADD_ROLE("brand new role", 2)
        );
        const createdRole = await Role.findOne(response.data?.addRole.id);
        const id = createdRole?.id;
        await createdRole?.remove();
        expect(response.data?.addRole.id).toBe(id);
      });

      it("test mutation addRole expect created Role with no title throw an error", async () => {
        const response = await server.executeOperation(ADD_ROLE("", 2));
        expect(response.errors).toBeTruthy();
      });

      it("test mutation addRole expect created Role with same title on a project throw an error", async () => {
        const response = await server.executeOperation(ADD_ROLE("CTO"));
        expect(response.errors).toBeTruthy();
      });

      it("test mutation addRole expect addRole users return users added on a role", async () => {
        const response = await server.executeOperation(
          ADD_ROLE("another new role for project 2", 2)
        );
        const newRole = await Role.findOne(response.data?.addRole.id);
        const roleUsers = await newRole?.users;
        let expectedResponse: any[] = [];
        if (roleUsers) {
          for (const user of roleUsers) {
            expectedResponse = [
              ...expectedResponse,
              {firstName: user.firstName, id: user.id},
            ];
          }
        }
        expect(response.data?.addRole.users).toEqual(expectedResponse);
      });

      it("test mutation addRole expect addRole users throw an error because one user is not on project 2", async () => {
        const response = await server.executeOperation(
          ADD_ROLE("another new new role for project 2", 2, [
            {id: 4},
            {id: 6},
          ])
        );
        expect(response.errors).toBeTruthy();
      });
    });

    describe("test mutation updateRole", () => {
      it("test mutation updateRole expect updatedRole title equal to role title with same id", async () => {
        const response = await server.executeOperation(UPDATE_ROLE(2));
        const updatedRole = await Role.findOne(
          response.data?.updateRole.id
        );
        const title = updatedRole?.title;

        expect(response.data?.updateRole.title).toBe(title);
      });

      it("test mutation updateRole expect updatedRole throw an error because role with id doesn't exists", async () => {
        const response = await server.executeOperation(UPDATE_ROLE(500));

        expect(response.errors).toBeTruthy();
      });

      it("test mutation updateRole expect updatedRole users return users updated on a role", async () => {
        const response = await server.executeOperation(
          UPDATE_ROLE(2, [{id: 3}], "Change role too")
        );
        const updatedRole = await Role.findOne(2);
        const roleUsers = await updatedRole?.users;
        let expectedResponse: any[] = [];
        if (roleUsers) {
          for (const user of roleUsers) {
            expectedResponse = [
              ...expectedResponse,
              {firstName: user.firstName, id: user.id},
            ];
          }
        }
        expect(response.data?.updateRole.users).toEqual(expectedResponse);
      });

      it("test mutation updateRole expect updatedRole user throw an error because this user is not on the project", async () => {
        const response = await server.executeOperation(
          UPDATE_ROLE(1, [{id: 6}])
        );
        expect(response.errors).toBeTruthy();
      });

      it("test mutation updateRole expect updatedRole with same title on a project throw an error", async () => {
        const response = await server.executeOperation(
          UPDATE_ROLE(1, [{id: 5}], "Product Owner")
        );
        expect(response.errors).toBeTruthy();
      });
    });
  });

  describe("test StatusResolver", () => {
    describe("test query getStatuses", () => {
      it("test query getStatuses comparing data in db  ", async () => {
        const statuses = await Status.find();
        const response = await server.executeOperation(GET_STATUSES());
        expect(response.data?.getStatuses.length).toEqual(statuses.length);
      });
    });

    describe("test query getStatusById", () => {
      it("test query getStatusById expect Status id 1 to be 'in progress'", async () => {
        const response = await server.executeOperation(GET_STATUS_BY_ID(1));
        const status = await Status.findOne(1);
        expect(response.data?.getStatusById.title).toBe(status?.title);
      });
    });

    it("test query getStatusById expect Status id 100 throw an error", async () => {
      const response = await server.executeOperation(
        GET_STATUS_BY_ID(100)
      );
      expect(response.errors).toBeTruthy();
    });

    describe("test mutation addStatus", () => {
      it("test mutation addStatus expect created Status id equal to status with same id", async () => {
        const response = await server.executeOperation(
          ADD_STATUS("brand new status", undefined),
          {req: {headers: {authorization: userJwt.token}}} as any
        );
        const createdStatus = await Status.findOne(
          response.data?.addStatus.id
        );
        const id = createdStatus?.id;
        expect(response.data?.addStatus.id).toBe(id);
      });

      it("test mutation addStatus expect created Status with no title throw an error", async () => {
        const response = await server.executeOperation(
          ADD_STATUS("", undefined),
          {req: {headers: {authorization: userJwt.token}}} as any
        );
        expect(response.errors).toBeTruthy();
      });

      it("test mutation addStatus expect created Status with same title throw an error", async () => {
        const response = await server.executeOperation(
          ADD_STATUS("done", undefined)
        );
        expect(response.errors).toBeTruthy();
      });

      it("test mutation addStatus expect created Status with tasks not on throw an error", async () => {
        const response = await server.executeOperation(
          ADD_STATUS("new status", undefined, 7),
          {req: {headers: {authorization: userJwt.token}}} as any
        );
        expect(response.errors).toBeTruthy();
      });
    });

    describe("updateStatus", () => {
      it("test mutation updateStatus expect updatedStatus title equal to status title with same id", async () => {
        const response = await server.executeOperation(UPDATE_STATUS(2), {
          req: {headers: {authorization: userJwt.token}},
        } as any);
        const updatedStatus = await Status.findOne(
          response.data?.updateStatus.id
        );
        const title = updatedStatus?.title;

        expect(response.data?.updateStatus.title).toBe(title);
      });

      it("test mutation updateStatus expect updatedStatus can't be updated because not found", async () => {
        const response = await server.executeOperation(
          UPDATE_STATUS(1900),
          {req: {headers: {authorization: userJwt.token}}} as any
        );
        expect(response.errors).toBeTruthy();
      });

      it("test mutation updateStatus expect updatedStatus with same title throw an error", async () => {
        const response = await server.executeOperation(UPDATE_STATUS(1), {
          req: {headers: {authorization: userJwt.token}},
        } as any);
        expect(response.errors).toBeTruthy();
      });

      it("test mutation updateStatus expect updateStatus task throw an error because this task is not on the project", async () => {
        const response = await server.executeOperation(
          UPDATE_STATUS(5, [{id: 8}], "a new status again"),
          {req: {headers: {authorization: userJwt.token}}} as any
        );
        console.log(response);
        expect(response.errors).toBeTruthy();
      });
    });
  });
});
