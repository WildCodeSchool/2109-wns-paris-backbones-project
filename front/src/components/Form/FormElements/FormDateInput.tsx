import React, { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { Disclosure, Transition } from "@headlessui/react";
import { CalendarToday } from "@material-ui/icons";

interface FormDateInputProps {
	label: string;
	onChange: (date: Date) => void;
}

const FormDateInput = ({ label, onChange }: FormDateInputProps) => {
	const [selectedDay, setSelectedDay] = useState<Date>();

	useEffect(() => {
		if (selectedDay) {
			onChange(selectedDay);
		}
	}, [selectedDay]);

	function renderDate() {
		if (selectedDay) {
			return format(selectedDay, "PP");
		}
		return "";
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
								<span>{renderDate()}</span>
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
