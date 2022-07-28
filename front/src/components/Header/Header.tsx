import React, { useContext, useEffect, useState } from "react";
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
import Logo from "../Logo/Logo";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

interface HeaderProps {
	user: null | BackBonesUser;
}

function Header({ user }: HeaderProps) {
	const [onMobile, setOnMobile] = useState(false);
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

	useEffect(() => {
		window.innerWidth < 768 && setOnMobile(true);
	}, []);

	const handleLogout = async () => {
		localStorage.removeItem("token");
		dispatch(setUserId(null));
		await client.clearStore();
	};

	return onMobile ? (
		<div className={"flex justify-between"}>
			<BurgerMenu className={"fixed top-3 right-3"}>
				{user && (
					<>
						<div className={"flex gap-2"}>
							<UserBadge user={user} />
							<Button
								label={"Logout"}
								state={"danger"}
								onClick={handleLogout}
								className={"h-2/3 self-center"}
							/>
						</div>
						{routes.map((route, index) => (
							<NavLink route={route} key={index} />
						))}
					</>
				)}
			</BurgerMenu>
			<Logo />
		</div>
	) : (
		<div className={"flex justify-around pt-3 pb-3 bg-dark-dark"}>
			<Logo />
			{routes.map((route, index) => (
				<NavLink route={route} key={index} />
			))}
			{user && (
				<div className={"flex gap-3 flex-end"}>
					<UserBadge user={user} />
					<Button
						label={"Logout"}
						state={"danger"}
						onClick={handleLogout}
						className={"h-2/3 self-center"}
					/>
				</div>
			)}
		</div>
	);
}

export default Header;
