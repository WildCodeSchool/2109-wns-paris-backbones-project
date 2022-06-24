import React from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import UnfoldMoreOutlinedIcon from "@material-ui/icons/UnfoldMoreOutlined";
import { Status } from "../types";

interface DropdownUsers {
	updateStatus: (status: Status) => void;
	title: string;
	projectStatuses: Status[];
	taskStatus: Status;
	className?: string;
}

const DropdownStatuses = ({
	title,
	projectStatuses,
	taskStatus,
	updateStatus,
	className,
}: DropdownUsers) => {
	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(" ");
	}

	console.log("projectStauses", projectStatuses);
	console.log("taskStatus", taskStatus);

	return (
		<Listbox
			value={taskStatus}
			onChange={(user) => {
				updateStatus(user);
			}}
		>
			{({ open }) => (
				<>
					<Listbox.Label className="block text-sm font-medium text-gray-700">
						{title}
					</Listbox.Label>
					<div className="mt-1 relative">
						<Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
							<span className="flex items-center">
								<span className="ml-3 block truncate text-dark-dark">
									Select a status
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
								{projectStatuses.map((status: Status) => (
									<Listbox.Option
										key={status.id}
										className={({ active }) =>
											classNames(
												active
													? "text-white bg-indigo-600"
													: "text-gray-900",
												"cursor-default select-none relative py-2 pl-3 pr-9"
											)
										}
										value={status}
									>
										{({ selected, active }) => (
											<>
												<div className="flex items-center">
													<span
														className={classNames(
															selected
																? "font-semibold"
																: "font-normal",
															"ml-3 block truncate"
														)}
													>
														{status.title}
													</span>
												</div>

												{taskStatus.title ===
												status.title ? (
													<span
														className={classNames(
															active
																? "text-white"
																: "text-indigo-600",
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
	);
};

export default DropdownStatuses;
