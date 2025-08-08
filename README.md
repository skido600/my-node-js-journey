🚀 Node.js Journey: Foundations and API Development

This repository serves as a comprehensive collection of experiments, lessons, and mini-projects, meticulously crafted to explore and solidify core concepts within the Node.js ecosystem. From fundamental module interactions to robust API development, this project provides a practical journey through backend programming with JavaScript.

## ✨ Features

*   **Modular Architecture**: Demonstrates effective organization of code into reusable modules.
*   **API Development**: Implements multiple RESTful APIs using both native Node.js HTTP module and the Express.js framework.
*   **File System Operations**: Explores synchronous and asynchronous file reading, writing, and manipulation.
*   **Event-Driven Programming**: Showcases the use of Node.js Event Emitters for custom event handling and logging.
*   **Operating System Interactions**: Utilizes the OS module to retrieve system information and status.
*   **Data Persistence**: Employs local JSON files for basic data storage and retrieval.
*   **Middleware Implementation**: Demonstrates the use of Express.js middleware for request parsing.
*   **Secure Practices**: Includes basic password hashing for user data.

## 🚀 Getting Started

To get a copy of this project up and running on your local machine, follow these steps.

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
    Each sub-project (`crud_task`, `expressjs`, `http`, `os_module`) contains its own `package.json` with specific dependencies. You'll need to install them individually.

    ```bash
    # For the main project (not strictly necessary as it has no dependencies beyond sub-projects)
    npm install

    # For the CRUD Task API
    cd crud_task
    npm install
    cd ..

    # For the Express.js API
    cd expressjs
    npm install
    cd ..

    # For the HTTP Module API
    cd http
    npm install
    cd ..

    # For the OS Module example
    cd os_module
    npm install
    cd ..
    ```

### Environment Variables

This project primarily uses hardcoded port numbers for simplicity in demonstrating different modules. No external environment variables are strictly required beyond `PORT` for API projects.

*   `PORT`: The port number on which the server will listen. (e.g., `3001`, `4001`, `2023`)

## 📂 Project Structure

The repository is organized into distinct directories, each focusing on a specific aspect or mini-project within the Node.js learning journey:

*   `crud_task/`: An Express.js API demonstrating full CRUD operations on user data persisted in a JSON file.
*   `event/`: Examples of Node.js event handling and stream operations.
*   `expressjs/`: A fundamental Express.js server showcasing routing, middleware, and user management.
*   `file_system/`: Practical examples of Node.js `fs` (File System) module usage.
*   `http/`: Basic HTTP server implementations using Node.js's built-in `http` module, including a simple notes API.
*   `intro/`: Introductory concepts of Node.js, global objects, and `__dirname`/`__filename`.
*   `module/`: Demonstrations of creating and consuming custom Node.js modules.
*   `os_module/`: Examples of interacting with the operating system using the Node.js `os` module.
*   `playing_around/`: Miscellaneous JavaScript experiments.

---

### CRUD Task API

## Overview
This is a Node.js Express API demonstrating basic Create, Read, Update, and Delete (CRUD) operations, persisting user data to a local JSON file.

## Features
- Express.js: Web server and routing.
- fs: Local file persistence for user data.
- path: Cross-platform path resolution.
- Custom ID Generation: Utility for generating unique user IDs.

