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
			<View style={tw`flex-row justify-between `}>
				<Text style={tw`mb-2 text-2xl font-main-bold text-light-light`}>
					{title}
				</Text>
				<Text
					style={tw`mb-2 text-2xl font-main-light text-light-light`}
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
						<View
							style={{
								width: width - 16,
								height: 120,
								justifyContent: "center",
							}}
						>
							<Text
								style={tw`mb-2 text-2xl font-main-light text-light-light flex-wrap`}
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
