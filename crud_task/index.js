const express = require("express");
const fs = require("fs");
const path = require("path");
const port = 4001;
const { ramdon } = require("./model/randam");

const app = express();

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

app.get("/getusers/:adminid/:userid", async (req, res) => {
  try {
    //get the adminid and conver to number

    const adminID = Number(req.params.adminid);

    // check if the admin is a number
    if (isNaN(adminID)) {
      return res.status(400).json({ message: "invalid user ID" });
    }
    // import our database
    const { users } = await Readfile();
    // console.log(users);
    //checker to check if there is data in the db
    if (users.length <= 0) {
      return res.status(404).json({ message: "users not found" });
    }
    //get the admin from database
    const checkadmin = users.filter((user) => user.id === adminID);

    // console.log(checkadmin);
    if (checkadmin.length <= 0) {
      return res.status(404).json({ message: "Admin not found" });
    }
    const admin = checkadmin.filter((user) => user.isadmin === true);

    //authentiicate him if he is an admin
    if (!admin) {
      return res.status(403).json({ message: "unauthorized user not admin" });
    }
    //get user id
    const userid = Number(req.params.userid);

    if (isNaN(userid)) {
      return res.status(400).json({ message: "invalid user ID" });
    }
    const useradmin = users.filter((user) => user.id === userid);
    console.log(useradmin);
    if (useradmin.length === 0) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(201).json({
      message: `user with the id:${userid} found succesfully`,
      useradmin,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
});
app.delete("/delectuser/:adminid/:userid", async (req, res) => {
  try {
    // Get admin ID and convert to number
    const adminID = Number(req.params.adminid);

    if (isNaN(adminID)) {
      return res.status(400).json({ message: "invalid user admin ID" });
    }

    // Import database
    const { users } = await Readfile();

    // Check if the database is empty
    if (users.length === 0) {
      return res.status(404).json({ message: "users not found in db" });
    }

    // Find the user with the given admin ID
    const checkadmin = users.filter((user) => user.id === adminID);

    // If admin doesn't exist
    if (checkadmin.length <= 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Filter out only admins from the matched users
    const admin = checkadmin.filter((user) => user.isadmin === true);
    console.log(admin);

    // If the matched user is not an admin
    if (admin.length === 0) {
      return res.status(403).json({ message: "unauthorized user not admin" });
    }

    // Get the ID of the user that the admin wants to delete
    const peopleid = Number(req.params.userid);
    if (isNaN(peopleid)) {
      return res.status(400).json({ message: "invalid user ID" });
    }

    // Find the user to delete
    const userToDelete = users.find((user) => user.id === peopleid);
    if (!userToDelete) {
      return res.status(404).json({ message: "user not found" });
    }

    // Remove the user from the database
    const updatedUsers = users.filter((user) => user.id !== peopleid);

    // Save the updated database
    await WriteFile({ users: updatedUsers });

    return res.status(200).json({
      message: `user ${userToDelete.name} deleted successfully`,
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ message: "internal server error" });
  }
});

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

const datalocation = path.join(__dirname, "data", "User.json");
console.log(datalocation);
