import React from "react";

interface ButtonProps {
	label: string;
	state: "enabled" | "disabled" | "danger";
	onClick: () => void;
}

const Button = ({ label, state = "enabled", onClick }: ButtonProps) => {
	let stateStyling;

	const enabledStyling =
		"bg-gradient-to-r from-primary-light to-primary-dark rounded hover:from-secondary-light hover:to-secondary-dark";
	const disabledStyling =
		"bg-gradient-to-r from-gray-300 to-gray-400 rounded hover:bg-gray-600";
	const dangerStyling =
		"bg-gradient-to-r from-secondary-light to-secondary-dark rounded hover:bg-pink-700";

	switch (state) {
		case "enabled":
			stateStyling = enabledStyling;
			break;
		case "disabled":
			stateStyling = disabledStyling;
			break;
		case "danger":
			stateStyling = dangerStyling;
			break;
		default:
			stateStyling = enabledStyling;
			break;
	}

	return (
		<button
			className={
				"flex flex-col justify-center px-4 py-2 font-bold focus:outline-none focus:shadow-outline " +
				stateStyling
			}
			onClick={onClick}
		>
			{label}
		</button>
	);
};

export default Button;
