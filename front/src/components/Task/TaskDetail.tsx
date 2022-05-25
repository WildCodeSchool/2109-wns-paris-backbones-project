import React from "react";
import { Dialog } from "@headlessui/react";

const TaskDetail = ({ title, description}) => {
    return (

        <Dialog.Panel >
		<Dialog.Title
			as="h3"
			className="text-lg font-medium leading-6 text-gray-900"
		>
            
            
			{title}
		</Dialog.Title>
		<div className="mt-2">
			<p className="text-sm text-gray-500">
				{description}
			</p>
		</div>
	</Dialog.Panel>
    )
};

export default TaskDetail;