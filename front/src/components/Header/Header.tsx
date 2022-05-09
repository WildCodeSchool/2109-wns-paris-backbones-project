import React, { useContext } from "react";
import NavLink from "../NavLink/NavLink";
import HomeIcon from "@material-ui/icons/Home";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import { setUserId } from "../../state/actions";
import { DispatchProvider } from "../../state/GlobalStateProvider";
import { BackBonesUser } from "../types";
import UserBadge from "../UserBadge/UserBadge";
import { useApolloClient } from "@apollo/client";
import Button from "../Button/Button";

interface HeaderProps {
	user: null | BackBonesUser;
}

function Header({ user }: HeaderProps) {
	const client = useApolloClient();
	const dispatch = useContext(DispatchProvider);
	const routes = [
		{
			href: "/",
			label: "Home",
			icon: <HomeIcon />,
		},
		{
			href: "/tasks",
			label: "Tâches",
			icon: <CheckBoxIcon />,
		},
		{
			href: "/projets",
			label: "Projects",
			icon: <CreateNewFolderIcon />,
		},
	];

	const handleLogout = async () => {
		localStorage.removeItem("token");
		await client.clearStore();
		dispatch(setUserId(0));
	};

	return (
		<nav className="flex items-center justify-between p-4 mx-4 rounded-md dark:bg-dark-medium bg-light-light">
			<div className="flex gap-4">
				<CheckBoxIcon className="text-primary-medium" />
				<article>
					<p className="text-2xl font-bold text-primary-medium">
						TicketApp
					</p>
					<p className="text-sm">Check your boxes</p>
				</article>
			</div>

			<ul className="flex gap-10">
				<NavLink route={routes[0]} />
				<NavLink route={routes[1]} />
				<NavLink route={routes[2]} />
				{user && (
					<>
						<UserBadge user={user} />
						<Button
							onClick={handleLogout}
							state={"enabled"}
							label={"Logout"}
						/>
					</>
				)}
			</ul>
		</nav>
	);
}

export default Header;
