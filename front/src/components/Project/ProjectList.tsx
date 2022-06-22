import { Project } from "../types";
import ProjectCard from "./ProjectCard";
import AddIcon from "@mui/icons-material/Add";

interface ProjectListProps {
	projects: Project[];
}

function ProjectList({ projects }: ProjectListProps) {
	return (
		<div>
			<h1 className="text-2xl text-center">Projects</h1>
			<span className="flex align-center">
				<AddIcon className="text-primary-medium flex justify-self-end"/>
				Add a new project
			</span>
			<div className="flex flex-wrap justify-center">
				{projects.map((project) => (
					<ProjectCard key={project.id} project={project} />
				))}
			</div>
		</div>
	);
}

export default ProjectList;
