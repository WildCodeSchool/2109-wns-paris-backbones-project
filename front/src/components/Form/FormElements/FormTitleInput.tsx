import React, { useState } from "react";

interface FormTitleInputProps {
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormTitleInput = ({ label, value, onChange }: FormTitleInputProps) => {
	const [title, setTitle] = useState(value);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
		onChange(e);
	};

	return (
		<div className="title-input">
			<label>{label}</label>
			<input
				type="text"
				className="dark:bg-dark-dark p-2 px-4 mt-2 text-light-light focus:outline-none w-full border dark:border-light-light rounded-2xl truncate"
				value={title}
				name="title"
				placeholder="Add title here"
				onChange={handleChange}
			/>
		</div>
	);
};

export default FormTitleInput;
