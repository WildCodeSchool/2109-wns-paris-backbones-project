import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import UnfoldMoreOutlinedIcon from "@material-ui/icons/UnfoldMoreOutlined";

interface DropdownProps {
	onChange: (option: string) => void;
	title: string;
	options: string[];
	selected: string;
	className?: string;
}

const Dropdown = ({
	title,
	options,
	onChange,
	selected,
	className,
}: DropdownProps) => {
	const [selectedItem, setSelectedItem] = useState("All");

	useEffect(() => {
		setSelectedItem(selected);
	}, [selected]);

	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(" ");
	}

	useEffect(() => {
		onChange(selectedItem);
	}, [selectedItem]);

	return (
		<div className={className}>
			<Listbox value={selectedItem} onChange={setSelectedItem}>
				{({ open }) => (
					<>
						<Listbox.Label className="block text-sm font-main-regular">
							{title}
						</Listbox.Label>
						<div className="mt-1 relative">
							<Listbox.Button className="relative w-full bg-light-light border border-dark-medium rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-darker focus:border-primary-darker sm:text-sm">
								<span className="flex items-center">
									<span className="ml-3 block text-dark-dark truncate">
										{selectedItem}
									</span>
								</span>
								<span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
									<UnfoldMoreOutlinedIcon
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</span>
							</Listbox.Button>

							<Transition
								show={open}
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
									{options.map((option, index) => (
										<Listbox.Option
											key={index}
											className={({ active }) =>
												classNames(
													active
														? "text-light-light bg-primary-dark"
														: "text-dark-dark",
													"cursor-default select-none relative py-2 pl-3 pr-9"
												)
											}
											value={option}
										>
											{({ selected, active }) => (
												<>
													<div className="flex items-center">
														<span
															className={classNames(
																selected
																	? "font-main-bold"
																	: "font-main-regular",
																"ml-3 block truncate"
															)}
														>
															{option}
														</span>
													</div>

													{selected ? (
														<span
															className={classNames(
																active
																	? "text-light-light"
																	: "text-primary-dark",
																"absolute inset-y-0 right-0 flex items-center pr-4"
															)}
														>
															<CheckOutlinedIcon
																className="h-5 w-5"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</>
				)}
			</Listbox>
		</div>
	);
};

export default Dropdown;
