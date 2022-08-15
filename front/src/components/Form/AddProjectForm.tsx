import React, { useEffect, useState } from "react";
import FormTitleInput from "./FormElements/FormTitleInput";
import FormTextInput from "./FormElements/FormTextInput";
import { BackBonesUser, ProjectInput, StatusInput } from "../types";
import DropdownUsers from "../utils/DropdownUsers";
import FormDateInput from "./FormElements/FormDateInput";
import Duration from "../utils/Duration";
import Button from "../utils/Button";
import { gql, useMutation, useQuery } from "@apollo/client";
import AddStatusForm from "./AddStatusForm";

const ADD_PROJECT = gql`
	mutation AddProject($createProjectInput: CreateProjectInput!) {
		addProject(createProjectInput: $createProjectInput) {
			id
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

const AddProjectForm = () => {
	const [projectToAdd, setProjectToAdd] = useState<ProjectInput>({});
	const [users, setUsers] = useState<BackBonesUser[]>([]);

	const [addProject] = useMutation(ADD_PROJECT);
	const { data } = useQuery(GET_USERS);

	useEffect(() => {
		if (data) {
			console.log(data);
			setUsers(data.getUsers);
		}
	}, [data]);

	const handleAdd = async () => {
		await addProject({
			variables: {
				updateProjectInput: {
					title: projectToAdd.title,
					description: projectToAdd.description,
					start_date: projectToAdd.start_date,
					end_date: projectToAdd.end_date,
					photo: projectToAdd.photo,
					users: projectToAdd.users,
					statuses: projectToAdd.statuses,
				},
			},
			refetchQueries: ["GetAuthorizedUser"],
			onError: (error) => {
				console.log(error);
			},
		});
	};

	const handleChangeInput = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setProjectToAdd({
			...projectToAdd,
			[event.target.name]: event.target.value,
		});
	};

	const handleChangeDate = (date: string, name: string) => {
		setProjectToAdd({
			...projectToAdd,
			[name]: date,
		});
	};

	const addUsers = (user: BackBonesUser) => {
		if (
			projectToAdd.users &&
			projectToAdd.users.find((u) => u.id === user.id)
		) {
			setProjectToAdd({
				...projectToAdd,
				users: projectToAdd.users.filter((u) => u.id !== user.id),
			});
		} else if (projectToAdd.users) {
			setProjectToAdd({
				...projectToAdd,
				users: [...projectToAdd.users, { id: user.id }],
			});
		} else {
			setProjectToAdd({
				...projectToAdd,
				users: [{ id: user.id }],
			});
		}
	};

	const addStatuses = (statuses: StatusInput[]) => {
		setProjectToAdd({
			...projectToAdd,
			statuses: statuses,
		});
	};

	return (
		<div className="p-4 w-full">
			<FormTitleInput
				label="Title"
				placeholder="Enter title"
				value=""
				name="title"
				onChange={handleChangeInput}
			/>
			<FormTextInput
				label="Description"
				value=""
				onChange={handleChangeInput}
			/>
			<FormTitleInput
				label="Photo"
				placeholder="Enter photo url"
				name="photo"
				value=""
				onChange={handleChangeInput}
			/>
			<div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
				<div className="w-full lg:w-1/3 flex flex-col gap-2 lg:gap-1">
					{users && (
						<DropdownUsers
							title="Select members of project"
							users={users}
							usersOnList={projectToAdd.users}
							updateUsers={addUsers}
						/>
					)}
					<AddStatusForm addStatuses={addStatuses} />
				</div>
				<div className="flex flex-col h-auto justify-around gap-2 lg:gap-1">
					<FormDateInput
						label={"Start date"}
						onChange={handleChangeDate}
						name="start_date"
					/>
					<FormDateInput
						label={"End date"}
						onChange={handleChangeDate}
						name="end_date"
					/>
				</div>
				<Duration
					start={projectToAdd.start_date}
					end={projectToAdd.end_date}
					label="Estimated time"
				/>
			</div>
			<div className="buttons flex w-full justify-center mt-2">
				<Button label={"Save"} state="enabled" onClick={handleAdd} />
			</div>
		</div>
	);
};

export default AddProjectForm;
