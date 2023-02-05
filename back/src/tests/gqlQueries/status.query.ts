import {DocumentNode} from "graphql";
import {gql} from "apollo-server";
import {TaskInput} from "../../inputs/TaskInput";

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

export const GET_STATUS_BY_ID = (id: number) => {
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
  title: string,
  projectId: number = 1,
  taskId: number = 1
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
        isDoneStatus: false,
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
  id: number,
  tasks: TaskInput[] | undefined = undefined,
  title: string = "brand new status title"
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
        isDoneStatus: false,
        tasks: tasks,
      },
      statusId: id,
    },
  };
};
