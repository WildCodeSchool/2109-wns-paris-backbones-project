import React from "react";

interface IButton {
    label: string,
    state: "enabled" | "disabled" | "danger"
}

const Button = ({ label, state = "enabled" } :IButton) => {

    let stateStyling;

    let enabledStyling = "bg-gradient-to-r from-primary-light to-primary-dark rounded hover:bg-green-700 text-light-light";
    let disabledStyling = "bg-gradient-to-r from-gray-300 to-gray-400 rounded hover:bg-gray-600 text-dark-medium";
    let dangerStyling = "bg-gradient-to-r from-secondary-light to-secondary-dark rounded hover:bg-pink-700 text-light-light";

    if (state === "enabled") {
        stateStyling = enabledStyling;
    } else if (state === "disabled") {
        stateStyling = disabledStyling;
    } else if (state === "danger") {
        stateStyling = dangerStyling;
    };

    return (
        <button className={`flex flex-col justify-center px-4 py-2 font-bold ${stateStyling} focus:outline-none focus:shadow-outline`}>
            {label}
        </button>
    );
}

export default Button;