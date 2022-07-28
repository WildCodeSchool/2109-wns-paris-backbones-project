import React, { useState } from "react";
import { MenuRounded } from "@material-ui/icons";

interface BurgerMenuProps {
	className?: string;
	children?: React.ReactNode;
}

const BurgerMenu = ({ className, children }: BurgerMenuProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		console.log("isOpen", isOpen);
		setIsOpen(!isOpen);
	};

	return (
		//BurgerMenu icon
		<>
			<div className={`${className}`}>
				<button className="burger-menu-icon" onClick={handleClick}>
					<MenuRounded />
				</button>
			</div>
			<div
				className={`burger-menu-overlay top-0 right-0 w-full fixed h-screen overflow-y-auto bg-dark-darker z-40 ${
					isOpen ? "translate-x-0" : "translate-x-full"
				}  ease-in-out duration-300`}
			>
				<div
					onClick={handleClick}
					className={
						"burger-menu-close close- button fixed top-3 right-3"
					}
				>
					X
				</div>
				<div
					className="burger-menu-content flex flex-col"
					onClick={handleClick}
				>
					{children}
				</div>
			</div>
		</>
	);
};

export default BurgerMenu;
