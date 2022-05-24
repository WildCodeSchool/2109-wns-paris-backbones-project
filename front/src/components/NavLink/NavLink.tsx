import React from "react";
import { Link } from "react-router-dom";

export interface Route {
	label: string;
	href: string;
	icon: JSX.Element;
}

function NavLink({ route }: { route: Route }) {
	return (
		<Link to={route.href} className="flex items-center justify-center gap-2">
			<div className="text-primary-medium">{route.icon}</div>
			<p>{route.label}</p>
		</Link>
	);
}

export default NavLink;
