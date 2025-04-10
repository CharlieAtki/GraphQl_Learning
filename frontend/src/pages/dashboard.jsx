import {useEffect, useState} from "react";

const Dashboard = () => {
    const [users, setUsers] = useState([]); // manages the users from the database
    const [info, setInfo] = useState([]); //  manages the fetched GraphQL data

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

    useEffect(() => {
        const getPostsAndUsers = async () => {
            try {
                const response = await fetch('http://localhost:4000/graphql', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // Defining what query to use -> The logic is already defined within the Apollo Server.
                    // GraphQL defines what data to fetch. In this scenario, both the Query logic for posts and users will be initialised.
                    body: JSON.stringify({
                        query: `
                          query {
                            posts {
                              id
                              title
                              author
                              content
                            }
                            users {
                              id
                              email
                            }
                          }
                        `,
                      }),
                });

                if (response.ok) {
                    const result = await response.json();
                    setInfo(result.data);

                }
            } catch (error) {
                console.log(error);
            }
        }

        getPostsAndUsers();
    }, []);

    return (
        <div className={"p-6"}>
            <h1 className={"text-xl font-semibold text-indigo-800"}>REST API Request</h1>
            {/* Ordered List for the different users in the database  */}
            <ol>
                {users.map((user) => (
                    <li key={user.email}>
                        {user.email || "User Not Found"}
                    </li>
                ))}
            </ol>

            <hr className={"mt-6"} ></hr>

            {/* Ordered list for the posts and users fetched via GraphQL + Data formatting via .map method  */}
            <div className="p-6">
                <h1 className="text-xl font-semibold text-indigo-800">GraphQL Request</h1>

                {info.posts && (
                    <>
                        <h2 className="text-lg font-medium mt-4 mb-2">Posts:</h2>
                        <ul>
                            {info.posts.map((post) => (
                                <li className={"my-0.5"} key={post.id}>
                                    <strong>{post.title}</strong> by {post.author}
                                    <p>{post.content}</p>
                                </li>
                            ))}
                        </ul>
                    </>
                )}

                {info.users && (
                    <>
                        <h2 className="text-lg font-medium mt-4 mb-2">Users:</h2>
                        <ul>
                            {info.users.map((user) => (
                                <li className={"my-0.5"} key={user.id}>{user.email}</li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;