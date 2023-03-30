import React from "react";
import { HourglassEmpty } from "@material-ui/icons";
import { differenceInDays } from "date-fns";

interface DurationProps {
	label: string;
	start?: string;
	end?: string;
	fixValue?: number;
}

const Duration = ({ label, start, end, fixValue = 0 }: DurationProps) => {
	const duration = start && end ? differenceInDays(new Date(end), new Date(start)) + 1 : fixValue;
	const value = duration > 0 ? `${duration} days` : "";

	return (
		<div className="flex items-center">
			<HourglassEmpty fontSize={"medium"} className={"text-light-light"} />
			<span className="font-main-bold px-4">{label}</span>
			<span className={value ? '' : 'text-dark-light font-main-extralight'}>
        {value ? value : "Not set"}
      </span>
		</div>
	);
};

export default Duration;
