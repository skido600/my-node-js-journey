# 🚀 My Node.js Journey

Welcome to my personal repository documenting my exploration into the world of Node.js! This project is a comprehensive collection of experiments, lessons, and mini-projects I've undertaken to grasp the core concepts of Node.js. It showcases practical applications of Node.js modules, asynchronous programming, and backend development principles.

## ✨ Features

*   **File System Operations**: Hands-on experience with Node.js `fs` module for synchronous and asynchronous file reading, writing, appending, and streaming.
*   **Event-Driven Programming**: Implementation of custom event emitters and stream processing using Node.js's `events` and `fs.createReadStream`/`createWriteStream`.
*   **Native HTTP Server Development**: Building basic web servers from scratch using the built-in `http` module, handling different routes and request methods.
*   **Express.js API Development**: Construction of a RESTful API using the Express.js framework for user management, demonstrating middleware, routing, and data persistence with JSON files.
*   **Module System Understanding**: Practical examples of CommonJS module exports and imports.
*   **OS Module Utilities**: Utilization of the `os` module to retrieve system information and `chalk` for colored console output.
*   **Basic JavaScript Concepts**: Exploration of fundamental JavaScript features within a Node.js environment.

## 🛠️ Technologies Used

| Category         | Technology    | Description                                           |
| :--------------- | :------------ | :---------------------------------------------------- |
| **Runtime**      | Node.js       | JavaScript runtime environment                        |
| **Web Framework**| Express.js    | Minimalist web framework for Node.js APIs             |
| **Core Modules** | `fs`          | File system interaction                               |
|                  | `http`        | Native HTTP server creation                           |
|                  | `events`      | Event-driven architecture implementation              |
|                  | `path`        | Path manipulation utilities                           |
|                  | `os`          | Operating system interaction                          |
|                  | `crypto`      | Cryptographic functionalities (e.g., password hashing)|
| **Utilities**    | Chalk         | Terminal string styling for colored output            |
| **Data Storage** | JSON Files    | Simple file-based data persistence                    |

## 🚀 Getting Started

To get a copy of this project up and running on your local machine, follow these steps.

### Prerequisites

