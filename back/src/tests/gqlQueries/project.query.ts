import {DocumentNode} from "graphql";
import {gql} from "apollo-server";
import {UserInput} from "../../inputs/UserInput";

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

export const GET_PROJECT_BY_ID = (id: number) => {
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

export const ADD_PROJECT = (title: string) => {
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
        users: [
          {
            id: 5,
          }
        ],
      },
    },
  };
};

export const UPDATE_PROJECT = (id: number, users? : UserInput[]) => {
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
                users {
                    id
                    firstName
                    lastName
                }
            }
        }
    `;
  return {
    query: mutationUpdateProject,
    variables: {
      updateProjectInput: {
        title: "brand new project name",
        users: users,
      },
      projectId: id,
    },
  };
};

export const DELETE_PROJECT = (id: number) => {
    const mutationDeleteProject: DocumentNode = gql`
        mutation DeleteProject($projectId: Float!) {
            deleteProject(projectId: $projectId)
        }
    `;
  return {
    query: mutationDeleteProject,
    variables: {
      projectId: id,
    },
  };
}