## Getting Started
### Installation
Refer to the [overall installation guide](#installation).
To run this specific API:
```bash
cd crud_task
node index.js
```
The server will start on port `4001`.

### Environment Variables
`PORT`: The port on which the server will listen. Example: `4001`.

## API Documentation
### Base URL
`http://localhost:4001`

### Endpoints
#### POST /createuser
Creates a new user in the database.
**Request**:
```json
{
  "name": "string",
  "email": "string"
}
```
**Response**:
```json
{
  "message": "successfuly created",
  "users": {
    "id": 12345,
    "email": "test@example.com",
    "name": "test user",
    "isadmin": false
  }
}
```
**Errors**:
- `404`: "This filds cant be empty" (if `name` or `email` are missing/empty)
- `400`: "Email already exist" (if email is not unique)
- `500`: "internal server error"

#### GET /users
Retrieves all users from the database. Requires `isAdmin` query parameter to be `true`.
**Request**:
Query Parameter: `isAdmin=true`
**Response**:
```json
{
  "message": "There are  2 in db",
  "users": [
    {
      "id": 12345,
      "email": "user1@example.com",
      "name": "user1",
      "isadmin": false
    },
    {
      "id": 67890,
      "email": "user2@example.com",
      "name": "user2",
      "isadmin": true
    }
  ]
}
```
**Errors**:
- `403`: "Access denied.Admins only" (if `isAdmin` is not `true`)
- `500`: "internal server error"

#### GET /user
Retrieves all user data directly from the underlying JSON file (for debugging/internal use).
**Request**:
No payload.
**Response**:
```json
{
  "users": [
    {
      "id": 12345,
      "email": "user1@example.com",
      "name": "user1",
      "isadmin": false
    },
    {
      "id": 67890,
      "email": "user2@example.com",
      "name": "user2",
      "isadmin": true
    }
  ]
}
```
**Errors**:
- `500`: "internal server error"

#### GET /getusers/:adminid/:userid
Retrieves a specific user by ID, requiring an admin ID for authorization.
**Request**:
Path Parameters:
- `adminid`: ID of the admin user.
- `userid`: ID of the user to retrieve.
**Response**:
```json
{
  "message": "user with the id:12345 found succesfully",
  "useradmin": [
    {
      "id": 12345,
      "email": "user1@example.com",
      "name": "user1",
      "isadmin": false
    }
  ]
}
```
**Errors**:
- `400`: "invalid user ID" (if `adminid` or `userid` are not valid numbers)
- `404`: "users not found" (if database is empty or user/admin not found)
- `403`: "unauthorized user not admin" (if the `adminid` user is not an admin)
- `500`: "internal server error"

#### DELETE /delectuser/:adminid/:userid
Deletes a specific user by ID, requiring an admin ID for authorization.
**Request**:
Path Parameters:
- `adminid`: ID of the admin user.
- `userid`: ID of the user to delete.
**Response**:
```json
{
  "message": "user John Doe deleted successfully"
}
```
**Errors**:
- `400`: "invalid user admin ID" / "invalid user ID" (if IDs are not valid numbers)
- `404`: "users not found in db" / "Admin not found" / "user not found"
- `403`: "unauthorized user not admin"
- `500`: "internal server error"

---

### Express.js Basic User API

## Overview
A simple Node.js Express API for managing user data, demonstrating fundamental routing, middleware, and local JSON file persistence, including password hashing.

## Features
- Express.js: Web server and routing.
- fs: Local file persistence for user data.
- crypto: Built-in module for cryptographic operations, used here for password hashing.

## Getting Started
### Installation
Refer to the [overall installation guide](#installation).
To run this specific API:
```bash
cd expressjs
node server.js
```
The server will start on port `3001`.

### Environment Variables
`PORT`: The port on which the server will listen. Example: `3001`.

## API Documentation
### Base URL
`http://localhost:3001`

### Endpoints
#### GET /
Provides a basic welcome message from the server.
**Request**:
No payload.
**Response**:
`sending from our express server`
**Errors**:
None explicitly handled for this endpoint.

#### GET /user
Retrieves all users from the database.
**Request**:
No payload.
**Response**:
```json
{
  "message": "There are 2 users in the database",
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "age": 30,
      "state": "CA",
      "password": "hashedpassword1"
    },
    {
      "id": 2,
      "name": "Bob",
      "age": 25,
      "state": "NY",
      "password": "hashedpassword2"
    }
  ]
}
```
**Errors**:
- `404`: "data not found" (if the user database file is empty or unreadable)
- `500`: "internal server error"

#### POST /createuser
Creates a new user with provided name, age, state, and password. The password is hashed before storage.
**Request**:
```json
{
  "name": "string",
  "age": "number",
  "state": "string",
  "password": "string"
}
```
**Response**:
```json
{
  "message": "there are 3 users in db",
  "user": {
    "id": 3,
    "name": "Charlie",
    "age": 28,
    "state": "TX",
    "password": "hashedpassword3"
  }
}
```
**Errors**:
- `400`: "Required fields found missing" (if any required fields are absent)
- `404`: "data not found" (if the user database file is unreadable)
- `500`: "internal server error"

#### GET /getuser/:id
Retrieves a single user by their ID.
**Request**:
Path Parameter:
- `id`: The ID of the user to retrieve.
**Response**:
```json
{
  "message": "there are 2 users in db",
  "user": {
    "id": 1,
    "name": "Alice",
    "age": 30,
    "state": "CA",
    "password": "hashedpassword1"
  }
}
```
**Errors**:
- `404`: "ID Required" (if ID is missing)
- `404`: "data not found" (if user with specified ID is not found)
- `500`: "internal server error"

#### PATCH /updateuser/:id
Updates a user's password and state by their ID.
**Request**:
Path Parameter:
- `id`: The ID of the user to update.
Payload:
```json
{
  "password": "string",
  "state": "string"
}
```
**Response**:
```json
{
  "message": "there are 2 users in db",
  "user": {
    "id": 1,
    "name": "Alice",
    "age": 30,
    "state": "TX",
    "password": "newhashedpassword"
  }
}
```
**Errors**:
- `404`: "ID Required" (if ID or `state` is missing)
- `404`: "data not found" (if user with specified ID is not found)
- `500`: "internal server error"

---

### HTTP Module Notes API

## Overview
A foundational Node.js API built directly with the `http` module, demonstrating how to handle requests, read/write files, and perform basic CRUD operations on notes.

## Features
- http: Native Node.js module for creating HTTP servers.
- fs.promises: Asynchronous file system operations for data persistence.

## Getting Started
### Installation
Refer to the [overall installation guide](#installation).
To run this specific API:
```bash
cd http
node read_write_tohtpp.js
```
The server will start on port `2023`.

### Environment Variables
`PORT`: The port on which the server will listen. Example: `2023`.

## API Documentation
### Base URL
`http://localhost:2023`

### Endpoints
#### GET /notes
Retrieves all notes stored in `note.json`.
**Request**:
No payload.
**Response**:
```json
[
  {
    "id": 1,
    "title": "My first note",
    "content": "This is the content of my first note."
  },
  {
    "id": 2,
    "title": "Another note",
    "content": "Some more important information."
  }
]
```
**Errors**:
Error handling is primarily console-logged internally; no specific HTTP error responses defined for read errors.

#### POST /notes
Creates a new note and adds it to the `note.json` file.
**Request**:
```json
{
  "title": "string",
  "content": "string"
}
```
**Response**:
```json
{
  "message": "Data received successfully!"
}
```
**Errors**:
Error handling is primarily console-logged internally; no specific HTTP error responses defined for write errors.

#### DELETE /deletenote/:id
Deletes a note by its ID from the `note.json` file.
**Request**:
Path Parameter:
- `id`: The ID of the note to delete.
**Response**:
`Note with id: 1 is deleted from our database successfully`
**Errors**:
- `404`: "Id is not a number" (if the provided ID is not a valid number)
- `404`: "Endpoint not found" (if other errors occur, general catch-all)

#### GET /home
A simple endpoint providing a static response.
**Request**:
No payload.
**Response**:
`this is home page`
**Errors**:
None.

#### GET /file
Serves the content of `file.txt`.
**Request**:
No payload.
**Response**:
`lorem chuks ebisi` (content from `file.txt`)
**Errors**:
None.

---

## 🛠️ Technologies Used

| Technology         | Description                                     | Link                                            |
| :----------------- | :---------------------------------------------- | :---------------------------------------------- |
| **Node.js**        | JavaScript runtime environment                  | [nodejs.org](https://nodejs.org/)               |
| **Express.js**     | Web framework for Node.js                       | [expressjs.com](https://expressjs.com/)         |
| **File System (fs)**| Built-in Node.js module for file interactions   | [nodejs.org/api/fs.html](https://nodejs.org/api/fs.html) |
| **Path**           | Built-in Node.js module for path manipulation   | [nodejs.org/api/path.html](https://nodejs.org/api/path.html) |
| **HTTP Module**    | Built-in Node.js module for HTTP servers/clients| [nodejs.org/api/http.html](https://nodejs.org/api/http.html) |
| **Crypto**         | Built-in Node.js module for cryptography        | [nodejs.org/api/crypto.html](https://nodejs.org/api/crypto.html) |
| **EventEmitter**   | Built-in Node.js for event-driven programming   | [nodejs.org/api/events.html](https://nodejs.org/api/events.html) |
| **Chalk**          | Terminal string styling                         | [npmjs.com/package/chalk](https://www.npmjs.com/package/chalk) |
| **OS Module**      | Built-in Node.js module for OS interactions     | [nodejs.org/api/os.html](https://nodejs.org/api/os.html) |

## 🤝 Contributing

We welcome contributions to this learning repository! If you have suggestions for improvements, new examples, or bug fixes, please follow these steps:

1.  🍴 **Fork** the repository.
2.  🌿 **Create** a new branch (`git checkout -b feature/your-feature-name`).
3.  ✍️ **Make** your changes.
4.  🧪 **Test** your changes thoroughly.
5.  ➕ **Add** and **commit** your changes (`git add . && git commit -m "feat: Add new feature"`).
6.  ⬆️ **Push** to your branch (`git push origin feature/your-feature-name`).
7.  📝 **Open** a Pull Request against the `main` branch.

## 📄 License

This project is licensed under the ISC License.

## ✍️ Author Info

*   **Your Name**
    *   LinkedIn: [Your LinkedIn Profile]
    *   Twitter: [Your Twitter Handle]
    *   Portfolio: [Your Portfolio Link]

---

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)