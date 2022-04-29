import { Project } from "../types";

interface ProjectListProps {
	projects: Project[];
}

function ProjectList({ projects }: ProjectListProps) {
	//return list of all project name
	return (
		<div className="project-list">
			{projects.map((project) => (
				<div
					className="project-list-item bg-light-light"
					key={project.id}
				>
					<div className="project-list-item-name text-dark-light">
						{project.title}
					</div>
					<div className="project-list-item-description">
						{project.description}
					</div>
				</div>
			))}
		</div>
	);
}

export default ProjectList;
