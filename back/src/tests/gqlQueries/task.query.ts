import {DocumentNode} from "graphql";
import {gql} from "apollo-server";
import {UserInput} from "../../inputs/UserInput";

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

export const GET_TASK_BY_ID = (id: number) => {
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
  taskId: number,
  taskTitle: string | undefined,
  users: UserInput[] | undefined = undefined,
  statusId: number | undefined = 3
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
