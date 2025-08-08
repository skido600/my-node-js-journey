const express = require("express");
const fs = require("fs");
const path = require("path");
const port = 4001;
const { ramdon } = require("./model/randam");

const app = express();
console.log(ramdon());
app.use(express.json());

//reading ffrom db
async function Readfile() {
  try {
    const data = fs.readFileSync(datalocation, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Read Error:", error.message);
    return [];
  }
}

//writing
async function WriteFile(data) {
  try {
    fs.writeFileSync(datalocation, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Write Error:", error.message);
  }
}

app.post("/createuser", async (req, res) => {
  try {
    const database = await Readfile();
    const { name, email } = req.body;
    const newname = name.toLowerCase();
    const newemail = email.toLowerCase();

    if (!newname || !newemail) {
      return res.status(404).json({ message: "This filds cant be empty" });
    }

    const users = database.users;
    if (!users || users.lenght === 0) {
      return res.status(400).json({ message: "users not found" });
    }

    console.log(users);
    const checkemail = users.some((user) => {
      return user.email === newemail;
    });

    console.log(checkemail);

    console.log(users);
    // const checkemail = users.filter((user) => user.email === newemail);
    if (checkemail) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const newuser = {
      id: ramdon(),
      email: newemail,
      name: newname,
      isadmin: false,
    };
    database.users.push(newuser);
    await WriteFile(database);
    res.status(201).json({ message: "successfuly created", users: newuser });
    console.log(newuser);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
});
app.get("/users", async (req, res) => {
  const isAdmin = req.query.isAdmin === "true";
  try {
    if (isAdmin) {
      // const database = await Readfile();
      const { users } = await Readfile();
      return res
        .status(201)
        .json({ message: `There are  ${users.length} in db`, users: users });
    }
    return res.status(403).json({ error: "Access denied.Admins only" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
});

// get users
app.get("/user", async (req, res) => {
  const data = await Readfile();

  console.log(data);
  res.json(data);
});
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

const datalocation = path.join(__dirname, "data", "User.json");
console.log(datalocation);
