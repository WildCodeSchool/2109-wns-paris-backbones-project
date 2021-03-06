import { gql } from "apollo-server";
import { DocumentNode } from "graphql";
import { UserInput } from "../../inputs/UserInput";
import { TaskInput } from "../../inputs/TaskInput";
import { ProjectInput } from "../../inputs/ProjectInput";
import { RoleInput } from "../../inputs/RoleInput";

export const GET_USERS = () => {
	const queryGetUsers: DocumentNode = gql`
		query GetUsers {
			getUsers {
				id
			}
		}
	`;
	return { query: queryGetUsers };
};

export const GET_USER_BY_ID = (id: Number) => {
	const queryGetUserById: DocumentNode = gql`
		query GetUserById($userId: Float!) {
			getUserById(userId: $userId) {
				id
				firstName
				roles {
					title
					project {
						id
						title
					}
				}
			}
		}
	`;
	return {
		query: queryGetUserById,
		variables: {
			userId: id,
		},
	};
};

export const ADD_USER = (
	email: String,
	lastname: String,
	projects: ProjectInput[] | undefined = [{ id: 1 }, { id: 2 }],
	roles: RoleInput[] | undefined = [{ id: 3 }, { id: 8 }],
	tasks: TaskInput[] | undefined = [{ id: 4 }, { id: 9 }]
) => {
	const mutationAddUser: DocumentNode = gql`
		mutation AddUser($createUserInput: CreateUserInput!) {
			addUser(createUserInput: $createUserInput) {
				id
				email
			}
		}
	`;
	return {
		query: mutationAddUser,
		variables: {
			createUserInput: {
				firstName: "Tim",
				lastName: lastname,
				email: email,
				password: "azerty",
				avatar: "iznogoud.jpeg",
				projects: projects,
				tasks: tasks,
				roles: roles,
			},
		},
	};
};

export const UPDATE_USER = (
	userId: Number,
	firstname: String = "Thomas de l'internet",
	projects: ProjectInput[] | undefined = [{ id: 1 }, { id: 2 }],
	roles: RoleInput[] | undefined = [{ id: 3 }, { id: 8 }],
	tasks: TaskInput[] | undefined = [{ id: 4 }, { id: 9 }]
) => {
	const mutationUpdateUser: DocumentNode = gql`
		mutation UpdateUser(
			$updateUserInput: UpdateUserInput!
			$userId: Float!
		) {
			updateUser(updateUserInput: $updateUserInput, userId: $userId) {
				id
				firstName
				email
				roles {
					title
				}
			}
		}
	`;
	return {
		query: mutationUpdateUser,
		variables: {
			updateUserInput: {
				firstName: firstname,
				projects: projects,
				roles: roles,
				tasks: tasks,
			},
			userId: userId,
		},
	};
};

export const GET_TASKS = () => {
	const queryGetTasks: DocumentNode = gql`
		query GetTasks {
			getTasks {
				id
			}
		}
	`;
	return { query: queryGetTasks };
};

export const GET_TASK_BY_ID = (id: Number) => {
	const queryGetTaskById: DocumentNode = gql`
		query GetTaskById($taskId: Float!) {
			getTaskById(taskId: $taskId) {
				id
				title
			}
		}
	`;
	return {
		query: queryGetTaskById,
		variables: {
			taskId: id,
		},
	};
};

export const ADD_TASK = (
	taskName: string,
	projectId: number = 1,
	statusId: number = 3,
	users: UserInput[] | undefined = undefined
) => {
	const mutationAddTask: DocumentNode = gql`
		mutation AddTask($createTaskInput: CreateTaskInput!) {
			addTask(createTaskInput: $createTaskInput) {
				id
				title
				users {
					id
					firstName
				}
			}
		}
	`;
	return {
		query: mutationAddTask,
		variables: {
			createTaskInput: {
				title: taskName,
				description: "woooow what a task !!!",
				project: {
					id: projectId,
				},
				status: {
					id: statusId,
				},
				users: users,
			},
		},
	};
};

export const UPDATE_TASK = (
	taskId: Number,
	taskTitle: String | undefined,
	users: UserInput[] | undefined = undefined,
	statusId: Number | undefined = 3
) => {
	const mutationUpdateTask: DocumentNode = gql`
		mutation UpdateTask(
			$updateTaskInput: UpdateTaskInput!
			$taskId: Float!
		) {
			updateTask(updateTaskInput: $updateTaskInput, taskId: $taskId) {
				id
				title
				status {
					title
				}
				users {
					id
					firstName
				}
			}
		}
	`;
	return {
		query: mutationUpdateTask,
		variables: {
			updateTaskInput: {
				title: taskTitle,
				status: {
					id: statusId,
				},
				users: users,
			},
			taskId: taskId,
		},
	};
};

export const GET_PROJECTS = () => {
	const queryGetProjects: DocumentNode = gql`
		query GetProjects {
			getProjects {
				id
			}
		}
	`;
	return { query: queryGetProjects };
};

