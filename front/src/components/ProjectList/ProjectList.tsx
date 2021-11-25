import React from "react";

const projectsData = [
    {
        id: 1,
        title: "Mon super projet",
        description: "Projet de fou furieux lel",
        start_date: Date.now(),
        end_date: null,
        created_at: Date.now(),
        user_id: 1,
        status_id: 1
    },

    {
        id: 2,
        title: "Dessin",
        description: "Projet de fou furieux lel",
        start_date: Date.now(),
        end_date: null,
        created_at: Date.now(),
        user_id: 2,
        status_id: 1
    },


    {
        id: 3,
        title: "Aquarelle",
        description: "Projet de fou furieux lel",
        start_date: Date.now(),
        end_date: null,
        created_at: Date.now(),
        user_id: 1,
        status_id: 1
    },

    {
        id: 4,
        title: "Puzzle",
        description: "Projet de fou furieux lel",
        start_date: Date.now(),
        end_date: null,
        created_at: Date.now(),
        user_id: 2,
        status_id: 1
    },
];

interface IProps {
    connectedUserId: string;
}

export const ProjectList = ({ connectedUserId }: IProps) => (
    <ul className="flex">
        {projectsData
            .filter(
                ({ user_id }) =>
                    !connectedUserId || user_id === Number(connectedUserId)
            )
            .map((project) => {
                console.log(connectedUserId)

                return (
                    <li
                        className="flex-1 bg-gray-500 border-purple-600 p-2"

                    > <span>{project.title} {project.user_id}</span>
                    </li>
                );
            })}
    </ul>
);
