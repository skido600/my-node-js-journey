console.log(
  "welcome to our first express class Representational State Transfer Application Programming Interface"
);

const port = 3001;
const express = require("express");
const fs = require("fs");
const app = express();
const crypto = require("crypto");
//middleware
app.use(express.json());

const readData = async () => {
  try {
    const data = fs.readFileSync("./user.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.log(`error  ${error}`);
  }
};

const writefile = async (data) => {
  try {
    const datafile = fs.writeFileSync(
      "./user.json",
      JSON.stringify(data, null, 2)
    );
    return datafile;
  } catch (error) {
    console.error("Write Error:", error.message);
    return false;
  }
};

app.get("/", (req, res) => {
  res.send("sending from our express server ");
});
app.get("/user", async (_req, res) => {
  try {
    const data = await readData();
    if (!data) {
      return res.status(404).json({ message: "data not found" });
    }
    res.status(201).json({
      message: `There are ${data.length} users in the database`,
      users: data,
    });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
});
app.post("/createuser", async (req, res) => {
  try {
    const { name, age, state } = req.body;
    const unmodified = req.body.password;
    if (!name || !age || !state || !unmodified) {
      return res.status(400).json({ message: "Required fields found missing" });
    }
    const salt = crypto.randomBytes(16).toString("hex");
    const hashpassword = crypto
      .scryptSync(unmodified, salt, 64)
      .toString("hex");
    console.log(hashpassword);
    //check
    const data = await readData();
    if (!data) {
      return res.status(404).json({ message: "data not found" });
    }
    const newuser = {
      id: data.length + 1,
      name,
      age,
      state,
      password: hashpassword,
    };
    data.push(newuser);
    await writefile(data);

    return res
      .status(201)
      .json({ message: `there are ${data.length} users in db`, user: newuser });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
});

app.get("/getuser/:id", async (req, res) => {
  try {
    const checkid = req.params.id;

    if (!checkid) {
      return res.status(404).json({ message: `ID Required` });
    }
    const id = Number(checkid);

    const data = await readData();

    const userwithid = data.find((user) => user.id === id);
    if (!userwithid) {
      return res.status(404).json({ message: "data not found" });
    }
    return res.status(201).json({
      message: `there are ${data.length} users in db`,
      user: userwithid,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
});

app.patch("/updateuser/:id", async (req, res) => {
  try {
    const checkid = req.params.id;
    const unmodified = req.body.password;
    const state = req.body.state;
    if (!checkid || !state) {
      return res.status(404).json({ message: `ID Required` });
    }
    const id = Number(checkid);

    const data = await readData();

    const userwithid = data.find((user) => user.id === id);
    if (!userwithid) {
      return res.status(404).json({ message: "data not found" });
    }
    const salt = crypto.randomBytes(16).toString("hex");
    const hashpassword = crypto
      .scryptSync(unmodified, salt, 64)
      .toString("hex");
    console.log(hashpassword);

    userwithid.password = hashpassword;
    userwithid.state = state;
    await data.push(userwithid);

    writefile(data);
    return res.status(201).json({
      message: `there are ${data.length} users in db`,
      user: userwithid,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "internal server error" });
  }
});
app.listen(port, () => {
  console.log("server ruuning on port", port);
});
