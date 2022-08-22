import {
	BackBonesUser,
	Input,
	Status,
	StatusInput,
	UserData,
} from "../customTypes";
import React, { useEffect, useState } from "react";
import UserBadge from "./UserBadge";
import DropDownPicker from "react-native-dropdown-picker";
import { View } from "react-native";
import tw from "../lib/tailwind";

interface DropdownStatusProps {
	statuses: Status[];
	onChange: (status: Status) => void;
}

export default function DropdownStatus({
	statuses,
	onChange,
}: DropdownStatusProps) {
	const [selectedStatus, setSelectedStatus] = useState(null);
	const [statusesToDisplay, setStatusesToDisplay] = useState([]);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (selectedStatus) {
			onChange(selectedStatus);
		}
	}, [selectedStatus]);

	useEffect(() => {
		const s = statuses.map((status) => {
			return {
				label: status.title,
				value: status,
			};
		});
		setStatusesToDisplay(s);
	}, [statuses]);

	return (
		<View
			style={tw`flex flex-col justify-center items-center bg-dark-dark`}
		>
			{statusesToDisplay && (
				<DropDownPicker
					open={open}
					multiple={false}
					value={selectedStatus}
					items={statusesToDisplay}
					setOpen={setOpen}
					setValue={setSelectedStatus}
					theme="DARK"
					placeholder="Select status"
					dropDownContainerStyle={tw`bg-dark-dark`}
				/>
			)}
		</View>
	);
}
