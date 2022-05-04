import React from "react";

interface UserBadgeProps {
    avatar?: string,
    name?: string
}

const UserBadge = ({ avatar = "https://pluspng.com/img-png/png-user-icon-circled-user-icon-2240.png", name }: UserBadgeProps) => {

    return (
        <div className={`flex flex-col justify-center px-4 py-2 font-light text-center text-white w-24 h-24`}>
            <img src={avatar} className="rounded-full outline outline-2 outline-white w-24 h-24" />
            <div>{name}</div>
        </div>
    );
}

export default UserBadge;