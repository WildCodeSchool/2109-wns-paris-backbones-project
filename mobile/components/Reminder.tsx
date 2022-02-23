import { Text } from "./Themed";
import { FlatList, View } from "react-native";
import tw from "../lib/tailwind";
import GradientWrapper from "./GradientWrapper";
import { format } from "date-fns";
import { useState } from "react";
import { TaskData } from "../types/index";

interface IProps {
	tasks: TaskData[];
	title: string;
}
const Reminder = ({ tasks, title }: IProps) => {
	const [width, setWidth] = useState(280);

	return (
		<GradientWrapper
			gradientName={"primary-linear"}
			style={tw`w-5/6 max-w-sm p-2 rounded-lg`}
		>
			<View
				style={tw`flex-row justify-between `}
				onLayout={(event) => {
					const { width } = event.nativeEvent.layout;
					setWidth((width * 5) / 6);
				}}
			>
				<Text style={tw`mb-2 text-2xl font-main-bold text-light-light`}>
					{title}
				</Text>
				<Text
					style={tw`mb-2 text-2xl font-main-light text-light-light`}
				>
					{format(new Date(), "E dd MMM")}
				</Text>
			</View>
			<View style={tw`w-5/6`}>
				<FlatList
					horizontal
					data={tasks.slice(0, 5)}
					pagingEnabled={true}
					showsHorizontalScrollIndicator={false}
					legacyImplementation={false}
					keyExtractor={(item) => `${item.id}`}
					renderItem={({ item }) => (
						<View
							style={{
								width: width,
								height: 120,
								justifyContent: "center",
							}}
						>
							<Text
								style={tw`mb-2 text-2xl font-main-light text-light-light`}
							>
								{item.title}
							</Text>
						</View>
					)}
				/>
			</View>
		</GradientWrapper>
	);
};

export default Reminder;
