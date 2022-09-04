import React, { useEffect, useState } from "react";
import { BackBonesUser, Project, ProjectInput, StatusInput } from "../types";
import { gql, useMutation, useQuery } from "@apollo/client";
import Button from "../utils/Button";
import FormTitleInput from "./FormElements/FormTitleInput";
import FormTextInput from "./FormElements/FormTextInput";
import DropdownUsers from "../utils/DropdownUsers";
import AddStatusForm from "./AddStatusForm";
import FormDateInput from "./FormElements/FormDateInput";
import Duration from "../utils/Duration";
import { getStatusesToRemove } from "../utils/helper";

interface UpdateProjectFormProps {
	project: Project;
}

const ADD_STATUS = gql`
	mutation AddStatus($createStatusInput: CreateStatusInput!) {
		addStatus(createStatusInput: $createStatusInput) {
			id
		}
	}
`;

const UPDATE_STATUS = gql`
	mutation UpdateStatus(
		$updateStatusInput: UpdateStatusInput!
		$statusId: Float!
	) {
		updateStatus(
			updateStatusInput: $updateStatusInput
			statusId: $statusId
		) {
			id
		}
	}
`;

const UPDATE_PROJECT = gql`
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
				firstName
			}
		}
	}
`;

const GET_USERS = gql`
	query GetUsers {
		getUsers {
			id
			firstName
			lastName
			email
			avatar
		}
	}
`;

const DELETE_PROJECT = gql`
	mutation DeleteProject($projectId: Float!) {
		deleteProject(projectId: $projectId)
	}
`;

const DELETE_STATUS = gql`
	mutation DeleteStatus($statusId: Float!) {
		deleteStatus(statusId: $statusId)
	}
`;

