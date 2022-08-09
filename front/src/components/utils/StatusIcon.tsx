import React from "react";
import {
	AccessTime,
	CheckCircle,
	CheckCircleOutline,
} from "@material-ui/icons";

interface StatusIconProps {
	isDoneStatus: boolean;
	isLate?: boolean;
}

const StatusIcon = ({ isDoneStatus, isLate = false }: StatusIconProps) => {
	const renderIcon = () => {
		if (isDoneStatus) {
			return <CheckCircle className="text-primary-dark" />;
		} else if (!isDoneStatus && isLate) {
			return <AccessTime className="text-secondary-dark" />;
		} else {
			return <CheckCircleOutline />;
		}
	};

	return (
		<div className="flex items-center justify-center">{renderIcon()}</div>
	);
};

export default StatusIcon;
