import React from "react";

interface CounterProps {
	count?: number;
	unit: string;
}

const Counter = ({ count, unit }: CounterProps) => {
	return (
		<span>
			{count ? `${count} ${count > 1 ? unit + "s" : unit}` : `0 ${unit}`}
		</span>
	);
};

export default Counter;
