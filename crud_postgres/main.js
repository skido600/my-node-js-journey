const { port } = require("./config/dotenv");
const { connection } = require("./config/models/dbconnect");

const express = require("express");

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.post("/postData", (req, res) => {
  const { name, id } = req.body;

  const insert_query = "INSERT INTO demotable (name,id) VALUES ($1,$2)";

  connection.query(insert_query, [name, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    }
    res.status(201).json({ data: result });
  });
});

server.get("/fetchData", (req, res) => {
  const Fetch_query = "SELECT * from demotable";
  connection.query(Fetch_query, (err, result) => {
    if (err) {
      res.json(err);
    }
    res.status(201).json({ data: result.rows });
  });
});

server.get("/fetchbyid/:id", (req, res) => {
  const id = req.params.id;
  const fetch_query = "SELECT * from demotable where id = $1";
  connection.query(fetch_query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    }
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No record found" });
    }
    res.status(201).json({ data: result.rows });
  });
});

server.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const update_query = "UPDATE demotable SET name=$1 WHERE id=$2";

  connection.query(update_query, [name, id], (err, result) => {
    if (err) {
      res.json(err);
    }
    res.status(201).json({ message: "updated" });
  });
});
server.listen(port, () => {
  console.log("server running", port);
});
