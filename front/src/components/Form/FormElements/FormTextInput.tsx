import React, { useEffect, useState } from "react";

interface FormTextInputProps {
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormTextInput = ({ label, value, onChange }: FormTextInputProps) => {
	const [description, setDescription] = useState(value);
	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(e.target.value);
		onChange(e);
	};

	useEffect(() => {
		setDescription(value);
	}, [value]);

	return (
		<div className="description-input mt-4">
			<label>{label}</label>
			<textarea
				className="dark:bg-dark-dark p-2 px-4 mt-2 h-24 text-light-light focus:outline-none w-full border dark:border-light-light rounded-2xl"
				value={description}
				name="description"
				placeholder="Add description here"
				onChange={handleChange}
			/>
		</div>
	);
};

export default FormTextInput;
