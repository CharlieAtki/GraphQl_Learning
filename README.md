# MERN Stack Authentication with GraphQL

## Overview
This project is a MERN (MongoDB, Express, React, Node.js) stack application designed to manage account creation and user authentication. It serves as a learning platform for implementing GraphQL, which is hosted on an Apollo Server.

## Features
- User registration and login functionality
- Authentication and authorization using JWT
- GraphQL API for handling user data
- Apollo Server for managing GraphQL requests
- MongoDB for data storage

## Technologies Used
- **MongoDB** – NoSQL database for user data storage
- **Express.js** – Backend framework for handling API requests
- **React.js** – Frontend framework for the user interface
- **Node.js** – Server-side runtime for executing JavaScript
- **GraphQL** – Query language for API communication
- **Apollo Server** – GraphQL server implementation

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/mern-auth-graphql.git
   ```
2. Navigate to the project folder:
   ```bash
   cd mern-auth-graphql
   ```
3. Install server dependencies:
   ```bash
   cd server
   npm install
   ```
4. Install client dependencies:
   ```bash
   cd ../client
   npm install
   ```
5. Create a `.env` file in the `server` directory and configure environment variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
6. Start the backend server:
   ```bash
   cd server
   npm start
   ```
7. Start the frontend application:
   ```bash
   cd ../client
   npm start
   ```

## Usage
- Open your browser and navigate to `http://localhost:3000` to access the application.
- Use the GraphQL Playground at `http://localhost:4000/graphql` to interact with the API.

## Learning Goals
This project helps in understanding:
- How to set up a GraphQL API using Apollo Server.
- How to integrate GraphQL with a MERN stack application.
- Authentication and authorization using JWT in a GraphQL environment.

## Contributing
If you'd like to contribute, feel free to fork the repository and submit a pull request.

## License
This project is open-source and available under the MIT License.

