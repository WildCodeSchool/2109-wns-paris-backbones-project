import React from "react";
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";
import UnfoldMoreOutlinedIcon from "@material-ui/icons/UnfoldMoreOutlined";
import { BackBonesUser } from "../types";

interface DropdownUsersProps {
	updateUsers: (user: BackBonesUser) => void;
	title: string;
	users: BackBonesUser[];
	usersOnList?: BackBonesUser[] | { id: number }[];
	className?: string;
}

const DropdownUsers = ({
	title,
	users,
	usersOnList,
	updateUsers,
	className,
}: DropdownUsersProps) => {
	function classNames(...classes: string[]) {
		return classes.filter(Boolean).join(" ");
	}

	function isUserIsOnTask(user: BackBonesUser): boolean {
		if (usersOnList) {
			return usersOnList.find((u) => u.id === user.id) ? true : false;
		} else {
			return false;
		}
	}

	return (
		<Listbox
			value={undefined}
			onChange={(user) => {
				user && updateUsers(user);
			}}
		>
			{({ open }) => (
				<>
					<div className="mt-1 relative">
						<Listbox.Button className="relative w-full border dark:border-light-light rounded-2xl shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 sm:text-sm">
							<span className="flex items-center">
								<span className="ml-1 block truncate">
									{title}
								</span>
							</span>
							<span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
								<UnfoldMoreOutlinedIcon
									className="h-5 w-5 text-light-light"
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
							<Listbox.Options className="absolute z-10 mt-1 w-full dark:bg-dark-medium  shadow-lg max-h-56 rounded-2xl py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
								{users.map((user: BackBonesUser) => (
									<Listbox.Option
										key={user.id}
										className={({ active }) =>
											classNames(
												active
													? "bg-primary-darker"
													: "",
												"cursor-default select-none relative py-2 pl-3 pr-9"
											)
										}
										value={user}
									>
										{({ selected, active }) => (
											<>
												<div className="flex items-center">
													<img
														src={user.avatar}
														alt=""
														className="flex-shrink-0 h-6 w-6 rounded-full"
													/>
													<span
														className={classNames(
															selected
																? "font-semibold"
																: "font-normal",
															"ml-3 block truncate"
														)}
													>
														{user.firstName}
													</span>
												</div>

												{isUserIsOnTask(user) ? (
													<span
														className={classNames(
															active
																? "text-light-light"
																: "text-primary-darker",
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

export default DropdownUsers;
