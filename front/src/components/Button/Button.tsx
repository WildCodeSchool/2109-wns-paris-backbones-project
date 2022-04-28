import React from "react";

interface IButton {
    label: string,
    state: "enabled" | "disabled" | "danger"
}

const Button = ({ label, state = "enabled" } :IButton) => {

    let stateStyling;

    let enabledStyling = "bg-green-500 rounded hover:bg-green-700";
    let disabledStyling = "bg-gray-500 rounded hover:bg-gray-700";
    let dangerStyling = "bg-pink-500 rounded hover:bg-pink-700";

    if (state === "enabled") {
        stateStyling = enabledStyling;
    } else if (state === "disabled") {
        stateStyling = disabledStyling;
    } else if (state === "danger") {
        stateStyling = dangerStyling;
    };

    return (
        <button className={`flex flex-col justify-center px-4 py-2 font-bold text-white ${stateStyling} focus:outline-none focus:shadow-outline`}>
            {label}
        </button>
    );
}

export default Button;