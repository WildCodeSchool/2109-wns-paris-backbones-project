import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, formatISO } from "date-fns";
import { Disclosure, Transition } from "@headlessui/react";
import { CalendarToday } from "@material-ui/icons";

interface FormDateInputProps {
	label: string;
	onChange: (date: string, name: string) => void;
	name: string;
	date?: Date;
}

const FormDateInput = ({ label, onChange, name, date }: FormDateInputProps) => {
	const [selectedDay, setSelectedDay] = useState<Date | undefined>(date);

	useEffect(() => {
		if (selectedDay) {
			onChange(formatISO(selectedDay), name);
		}
	}, [selectedDay]);

	function renderDate() {
		if (selectedDay) {
			return <span>{format(selectedDay, "PP")}</span>;
		}
		return (
			<span className="text-dark-light font-main-extralight">
				Please enter a date
			</span>
		);
	}
	return (
		<div className="date-input">
			<Disclosure>
				{({ open, close }) => (
					<>
						<Disclosure.Button>
							<div className="flex flex-raw">
								<CalendarToday
									className="date-input-icon text-light-light"
									fontSize="medium"
								/>
								<span className="font-main-bold px-4">
									{label}
								</span>
								<span
									className={`${
										!selectedDay &&
										"text-dark-light font-main-extralight"
									}`}
								>
									{renderDate()}
								</span>
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
							{open && (
								<Disclosure.Panel>
									<DayPicker
										mode="single"
										selected={selectedDay}
										onSelect={setSelectedDay}
										onDayClick={() => {
											close();
										}}
										style={{
											backgroundColor: "#010101",
											width: "fit-content",
											borderRadius: "20px",
											padding: "10px",
										}}
										modifiersStyles={{
											selected: {
												backgroundColor: "#15BE77",
											},
											today: {
												color: "#15BE77",
												fontWeight: "bold",
											},
										}}
									/>
								</Disclosure.Panel>
							)}
						</Transition>
					</>
				)}
			</Disclosure>
		</div>
	);
};

export default FormDateInput;