Ensure you have Node.js installed on your system.
[Download Node.js](https://nodejs.org/)

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/skido600/my-node-js-journey.git
    ```
2.  **Navigate to the Project Directory**:
    ```bash
    cd my-node-js-journey
    ```
3.  **Install Dependencies**:
    Some mini-projects have their own `package.json` files and dependencies. Navigate into these directories and install their specific dependencies.

    *   For the Express.js API:
        ```bash
        cd expressjs
        npm install
        cd .. # Go back to the root directory
        ```
    *   For the OS Module example:
        ```bash
        cd os_module
        npm install
        cd .. # Go back to the root directory
        ```
    *   No other top-level or sub-directory specific `npm install` is generally required for the other pure Node.js core module examples.

## 📖 Usage

This repository is structured as a collection of independent Node.js experiments. You can run each script individually to explore the concepts.

### Running Individual Scripts

Navigate to the respective directory and execute the desired JavaScript file using Node.js.

*   **Event Handling & File Streams**:
    ```bash
    node event/event.js
    ```
*   **File System Operations**:
    ```bash
    node file_system/file.js
    ```
*   **Native HTTP Server (Basic)**:
    ```bash
    node http/http.js
    # Then access in browser: http://localhost:3001/home or http://localhost:3001/file
    ```
*   **Node.js Introduction & Globals**:
    ```bash
    node intro/server.js
    ```
*   **Module System Examples**:
    ```bash
    node module/main.js
    ```
*   **OS Module & Chalk**:
    ```bash
    node os_module/os.js
    ```
*   **Playing Around (Basic JS Concepts)**:
    ```bash
    node playing_around/play.js
    # Note: 'prompt' and 'alert' are browser APIs and will not work directly in Node.js without specific polyfills or environments. This script is primarily for demonstrating basic JavaScript interactivity.
    ```

### Running API Servers

This project includes two separate API servers: one built with Express.js and another using Node.js's native `http` module.

---

# Express.js User Management API

## Overview
This API server, built with Express.js, provides a simple RESTful interface for managing user data. It utilizes the Node.js `fs` module for file-based persistence, storing user records in a `user.json` file, and `crypto` for basic password hashing.

## Features
- `Express.js`: Robust web framework for handling HTTP requests, routing, and middleware.
- `fs`: Asynchronous file system operations for reading and writing user data.
- `crypto`: Securely hashes user passwords using `scryptSync`.
- `JSON`: Data persistence through plain JSON files.

## Getting Started
### Installation
Navigate to the `expressjs` directory and install dependencies:
```bash
cd expressjs
npm install
```
Then, to start the server:
```bash
npm start
```
The server will run on `http://localhost:3001`. A `user.json` file will be created in the `expressjs` directory if it doesn't exist, to store user data.

### Environment Variables
No environment variables are required for this project.

## API Documentation
### Base URL
`http://localhost:3001`

### Endpoints

#### GET /user
Retrieves a list of all users stored in the database.

**Request**:
No request body required.

**Response**:
```json
{
  "message": "There are [number] users in the database",
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "age": 30,
      "state": "California",
      "password": "hashedpassword1"
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "age": 25,
      "state": "New York",
      "password": "hashedpassword2"
    }
  ]
}
```

**Errors**:
- `404 Not Found`: Data file not found or empty.
- `500 Internal Server Error`: Server encountered an unexpected error.

#### POST /createuser
Creates a new user record in the database.

**Request**:
```json
{
  "name": "New User",
  "age": 28,
  "state": "Texas",
  "password": "securePassword123"
}
```

**Response**:
```json
{
  "message": "there are [number] users in db",
  "user": {
    "id": 3,
    "name": "New User",
    "age": 28,
    "state": "Texas",
    "password": "hashednewpassword"
  }
}
```

**Errors**:
- `400 Bad Request`: Required fields (`name`, `age`, `state`, `password`) are missing.
- `404 Not Found`: Data file not found.
- `500 Internal Server Error`: Server encountered an unexpected error.

#### GET /getuser/:id
Retrieves a single user by their unique ID.

**Request**:
No request body required. `id` is a path parameter.

**Response**:
```json
{
  "message": "there are [number] users in db",
  "user": {
    "id": 1,
    "name": "John Doe",
    "age": 30,
    "state": "California",
    "password": "hashedpassword1"
  }
}
```

**Errors**:
- `404 Not Found`: User with the specified ID not found.
- `500 Internal Server Error`: Server encountered an unexpected error.

#### PATCH /updateuser/:id
Updates the `state` and `password` for an existing user.

**Request**:
```json
{
  "state": "Washington",
  "password": "newSecurePassword"
}
```

**Response**:
```json
{
  "message": "there are [number] users in db",
  "user": {
    "id": 1,
    "name": "John Doe",
    "age": 30,
    "state": "Washington",
    "password": "hashednewsecurepassword"
  }
}
```

**Errors**:
- `404 Not Found`: User with the specified ID not found or `id` / `state` is missing.
- `500 Internal Server Error`: Server encountered an unexpected error.

---

# Native HTTP Notes API

## Overview
This API server demonstrates building a basic RESTful API purely with Node.js's built-in `http` module. It manages notes, performing read, write, and delete operations, with data persisted in a `note.json` file.

## Features
- `http`: Direct interaction with HTTP requests and responses without a framework.
- `fs.promises`: Asynchronous file system operations for `note.json` persistence.
- Simple JSON parsing for request bodies and responses.

## Getting Started
### Installation
Navigate to the `http` directory and start the server:
```bash
cd http
node read_write_tohtpp.js
```
The server will run on `http://localhost:2023`. A `note.json` file will be created in the `http` directory if it doesn't exist, to store notes.

### Environment Variables
No environment variables are required for this project.

## API Documentation
### Base URL
`http://localhost:2023`

### Endpoints

#### GET /notes
Retrieves all notes stored in the database.

**Request**:
No request body required.

**Response**:
```json
[
  {
    "id": 1,
    "title": "First Note",
    "content": "This is the content of the first note."
  },
  {
    "id": 2,
    "title": "Second Note",
    "content": "Another note's content."
  }
]
```

**Errors**:
- `500 Internal Server Error`: Server encountered an error reading the notes file.

#### POST /notes
Adds a new note to the database.

**Request**:
```json
{
  "title": "New Task",
  "content": "Remember to buy groceries."
}
```

**Response**:
```json
{
  "message": "Data received successfully!"
}
```

**Errors**:
- `500 Internal Server Error`: Server encountered an error writing to the notes file.

#### DELETE /deletenote/:id
Deletes a note from the database by its ID.

**Request**:
No request body required. `id` is a path parameter.

**Response**:
```
Note with id: [id] is deleted from our database successfully
```

**Errors**:
- `404 Not Found`: `Id is not a number` if the provided ID is invalid.
- `404 Not Found`: `Endpoint not found` if the URL path is incorrect.
- `500 Internal Server Error`: Server encountered an error during file operations.

---

## 🤝 Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please feel free to:

1.  **Fork the repository**.
2.  **Create a new branch** (`git checkout -b feature/AmazingFeature`).
3.  **Make your changes**.
4.  **Commit your changes** (`git commit -m 'Add some AmazingFeature'`).
5.  **Push to the branch** (`git push origin feature/AmazingFeature`).
6.  **Open a Pull Request**.

## ⚖️ License

This project is licensed under the ISC License.

## ✍️ Author Info

*   **LinkedIn**: https://www.linkedin.com/in/leo-wave-309637239/
*   **Twitter**: https://x.com/Momentum1962


---
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

---
[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)
