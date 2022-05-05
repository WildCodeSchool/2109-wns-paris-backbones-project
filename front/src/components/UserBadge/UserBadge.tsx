import React from "react";
import { BackBonesUser } from "../types";

interface UserBadgeProps {
	user: BackBonesUser;
	withFirstName?: boolean;
	size?: "small" | "medium" | "large";
}

const UserBadge = ({
	user,
	withFirstName = true,
	size = "medium",
}: UserBadgeProps) => {
	let badgeSize;
	switch (size) {
		case "small":
			badgeSize = "w-8 h-8";
			break;
		case "medium":
			badgeSize = "w-14 h-14";
			break;
		case "large":
			badgeSize = "w-18 h-18";
			break;
		default:
			badgeSize = "w-14 h-14";
			break;
	}

	return (
		<div className="bg-transparent">
			<img
				className={
					"rounded-full self center border-2 border-light-medium " +
					badgeSize
				}
				alt={user.firstName}
				src={user.avatar}
			/>
			{withFirstName && (
				<div className="text-center">
					<span className="text-sm text-light-medium font-main-extralight">
						{user.firstName}
					</span>
				</div>
			)}
		</div>
	);
};

export default UserBadge;
