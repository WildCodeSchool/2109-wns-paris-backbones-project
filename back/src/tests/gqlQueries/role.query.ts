import {DocumentNode} from "graphql";
import {gql} from "apollo-server";
import {UserInput} from "../../inputs/UserInput";

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

export const GET_ROLE_BY_ID = (id: number) => {
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
  title: string,
  projectId: number = 2,
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
  roleId: number,
  users: UserInput[] = [{ id: 5 }],
  title: string = "brand new role for Thomas"
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
