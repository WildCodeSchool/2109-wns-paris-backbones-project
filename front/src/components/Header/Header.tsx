import React from "react";
import NavLink from "../NavLink/NavLink";
import { IconHome,  IconTasks } from "../Icons/Icons";

function Header() {
	const routes = [
		{
			href: "/",
			label: "Home",
			icon: <IconHome />,
		},
		{
			href: "/tasks",
			label: "Tâches",
			icon: <IconTasks />,
		},
		{
			href: "/projets",
			label: "Projects",
			icon: <IconTasks />,
		},
		{
			href: "/account",
			label: "Profile",
			icon: <IconTasks/>,
		},
	];
	return (
		<header className="flex items-center justify-between p-4 bg-slate-800">
			<p className="text-xl font-bold text-green-500">TicketApp</p>
			<ul className="flex gap-10">
				{routes.map((route, index) => (
					<NavLink key={index} route={route} />
				))}
			</ul>
		</header>
	);
}

export default Header;