export const GET_PROJECT_BY_ID = (id: Number) => {
	const queryGetProjectById: DocumentNode = gql`
		query GetProjectById($projectId: Float!) {
			getProjectById(projectId: $projectId) {
				id
				title
			}
		}
	`;
	return {
		query: queryGetProjectById,
		variables: {
			projectId: id,
		},
	};
};

export const ADD_PROJECT = (title: String) => {
	const mutationAddProject: DocumentNode = gql`
		mutation AddProject($createProjectInput: CreateProjectInput!) {
			addProject(createProjectInput: $createProjectInput) {
				id
				title
			}
		}
	`;
	return {
		query: mutationAddProject,
		variables: {
			createProjectInput: {
				title: title,
				description: "woooow what a project !!!",
			},
		},
	};
};

export const UPDATE_PROJECT = (id: Number) => {
	const mutationUpdateProject: DocumentNode = gql`
		mutation UpdateProject(
			$updateProjectInput: UpdateProjectInput!
			$projectId: Float!
		) {
			updateProject(
				updateProjectInput: $updateProjectInput
				projectId: $projectId
			) {
				id
				title
			}
		}
	`;
	return {
		query: mutationUpdateProject,
		variables: {
			updateProjectInput: {
				title: "brand new project name",
			},
			projectId: id,
		},
	};
};

export const GET_ROLES = () => {
	const queryGetRoles: DocumentNode = gql`
		query GetRoles {
			getRoles {
				id
			}
		}
	`;
	return { query: queryGetRoles };
};

export const GET_ROLE_BY_ID = (id: Number) => {
	const queryGetRoleById: DocumentNode = gql`
		query GetRolesById($roleId: Float!) {
			getRoleById(roleId: $roleId) {
				id
				title
			}
		}
	`;
	return {
		query: queryGetRoleById,
		variables: {
			roleId: id,
		},
	};
};

export const ADD_ROLE = (
	title: String,
	projectId: Number = 2,
	users: UserInput[] | undefined = [{ id: 4 }, { id: 5 }]
) => {
	const mutationAddRole: DocumentNode = gql`
		mutation AddRole($createRoleInput: CreateRoleInput!) {
			addRole(createRoleInput: $createRoleInput) {
				id
				title
				users {
					id
					firstName
				}
			}
		}
	`;
	return {
		query: mutationAddRole,
		variables: {
			createRoleInput: {
				title: title,
				project: {
					id: projectId,
				},
				users: users,
			},
		},
	};
};

export const UPDATE_ROLE = (
	roleId: Number,
	users: UserInput[] = [{ id: 5 }],
	title: String = "brand new role for Thomas"
) => {
	const mutationUpdateRole: DocumentNode = gql`
		mutation UpdateRole(
			$updateRoleInput: UpdateRoleInput!
			$roleId: Float!
		) {
			updateRole(updateRoleInput: $updateRoleInput, roleId: $roleId) {
				id
				title
				users {
					id
					firstName
				}
			}
		}
	`;
	return {
		query: mutationUpdateRole,
		variables: {
			updateRoleInput: {
				title: title,
				users: users,
			},
			roleId: roleId,
		},
	};
};

export const GET_STATUSES = () => {
	const queryGetStatuses: DocumentNode = gql`
		query GetStatuses {
			getStatuses {
				id
			}
		}
	`;
	return { query: queryGetStatuses };
};

export const GET_STATUS_BY_ID = (id: Number) => {
	const queryGetStatusById: DocumentNode = gql`
		query GetStatusById($statusId: Float!) {
			getStatusById(statusId: $statusId) {
				title
			}
		}
	`;
	return {
		query: queryGetStatusById,
		variables: {
			statusId: id,
		},
	};
};

export const ADD_STATUS = (
	title: String,
	projectId: Number = 1,
	taskId: Number = 1
) => {
	const mutationAddStatus: DocumentNode = gql`
		mutation AddStatus($createStatusInput: CreateStatusInput!) {
			addStatus(createStatusInput: $createStatusInput) {
				id
				title
			}
		}
	`;
	return {
		query: mutationAddStatus,
		variables: {
			createStatusInput: {
				title: title,
				project: {
					id: projectId,
				},
				tasks: [
					{
						id: taskId,
					},
				],
			},
		},
	};
};

export const UPDATE_STATUS = (
	id: Number,
	tasks: TaskInput[] | undefined = undefined,
	title: String = "brand new status title"
) => {
	const mutationUpdateStatus: DocumentNode = gql`
		mutation UpdateStatus(
			$updateStatusInput: UpdateStatusInput!
			$statusId: Float!
		) {
			updateStatus(
				updateStatusInput: $updateStatusInput
				statusId: $statusId
			) {
				title
				id
			}
		}
	`;
	return {
		query: mutationUpdateStatus,
		variables: {
			updateStatusInput: {
				title: title,
				tasks: tasks,
			},
			statusId: id,
		},
	};
};

export const SIGNIN = (email: String, password: String) => {
	const mutationSignin: DocumentNode = gql`
		mutation SignIn($password: String!, $email: String!) {
			signIn(password: $password, email: $email)
		}
	`;
	return {
		query: mutationSignin,
		variables: {
			email: email,
			password: password,
		},
	};
};
