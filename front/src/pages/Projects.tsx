import React from "react";
import ProjectList from "../components/Project/ProjectList";
import { Project } from "../components/types";
import AddOutlined from "@material-ui/icons/AddOutlined";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface ProjectsProps {
	projects: Project[];
}
function Projects({ projects }: ProjectsProps) {
	const [selectedDate, setSelectedDate] = React.useState<Date>();

	let footer = <p>Please pick a day.</p>;
	if (selectedDate) {
		footer = <p>You picked {format(selectedDate, "PP")}.</p>;
	}

	return (
		<>
			<div className="flex justify-center">
				<span className="text-2xl text-center">Projects</span>
				<AddOutlined className="text-primary-dark" fontSize="large" />
			</div>
			<DayPicker
				mode="single"
				selected={selectedDate}
				onSelect={setSelectedDate}
				footer={footer}
			/>

			<ProjectList projects={projects} />
		</>
	);
}

export default Projects;
