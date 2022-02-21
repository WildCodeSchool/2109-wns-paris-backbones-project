import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import tw from "../lib/tailwind";

const config = {
  "primary-linear": [tw.color("primary-medium"), tw.color("primary-dark")] as [
    string,
    string
  ],
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
}

const GradientWrapper = ({ gradientName, children }: IProps) => {
  return (
    <LinearGradient
      colors={config[gradientName]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientWrapper;
