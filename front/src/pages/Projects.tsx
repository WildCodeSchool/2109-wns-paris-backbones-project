import React from "react";
import ProjectList from "../components/Project/ProjectList";
import { Project } from "../components/types";
import AddOutlined from "@material-ui/icons/AddOutlined";

interface ProjectsProps {
	projects: Project[];
}
function Projects({ projects }: ProjectsProps) {
	return (
		<>
			<div className="flex justify-center">
				<span className="text-2xl text-center">Projects</span>
				<AddOutlined className="text-primary-dark" fontSize="large" />
			</div>

			<ProjectList projects={projects} />
		</>
	);
}

export default Projects;
