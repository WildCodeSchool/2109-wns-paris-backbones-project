import React from "react";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const Logo = () => {
	return (
		<div className={"w-1/4"}>
			<div className="flex flex-col items-center text-xl font-main-bold text-primary-darker">
				<CheckBoxIcon fontSize={"large"} />
				<div
					className={
						"flex flex-col items-center text-transparent bg-clip-text bg-gradient-to-r from-primary-darker to-primary-medium -mt-2"
					}
				>
					<h1>TicketApp</h1>
					<p
						className={
							"text-light-light font-main-extralight text-xxs self-start -mt-4 "
						}
					>
						Check your Boxes
					</p>
				</div>
			</div>
		</div>
	);
};

export default Logo;
