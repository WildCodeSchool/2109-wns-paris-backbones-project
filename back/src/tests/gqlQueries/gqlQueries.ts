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
			getUserById(UserId: $userId) {
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
			addUser(CreateUserInput: $createUserInput) {
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
			updateUser(UpdateUserInput: $updateUserInput, UserId: $userId) {
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
			getTaskById(TaskId: $taskId) {
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

export const ADD_TASK = (taskName: String) => {
	const mutationAddTask: DocumentNode = gql`
		mutation AddTask($createTaskInput: CreateTaskInput!) {
			addTask(CreateTaskInput: $createTaskInput) {
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
			},
		},
	};
};

export const UPDATE_TASK = (id: Number) => {
	const mutationUpdateTask: DocumentNode = gql`
		mutation UpdateTask(
			$updateTaskInput: UpdateTaskInput!
			$TaskId: Float!
		) {
			updateTask(UpdateTaskInput: $updateTaskInput, TaskId: $TaskId) {
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
				title: "brand new name",
				status: {
					id: 3,
				},
			},
			TaskId: id,
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
			getProjectById(ProjectId: $projectId) {
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
			addProject(CreateProjectInput: $createProjectInput) {
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
				UpdateProjectInput: $updateProjectInput
				ProjectId: $projectId
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
