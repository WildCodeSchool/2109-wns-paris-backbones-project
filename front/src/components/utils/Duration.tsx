import React, { useEffect, useState } from "react";
import { HourglassEmpty } from "@material-ui/icons";

interface DurationProps {
	label: string;
	start?: string;
	end?: string;
	fixValue?: number;
}

const Duration = ({ label, start, end, fixValue }: DurationProps) => {
	const [value, setValue] = useState("");
	//compute duration

	useEffect(() => {
		if (start && end) {
			const startDate = new Date(start);
			const endDate = new Date(end);
			const duration = endDate.getTime() - startDate.getTime();
			const weeks = Math.floor(duration / (1000 * 60 * 60 * 24 * 7));
			const days = Math.floor(duration / (1000 * 60 * 60 * 24));
			const hours = Math.floor(
				(duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
			);
			console.log(weeks, days, hours);
			if (days > 0) {
				setValue(`${days} days`);
			} else if (hours > 0) {
				setValue(`${hours} hours`);
			}
		} else if (fixValue) {
			setValue(`${fixValue} days`);
		}
	}, [start, end, fixValue]);

	return (
		<div className="flex flex-raw">
			<HourglassEmpty
				fontSize={"medium"}
				className={"text-light-light"}
			/>
			<span className="font-main-bold px-4">{label}</span>
			<span
				className={`${
					!value && "text-dark-light font-main-extralight"
				}`}
			>
				{value ? value : "Not set"}
			</span>
		</div>
	);
};

export default Duration;
