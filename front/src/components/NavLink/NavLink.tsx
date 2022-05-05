import React from "react";

export interface Route {
	label: string;
	href: string;
	icon: JSX.Element;
}

function NavLink({ route }: { route: Route }) {
	return (
		<div className="flex items-center justify-center gap-2">
			<div className=" text-primary-darker">{route.icon}</div>
			<p className="dark:text-light-light text-dark-dark">
				{route.label}
			</p>
		</div>
	);
}

export default NavLink;
