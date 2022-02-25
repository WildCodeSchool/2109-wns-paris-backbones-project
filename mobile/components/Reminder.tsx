import { Text } from "./Themed";
import { FlatList, View } from "react-native";
import tw from "../lib/tailwind";
import GradientWrapper from "./GradientWrapper";
import { format } from "date-fns";
import { TaskData } from "../customTypes";
import screen from "../constants/Layout";

interface IProps {
	tasks: TaskData[];
	title: string;
}
const Reminder = ({ tasks, title }: IProps) => {
	const width = (screen.window.width * 5) / 6;

	return (
		<GradientWrapper
			gradientName={"primary-linear"}
			style={tw`w-5/6 max-w-sm p-2 rounded-lg`}
		>
			<View style={tw`flex-row justify-between mb-1`}>
				<Text style={tw`text-2xl font-main-bold text-light-light`}>
					{title}
				</Text>
				<Text
					style={tw`text-xl font-main-light text-light-light self-center`}
				>
					{format(new Date(), "E dd MMM")}
				</Text>
			</View>
			<View>
				<FlatList
					horizontal
					data={tasks.slice(0, 5)}
					pagingEnabled={true}
					showsHorizontalScrollIndicator={false}
					legacyImplementation={false}
					keyExtractor={(item) => `${item.id}`}
					renderItem={({ item }) => (
						<View style={{ width: width - 16 }}>
							<Text
								style={tw` text-xl font-main-light font-main-regular flex-wrap mb-1`}
							>
								{item.title}
							</Text>
							<Text
								numberOfLines={2}
								style={tw`mb-3 text-sm font-main-light text-light-light`}
							>
								{item.description}
							</Text>
							<Text style={tw`font-main-bold`}>
								End date:{" "}
								{format(new Date(item.end_date), "E dd MMM")}
							</Text>
							<View style={tw`flex-row self-end`}>
								<Text style={tw`ml-2 self-center`}>
									{item.project.title}
								</Text>
							</View>
						</View>
					)}
				/>
			</View>
		</GradientWrapper>
	);
};

export default Reminder;
