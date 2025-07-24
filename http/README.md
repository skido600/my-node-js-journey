# **Node.js Basic HTTP Server**

Dive into the fundamentals of web serving with this straightforward Node.js project! 🚀 It demonstrates how to set up a simple HTTP server, handle basic routing, and serve static content using Node.js's built-in `http` and `fs` modules. This project is perfect for understanding the core concepts of server-side JavaScript and how a web server processes requests and delivers responses.

---

## 🛠️ Installation

Getting this project up and running on your local machine is a breeze! Follow these steps:

*   **Clone the Repository**:
    First, grab a copy of the project files by cloning the repository from GitHub.

    ```bash
    git clone https://github.com/skido600/my-node-js-journey.git
    ```

*   **Navigate to the Project Directory**:
    Change into the project's root folder after cloning.

    ```bash
    cd my-node-js-journey/http
    ```

*   **Install Dependencies**:
    While this project uses only built-in Node.js modules, it's good practice to run `npm install` to ensure everything is initialized, especially if you plan to add external libraries later.

    ```bash
    npm install
    ```

*   **Start the Server**:
    With everything set up, you can now start the HTTP server.

    ```bash
    node http.js
    ```
    You should see a message in your terminal indicating the server is running on port `3001`.

---

## 🚀 Usage

Once the server is running, you can access the different endpoints in your web browser or with a tool like `curl`.

*   **Access the Home Page**:
    Navigate to the `/home` route to see the default home message.

    ```
    http://localhost:3001/home
    ```
    Expected output in your browser: `this is home page`

*   **Retrieve File Content**:
    Access the `/file` route to view the content of `file.txt`.

    ```
    http://localhost:3001/file
    ```
    Expected output in your browser: `lorem chuks ebisi`

*   **Test 404 Page**:
    Try visiting any other undefined route to see the custom 404 response.

    ```
    http://localhost:3001/some-other-page
    ```
    Expected output in your browser: `404 page`

---

## ✨ Features

This project provides a clear demonstration of several fundamental web server functionalities:

*   **Basic HTTP Server Setup**: Establishes a server instance using Node.js's native `http` module, listening on a specified port.
*   **Route Handling**: Implements simple conditional routing to serve different content based on the incoming request URL (`/home`, `/file`).
*   **Static File Serving**: Demonstrates how to read a local file (`file.txt`) asynchronously and serve its content as an HTTP response.
*   **Custom 404 Error Page**: Provides a fallback response for any routes not explicitly defined, enhancing user experience for invalid requests.

---

## 💻 Technologies Used

| Technology  | Description                                                                     | Link                                   |
| :---------- | :------------------------------------------------------------------------------ | :------------------------------------- |
| **Node.js** | A JavaScript runtime built on Chrome's V8 JavaScript engine.                    | [nodejs.org](https://nodejs.org/)      |
| **JavaScript** | The programming language used to develop the server-side logic.                 | [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Web/JavaScript) |
| **`http` Module** | Node.js's built-in module for creating HTTP servers and clients.                | [nodejs.org/docs/latest/api/http.html](https://nodejs.org/docs/latest/api/http.html) |
| **`fs` Module** | Node.js's built-in module for interacting with the file system.                 | [nodejs.org/docs/latest/api/fs.html](https://nodejs.org/docs/latest/api/fs.html) |

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! ⭐ Thanks!

1.  🍴 Fork the Project
2.  🌿 Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  ✏️ Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  🚀 Push to the Branch (`git push origin feature/AmazingFeature`)
5.  📬 Open a Pull Request

---

## 📄 License

This project is distributed under the ISC License. For more details, see the `package.json` file.

---

## 👨‍💻 Author

Hi, I'm the developer behind this project! I'm passionate about building robust and scalable applications. Feel free to connect with me and explore more of my work.

*   **LinkedIn**: [Your LinkedIn Profile](https://linkedin.com/in/yourusername)
*   **Twitter**: [Your Twitter Profile](https://twitter.com/yourusername)

---

## 🏆 Badges

[![Node.js](https://img.shields.io/badge/Node.js-18.x-brightgreen?logo=node.js)](https://nodejs.org/en/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)