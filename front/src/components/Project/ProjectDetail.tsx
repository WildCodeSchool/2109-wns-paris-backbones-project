import React, { useEffect, useState } from "react";
import { Project } from "../types";
import ProgressBar from "../utils/ProgressBar";
import UserBadge from "../UserBadge/UserBadge";
import { TasksList } from "../Task/TasksList";
import AddAccordion from "../utils/AddAccordion";
import Counter from "../utils/Counter";
import AddTaskForm from "../Form/AddTaskForm";
import { gql, useMutation } from "@apollo/client";
import Button from "../utils/Button";

interface ProjectDetailProps {
	project: Project;
}

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

const ProjectDetail = ({ project }: ProjectDetailProps) => {
	const [isModify, setIsModify] = useState(false);
	const [projectToUpdate, setProjectToUpdate] = useState(project);
	const [progress, setProgress] = useState(0);
	const { tasks, users, title, description } = project;

	const [updateProject] = useMutation(UPDATE_PROJECT);

	useEffect(() => {
		const tasksDone = tasks
			? tasks.filter((task) => task.status && task.status.isDoneStatus)
					.length
			: 0;
		const tasksTotal = tasks ? tasks.length : 0;
		if (tasksTotal && tasksDone) {
			setProgress(Math.floor((tasksDone / tasksTotal) * 100));
		}
	}, [tasks]);

	const handleUpdate = async () => {
		await updateProject({
			variables: {
				projectId: projectToUpdate.id,
				updateProjectInput: {
					title: projectToUpdate.title,
					description: projectToUpdate.description,
				},
			},
			refetchQueries: ["GetAuthorizedUser"],
			onError: (error) => {
				console.log(error);
			},
		});
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isModify) {
			await handleUpdate();
			setIsModify(false);
		}
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setProjectToUpdate({
			...projectToUpdate,
			[event.target.name]: event.target.value,
		});
		setIsModify(true);
	};

	return (
		<div className="project-detail-card mb-4">
			<form
				className="project-header w-full mt-3 justify-between items-center"
				onSubmit={handleSubmit}
			>
				<div className="project-header-title-progress flex flex-col lg:flex-row justify-between gap-4">
					<div className="project-title w-1/2">
						<input
							name={"title"}
							type="text"
							value={projectToUpdate.title}
							onChange={handleChange}
							className="font-main-bold text-xl dark:bg-dark-dark focus:outline-none w-full truncate"
						/>
					</div>
					<div className="project-progress-bar w-full lg:w-1/3">
						<ProgressBar progress={progress} />
					</div>
				</div>
				<div className="project-description mt-4">
					<textarea
						name={"description"}
						value={projectToUpdate.description}
						onChange={handleChange}
						className="text-sm dark:bg-dark-dark font-main-light outline-none focus:outline-primary-medium w-full h-24"
					/>
				</div>
				<div className="project-infos flex justify-end mt-4 font-main-extralight text-sm">
					<div className="project-tasks-count mr-3">
						<Counter count={tasks?.length} unit={"task"} />
					</div>
					<div className="project-members-count">
						<Counter count={users?.length} unit={"user"} />
					</div>
				</div>
				<div className="project-members flex justify-end">
					{users &&
						users.map((user) => (
							<div className="ml-2" key={user.id}>
								<UserBadge
									user={user}
									size="small"
									withFirstName={false}
								/>
							</div>
						))}
				</div>
				<div className="buttons flex justify-center gap-20">
					<Button
						label="Save"
						state={isModify ? "enabled" : "disabled"}
						onClick={(e: React.FormEvent<HTMLFormElement>) =>
							handleSubmit(e)
						}
					/>
				</div>
			</form>
			<div className="project-tasks">
				<AddAccordion title={"New Task"}>
					<AddTaskForm project={project} />
				</AddAccordion>
				<div className="project-tasks-list bg-dark-darker rounded-2xl">
					{tasks ? <TasksList tasks={tasks} /> : "No tasks yet"}
				</div>
			</div>
		</div>
	);
};

export default ProjectDetail;
