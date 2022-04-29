import React from "react";
import NavLink from "../NavLink/NavLink";
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
		<nav className="flex items-center justify-between p-4 mx-4 rounded-md bg-dark-medium">
			<div className="flex gap-4">
				<CheckBoxIcon  className="text-primary-darker"/>
				<article>
					<p className="text-2xl font-bold text-primary-darker">TicketApp</p>
					<p className="text-sm text-light-light">Check your boxes</p>
				</article>
				
			</div>
			
			<ul className="flex gap-10">
				{routes.map((route, index) => (
					<NavLink key={index} route={route} />
				))}
			</ul>
		</nav>
	);
}

export default Header;
