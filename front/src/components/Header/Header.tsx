import React from "react";
import NavLink from "../NavLink/NavLink";
import { IconHome, IconTasks } from "../Icons/Icons";
import HomeIcon from '@material-ui/icons/Home'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder'
import PersonIcon from '@material-ui/icons/Person'



function Header() {
	const routes = [
		{
			href: "/",
			label: "Home",
			icon: <HomeIcon/>,
		},
		{
			href: "/tasks",
			label: "Tâches",
			icon: <CheckBoxIcon/>,
		},
		{
			href: "/projets",
			label: "Projects",
			icon: <CreateNewFolderIcon />,
		},
		{
			href: "/account",
			label: "Profile",
			icon: <PersonIcon />,
			
		},
	];
	return (
		<nav className="flex items-center justify-between p-4 bg-dark-darker">
			<p className="text-xl font-bold text-light-light">TicketApp</p>
			<ul className="flex gap-10">
				{routes.map((route, index) => (
					<NavLink key={index} route={route} />
				))}
			</ul>
		</nav>
	);
}

export default Header;
