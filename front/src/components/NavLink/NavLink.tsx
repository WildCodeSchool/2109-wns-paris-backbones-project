import React from "react";
import { Link } from "react-router-dom";

export interface Route {
	label: string;
	href: string;
	icon: JSX.Element;
	className?: string;
}

function NavLink({ route }: { route: Route }) {
	return (
		<Link
			to={route.href}
			className={
				"flex items-center gap-2" +
				(route.className ? " " + route.className : "")
			}
		>
			<div className="text-primary-medium">{route.icon}</div>
			<p>{route.label}</p>
		</Link>
	);
}

export default NavLink;
