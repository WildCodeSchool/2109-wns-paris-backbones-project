import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import tw from "../lib/tailwind";
import { Style } from "twrnc/dist/esm/types";

const config = {
	"primary-linear": [
		tw.color("primary-dark"),
		tw.color("primary-darker"),
	] as [string, string],
	"secondary-linear": [
		tw.color("secondary-medium"),
		tw.color("secondary-dark"),
	] as [string, string],
	"light-linear": [tw.color("light-medium"), tw.color("light-dark")] as [
		string,
		string
	],
} as const;

interface IProps {
	gradientName: keyof typeof config;
	children: JSX.Element[] | JSX.Element;
	style?: Style;
}

const GradientWrapper = ({ gradientName, children, style }: IProps) => {
	return (
		<LinearGradient
			colors={config[gradientName]}
			start={{ x: 0, y: 0 }}
			end={{ x: 1, y: 1 }}
			style={style}
		>
			{children}
		</LinearGradient>
	);
};

export default GradientWrapper;
