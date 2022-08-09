import React from "react";
import ProjectList from "../components/Project/ProjectList";
import { Project } from "../components/types";
import AddAccordion from "../components/utils/AddAccordion";
import AddProjectForm from "../components/Form/AddProjectForm";

interface ProjectsProps {
	projects: Project[];
}
function Projects({ projects }: ProjectsProps) {
	return (
		<>
			<AddAccordion title={"Add Project"}>
				<AddProjectForm />
			</AddAccordion>

			<ProjectList projects={projects} />
		</>
	);
}

export default Projects;