const UpdateProjectForm = ({ project }: UpdateProjectFormProps) => {
	const [projectToUpdate, setProjectToUpdate] = useState(
		project as ProjectInput
	);
	const [users, setUsers] = useState<BackBonesUser[]>([]);
	const [deleteProject] = useMutation(DELETE_PROJECT);
	const [deleteStatus] = useMutation(DELETE_STATUS);
	const [updateProject] = useMutation(UPDATE_PROJECT);
	const [addStatus] = useMutation(ADD_STATUS);
	const [updateStatus] = useMutation(UPDATE_STATUS);
	const { data } = useQuery(GET_USERS);

	useEffect(() => {
		if (data) {
			setUsers(data.getUsers);
		}
	}, [data]);

	const handleUpdateProject = async () => {
		await updateProject({
			variables: {
				updateProjectInput: {
					start_date: projectToUpdate.start_date,
					end_date: projectToUpdate.end_date,
					photo: projectToUpdate.photo,
					users:
						projectToUpdate.users &&
						projectToUpdate.users.map((user) => {
							return {
								id: user.id,
							};
						}),
				},
				projectId: project.id,
			},
			refetchQueries: ["GetAuthorizedUser"],
			onError: (error) => {
				console.log(error);
			},
		});
		const statusesToRemove = getStatusesToRemove(
			project.statuses,
			projectToUpdate.statuses
		);
		if (statusesToRemove) {
			statusesToRemove.forEach((status) => {
				deleteStatus({
					variables: {
						statusId: status.id,
					},
					refetchQueries: ["GetAuthorizedUser"],
				});
			});
		}
	};

	const handleChangeInput = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setProjectToUpdate({
			...projectToUpdate,
			[event.target.name]: event.target.value,
		});
	};

	const handleChangeDate = (date: string, name: string) => {
		setProjectToUpdate({
			...projectToUpdate,
			[name]: date,
		});
	};

	const handleUpdateUsers = (user: BackBonesUser) => {
		if (
			projectToUpdate.users &&
			projectToUpdate.users.find((u) => u.id === user.id)
		) {
			setProjectToUpdate({
				...projectToUpdate,
				users: projectToUpdate.users.filter((u) => u.id !== user.id),
			});
		} else if (projectToUpdate.users) {
			setProjectToUpdate({
				...projectToUpdate,
				users: [...projectToUpdate.users, { id: user.id }],
			});
		} else {
			setProjectToUpdate({
				...projectToUpdate,
				users: [{ id: user.id }],
			});
		}
	};

	const handleUpdateStatuses = (statuses: StatusInput[]) => {
		setProjectToUpdate({
			...projectToUpdate,
			statuses: statuses,
		});
		statuses.forEach(async (status) => {
			if (!status.id) {
				await addStatus({
					variables: {
						createStatusInput: {
							title: status.title,
							isDoneStatus: status.isDoneStatus,
							project: {
								id: project.id,
							},
						},
					},
					refetchQueries: ["GetAuthorizedUser"],
					onError: (error) => {
						console.log(error);
					},
				}).then((res) => {
					status.id = res.data.addStatus.id;
				});
			} else if (project.statuses) {
				const originalStatus = project.statuses.find(
					(s) => s.id === status.id
				);
				if (originalStatus) {
					if (originalStatus.title !== status.title) {
						console.log("status update title", status);
						await updateStatus({
							variables: {
								updateStatusInput: {
									title: status.title,
								},
								statusId: status.id,
							},
							refetchQueries: ["GetAuthorizedUser"],
							onError: (error) => {
								console.log(error);
							},
						});
					} else if (
						originalStatus.isDoneStatus !== status.isDoneStatus
					) {
						console.log("staus update isDoneStatus", status);
						await updateStatus({
							variables: {
								updateStatusInput: {
									isDoneStatus: status.isDoneStatus,
								},
								statusId: status.id,
							},
							refetchQueries: ["GetAuthorizedUser"],
							onError: (error) => {
								console.log(error);
							},
						});
					}
				}
			}
		});
	};

	const handleDelete = async () => {
		await deleteProject({
			variables: { projectId: project.id },
			refetchQueries: ["GetAuthorizedUser"],
			onError: (error) => {
				console.log(error);
			},
		});
	};

	return (
		<div className={""}>
			<div className="p-4 w-full">
				<FormTitleInput
					label="Title"
					placeholder="Enter title"
					value={project.title}
					name="title"
					onChange={handleChangeInput}
				/>
				<FormTextInput
					label="Description"
					value={project.description || ""}
					onChange={handleChangeInput}
				/>
				<FormTitleInput
					label="Photo"
					placeholder="Enter photo url"
					name="photo"
					value={project.photo || ""}
					onChange={handleChangeInput}
				/>
				<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
					<div className="w-full lg:w-1/3 flex flex-col gap-2 lg:gap-1">
						{users && (
							<DropdownUsers
								title="Select members of project"
								users={users}
								usersOnList={projectToUpdate.users}
								updateUsers={handleUpdateUsers}
							/>
						)}
						<AddStatusForm
							addStatuses={handleUpdateStatuses}
							projectStatuses={project.statuses}
						/>
					</div>
					<div className="flex flex-col h-auto justify-around gap-2 lg:gap-1">
						<FormDateInput
							label={"Start date"}
							onChange={handleChangeDate}
							name="start_date"
							date={
								projectToUpdate.start_date
									? new Date(projectToUpdate.start_date)
									: undefined
							}
						/>
						<FormDateInput
							label={"End date"}
							onChange={handleChangeDate}
							name="end_date"
							date={
								projectToUpdate.end_date
									? new Date(projectToUpdate.end_date)
									: undefined
							}
						/>
					</div>
					<Duration
						start={projectToUpdate.start_date}
						end={projectToUpdate.end_date}
						label="Estimated time"
					/>
				</div>
				<div className="buttons flex w-full justify-center mt-2">
					<Button
						label={"Save"}
						state="enabled"
						onClick={handleUpdateProject}
					/>
				</div>
			</div>
			<Button
				label="Delete Project"
				state="danger"
				onClick={handleDelete}
			/>
		</div>
	);
};

export default UpdateProjectForm;
