import { Project } from "../types";
import ProjectCard from "../ProjectCard/ProjectCard";


interface ProjectListProps {
	projects: Project[];
}

function ProjectList({ projects }: ProjectListProps) {
	return (
		<div>
			<h1 className="dark:text-light-light text-2xl text-center">
				Projects
			</h1>
			<div className="project-list flex justify-center justify-around">
				{projects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</div>
	);
}

export default ProjectList;
