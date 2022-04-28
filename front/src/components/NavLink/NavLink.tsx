import React from "react";

export interface Route {
	label: string;
	href: string;
	icon: JSX.Element;
}

function NavLink({ route }: { route: Route }) {
	return (
		<div className="flex items-center justify-center">
			<div className="text-green-500">{route.icon}</div>
			<p className="text-white">{route.label}</p>
		</div>
	);
}

export default NavLink;
