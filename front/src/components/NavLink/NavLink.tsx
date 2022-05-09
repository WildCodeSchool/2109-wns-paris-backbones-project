import React from "react";

export interface Route {
	label: string;
	href: string;
	icon: JSX.Element;
}

function NavLink({ route }: { route: Route }) {
	return (
		<div className="flex items-center justify-center gap-2">
			<div className="text-primary-medium">{route.icon}</div>
			<p>{route.label}</p>
		</div>
	);
}

export default NavLink;
