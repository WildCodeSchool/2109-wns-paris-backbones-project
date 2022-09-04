import React, { useEffect, useState } from "react";

interface FormTitleInputProps {
	label: string;
	value: string;
	name: string;
	placeholder?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormTitleInput = ({
	label,
	value,
	onChange,
	placeholder,
	name,
}: FormTitleInputProps) => {
	const [title, setTitle] = useState(value);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
		onChange(e);
	};

	useEffect(() => {
		setTitle(value);
	}, [value]);

	return (
		<div className="title-input">
			<label>{label}</label>
			<input
				type="text"
				className="dark:bg-dark-dark p-2 px-4 mt-2 text-light-light focus:outline-none w-full border dark:border-light-light rounded-2xl truncate"
				value={title}
				name={name}
				placeholder={placeholder}
				onChange={handleChange}
			/>
		</div>
	);
};

export default FormTitleInput;
