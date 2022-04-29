import React from "react";

interface IButton {
    label: string,
    state: "enabled" | "disabled" | "danger"
}

const Button = ({ label, state = "enabled" } :IButton) => {

    let stateStyling;

    let enabledStyling = "bg-gradient-to-r from-green-300 to-green-500 rounded hover:bg-green-700";
    let disabledStyling = "bg-gradient-to-r from-gray-300 to-gray-500 rounded hover:bg-gray-700";
    let dangerStyling = "bg-gradient-to-r from-pink-300 to-pink-500 rounded hover:bg-pink-700";

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