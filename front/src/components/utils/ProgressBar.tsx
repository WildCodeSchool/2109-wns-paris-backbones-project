import React from "react";

interface ProgressBarProps {
	progress: number;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
	const textColor =
		progress < 50 ? "text-secondary-dark" : "text-primary-dark";
	const bgColor =
		progress < 50
			? "bg-gradient-to-r from-secondary-medium to-secondary-dark"
			: "bg-gradient-to-r from-primary-dark to-primary-darker";
	return (
		<div className="flex flex-col">
			<div
				className={
					"progress - bar - text font-main-extralight " + textColor
				}
			>
				{progress}% complete
			</div>
			<div className="progress-bar w-full">
				<div className="progress-bar-holder bg-light-light w-full h-5 rounded-2xl flex">
					<div
						className={
							"progress-bar-progress self-center m-0.5 h-4 rounded-2xl  " +
							bgColor
						}
						style={{
							width: `${progress}%`,
							transition: "1s ease",
							transitionDelay: "0.5s",
						}}
					></div>
				</div>
			</div>
		</div>
	);
};

export default ProgressBar;
