import React from "react";
import ProjectList from "../components/Project/ProjectList";
import { Project } from "../components/types";

interface ProjectsProps {
	projects: Project[];
}
function Projects({ projects }: ProjectsProps) {
	return (
		<>
			<ProjectList projects={projects} />
		</>
	);
}

export default Projects;
