import React from "react";
import { Notification } from "../components/types";

interface NotificationsProps {
	notifications: Notification[];
}

function Notifications({ notifications }: NotificationsProps) {
	console.log(notifications);
	return (
		<>
			{notifications
				? `notifications: ${notifications.length}`
				: "No Notifications yet"}
		</>
	);
}

export default Notifications;
