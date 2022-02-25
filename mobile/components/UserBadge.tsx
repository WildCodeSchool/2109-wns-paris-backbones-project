import { Text, View } from "./Themed";
import { UserData } from "../customTypes";
import { Image, TouchableOpacity } from "react-native";
import tw from "../lib/tailwind";
import { useState } from "react";

interface IProps {
	user: UserData;
	withFirstName?: boolean;
	size?: number;
}

const UserBadge = ({ user, withFirstName = true, size = 10 }: IProps) => {
	const [clicked, setClicked] = useState(false);
	return (
		<TouchableOpacity
			onPress={() => {
				console.log(
					`arrête d'apputer sur la tête de ${user.firstName} ${user.lastName}... Si tu veux son mail c'est ${user.email}`
				);
				setClicked(!clicked);
			}}
		>
			<View>
				<Image
					style={tw`w-${size} h-${size} rounded-full self-center border border-2 border${
						clicked ? "-primary-dark" : "-light-medium"
					}`}
					source={{ uri: user.avatar }}
				/>
				{withFirstName && (
					<Text style={tw`text-center text-xxs`}>
						{user.firstName}
					</Text>
				)}
			</View>
		</TouchableOpacity>
	);
};

export default UserBadge;
