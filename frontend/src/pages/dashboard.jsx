import {useEffect, useState} from "react";

const Dashboard = () => {
    const [users, setUsers] = useState([]); // manages the users from the database

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/user-auth/users`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (response.ok) {
                    const result = await response.json();
                    setUsers(result.payload); // setting the users in the useSate
                }
            } catch (error) {
                console.log(error);
            }
        }

        getUsers();
    }, []);

    return (
        <div className={"p-6"}>
            <h1 className={"text-xl font-semibold text-indigo-800"}>Dashboard</h1>
            {/* Ordered List for the different users in the database  */}
            <ol>
                {users.map((user) => (
                    <li key={user.email}>
                        {user.email || "User Not Found"}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Dashboard;