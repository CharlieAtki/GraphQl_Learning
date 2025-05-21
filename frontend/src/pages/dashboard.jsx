import {useEffect, useState} from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const Dashboard = () => {
    const [users, setUsers] = useState([]); // manages the users from the database
    const [info, setInfo] = useState(null); //  manages the fetched GraphQL data

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
                <h2 className="text-lg font-medium mt-4 mb-2">Data:</h2>
                {info && info.posts && (
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

                {info && info.users && (
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
            <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input on id="name" placeholder={"Username"} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>


            <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
        </div>
    );
};

export default Dashboard;
