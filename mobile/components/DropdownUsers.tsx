import { BackBonesUser, Input, UserData } from "../customTypes";
import React, { useEffect, useState } from "react";
import UserBadge from "./UserBadge";
import DropDownPicker from "react-native-dropdown-picker";
import { View } from "react-native";
import tw from "../lib/tailwind";

interface DropdownUsersProps {
	users: BackBonesUser[];
	onChange: (users: BackBonesUser[]) => void;
}

export default function DropdownUsers({ users, onChange }: DropdownUsersProps) {
	const [selectedUsers, setSelectedUsers] = useState([]);
	const [usersToDisplay, setUsersToDisplay] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		onChange(selectedUsers);
	}, [selectedUsers]);

	useEffect(() => {
		const u = users.map((user) => {
			return {
				label: user.firstName,
				value: user,
				icon: () => (
					<UserBadge user={user} size={8} withFirstName={false} />
				),
			};
		});
		setUsersToDisplay(u);
	}, [users]);

	return (
		<View
			style={tw`flex flex-col justify-center items-center bg-dark-dark`}
		>
			{usersToDisplay && (
				<DropDownPicker
					open={open}
					value={selectedUsers}
					items={usersToDisplay}
					setOpen={setOpen}
					setValue={setSelectedUsers}
					theme="DARK"
					multiple={true}
					mode="BADGE"
					placeholder="Select users on tasks"
					dropDownContainerStyle={tw`bg-dark-dark`}
				/>
			)}
		</View>
	);
}
