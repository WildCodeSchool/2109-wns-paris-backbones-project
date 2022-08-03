import React, { useEffect, useRef, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import AddOutlined from "@material-ui/icons/AddOutlined";

interface AddAccordionProps {
	title: string;
	children?: React.ReactNode;
}
const AddAccordion = ({ title, children }: AddAccordionProps) => {
	const [buttonClicked, setButtonClicked] = useState(false);
	const iconAddTask = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (iconAddTask.current) {
			iconAddTask.current.style.transform = buttonClicked
				? "rotate(45deg)"
				: "rotate(0deg)";
		}
	}, [buttonClicked]);

	return (
		<Disclosure>
			<Disclosure.Button onClick={() => setButtonClicked(!buttonClicked)}>
				<div className="add-accordion flex items-center">
					<div ref={iconAddTask}>
						<AddOutlined
							className="text-primary-medium block"
							fontSize="large"
						/>
					</div>
					<span className="font-main-bold px-4">{title}</span>
				</div>
			</Disclosure.Button>
			<Transition
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<Disclosure.Panel>{children}</Disclosure.Panel>
			</Transition>
		</Disclosure>
	);
};

export default AddAccordion;
