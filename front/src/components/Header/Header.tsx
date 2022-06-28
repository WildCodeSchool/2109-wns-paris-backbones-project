import React, { useContext } from "react";
import NavLink from "../NavLink/NavLink";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import NotificationIcon from "@material-ui/icons/Notifications";
import { setUserId } from "../../state/actions";
import { DispatchProvider } from "../../state/GlobalStateProvider";
import { BackBonesUser } from "../types";
import UserBadge from "../UserBadge/UserBadge";
import { useApolloClient } from "@apollo/client";
import Button from "../utils/Button";

interface HeaderProps {
	user: null | BackBonesUser;
}

function Header({ user }: HeaderProps) {
	const client = useApolloClient();
	const dispatch = useContext(DispatchProvider);
	const routes = [
		{
			href: "/tasks",
			label: "Tasks",
			icon: <CheckBoxIcon />,
		},
		{
			href: "/projects",
			label: "Projects",
			icon: <CreateNewFolderIcon />,
		},
		{
			href: "/notifications",
			label: "Notifications",
			icon: <NotificationIcon />,
		},
	];

	const handleLogout = async () => {
		localStorage.removeItem("token");
		dispatch(setUserId(0));
		await client.clearStore();
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
