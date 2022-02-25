import React, { useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import type { TaskData } from "../customTypes";
import tw from "../lib/tailwind";
import type { Style } from "twrnc/dist/esm/types";

interface Statuses {
	[key: string]: {
		status: "to do" | "done" | "in progress" | "late";
		icon:
			| "check-circle-outline"
			| "check-circle"
			| "access-time"
			| "timelapse";
		color: {
			dark: string;
			light: string;
		};
	};
}

const statuses: Statuses = {
	toDo: {
		status: "to do",
		icon: "check-circle-outline",
		color: {
			dark: "light-light",
			light: "dark-medium",
		},
	},
	done: {
		status: "done",
		icon: "check-circle",
		color: {
			dark: "primary-medium",
			light: "primary-medium",
		},
	},
	// @todo: handle these statuses later, only using to do and done for now
	inProgress: {
		status: "in progress",
		icon: "timelapse",
		color: {
			dark: "light-light",
			light: "dark-medium",
		},
	},
	late: {
		status: "late",
		icon: "access-time",
		color: {
			dark: "secondary-medium",
			light: "secondary-medium",
		},
	},
} as const;

interface IProps {
	task: TaskData;
	style?: Style;
}

const StatusIcon = ({ task, style }: IProps) => {
	let badgeStyle = statuses.toDo;

	useEffect(() => {
		if (task.status) {
			// @todo: implement custom statuses logic here
			if (task.status.title === "done") {
				badgeStyle = statuses.done;
			} else if (task.status.title === "in progress") {
				badgeStyle = statuses.inProgress;
			} else {
				badgeStyle = statuses.toDo;
			}
		} else {
			badgeStyle = statuses.toDo;
		}
	}, []);

	return (
		<MaterialIcons
			style={{ ...tw`text-3xl`, ...style }}
			color={
				tw.prefixMatch("dark")
					? tw.color(badgeStyle.color.dark)
					: tw.color(badgeStyle.color.light)
			}
			name={badgeStyle.icon}
		/>
	);
};

export default StatusIcon;
