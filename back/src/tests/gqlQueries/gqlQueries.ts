import { gql } from "apollo-server";
import { DocumentNode } from "graphql";

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

export const ADD_USER = (email: String, lastname: String) => {
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
			},
		},
	};
};

export const UPDATE_USER = (userId: Number) => {
	const mutationUpdateUser: DocumentNode = gql`
		mutation UpdateUser(
			$updateUserInput: UpdateUserInput!
			$userId: Float!
		) {
			updateUser(updateUserInput: $updateUserInput, userId: $userId) {
				id
				firstName
				email
				role {
					title
				}
			}
		}
	`;
	return {
		query: mutationUpdateUser,
		variables: {
			updateUserInput: {
				firstName: "Thomas de l'internet",
				role: {
					id: 1,
				},
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

export const ADD_TASK = (taskName: String, ProjectId: number = 1) => {
	const mutationAddTask: DocumentNode = gql`
		mutation AddTask($createTaskInput: CreateTaskInput!) {
			addTask(createTaskInput: $createTaskInput) {
				id
				title
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
					"id": 1
				}
			},
		},
	};
};

export const UPDATE_TASK = (taskId: Number, taskTitle: string | undefined, projectId: number = 1) => {
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
			}
		}
	`;
	return {
		query: mutationUpdateTask,
		variables: {
			updateTaskInput: {
				title: taskTitle,
				status: {
					id: 3,
				},
				project: {
					"id": projectId,
				}
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
				status {
					title
				}
			}
		}
	`;
	return {
		query: mutationUpdateProject,
		variables: {
			updateProjectInput: {
				title: "brand new project name",
				status: {
					id: 2,
				},
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

export const ADD_ROLE = (title: String) => {
	const mutationAddRole: DocumentNode = gql`
		mutation AddRole($createRoleInput: CreateRoleInput!) {
			addRole(createRoleInput: $createRoleInput) {
				id
				title
			}
		}
	`;
	return {
		query: mutationAddRole,
		variables: {
			createRoleInput: {
				title: title,
			},
		},
	};
};

export const UPDATE_ROLE = (id: Number) => {
	const mutationUpdateRole: DocumentNode = gql`
		mutation UpdateRole($updateRoleInput: UpdateRoleInput!, $roleId: Float!) {
			updateRole(updateRoleInput: $updateRoleInput, roleId: $roleId) {
				id
				title
			}
		}
	`;
	return {
		query: mutationUpdateRole,
		variables: {
			updateRoleInput: {
				title: "brand new role title",
			},
			roleId: id,
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

export const ADD_STATUS = (title: String) => {
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
			},
		},
	};
};

export const UPDATE_STATUS = (id: Number) => {
	const mutationUpdateStatus: DocumentNode = gql`
		mutation UpdateStatus($updateStatusInput: UpdateStatusInput!, $statusId: Float!) {
			updateStatus(updateStatusInput: $updateStatusInput, statusId: $statusId) {
				title
				id
			}
		}
	`;
	return {
		query: mutationUpdateStatus,
		variables: {
			updateStatusInput: {
				title: "brand new status title",
			},
			statusId: id,
		},
	};
};