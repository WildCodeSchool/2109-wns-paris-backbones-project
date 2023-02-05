import {DocumentNode} from "graphql";
import {gql} from "apollo-server";
import {ProjectInput} from "../../inputs/ProjectInput";
import {RoleInput} from "../../inputs/RoleInput";
import {TaskInput} from "../../inputs/TaskInput";

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

export const GET_USER_BY_ID = (id: number) => {
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
  email: string,
  lastname: string,
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
  userId: number,
  firstname: string = "Thomas de l'internet",
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
