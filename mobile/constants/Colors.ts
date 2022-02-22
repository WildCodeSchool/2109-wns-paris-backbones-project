import tw from "../lib/tailwind";

const tintColorLight = tw.color("primary-dark");
const tintColorDark = tw.color("primary-dark");

export default {
	light: {
		text: tw.color("dark-darker"),
		background: tw.color("light-medium"),
		tint: tintColorLight,
		tabIconDefault: tw.color("primary-dark"),
		tabIconSelected: tintColorLight,
	},
	dark: {
		text: tw.color("light-light"),
		background: tw.color("dark-darker"),
		tint: tintColorDark,
		tabIconDefault: tw.color("primary-dark"),
		tabIconSelected: tintColorDark,
	},
};
