const http = require("http");
const fs = require("fs").promises;
const path = require("path");

const port = 2023;

const dataPath = path.join(__dirname, "note.json");

const readNotes = async () => {
  try {
    const data = await fs.readFile(dataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading from file: ${error.message}`);
  }
};

const writeNotes = async (notes) => {
  try {
    await fs.writeFile(dataPath, JSON.stringify(notes, null, 2));
  } catch (error) {
    console.log(error.message);
  }
};

const server = http.createServer(async (req, res) => {
  const method = req.method;
  const url = req.url;

  if (req.url === "/notes" && req.method === "GET") {
    const notes = await readFile();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(notes));
  } else if (req.url === "/notes" && req.method === "POST") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", async () => {
      const { title, content } = JSON.parse(body);

      // get the existing data already
      const notes = await readNotes();

      // create your own new data
      const newNote = {
        id: notes.length + 1,
        title,
        content,
      };

      notes.push(newNote);
      await writeNotes(notes);

      res.writeHead(201, { "content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Data received successfully!" }));

      //res.end(JSON.stringify(newNote));));
    });
  }

  // DELETE A NOTE BY ID
  else if (method === "DELETE" && url.startsWith("/deletenote/")) {
    // Get the url and convert it into a array of strings and we get the value of index 2 and attach it to the variable getid
    const getid = url.split("/")[2];

    // converting the getId which is a string to number data type
    const id = Number(getid);

    // check if id is a nnumber and return an error message if it is not
    if (isNaN(id)) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end(`Id is not a number`);
    }

    // Get our original database
    const notes = await readNotes();

    // Delete the note using its id from the database and return the other notes
    const allNotesWithoutTheDeletedID = notes.filter((note) => note.id !== id);

    // writing back to our database(note.json) file the updated notes without the deleted id
    await writeNotes(allNotesWithoutTheDeletedID);

    // upon successful deletion completion, return a successful message that says Note with id: ${id} is deleted from our database successfully
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Note with id: ${id} is deleted from our database successfully`);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end(`Endpoint not found`);
  }
});

server.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

// GET your id from the url
// Check the type and convert it
// Get your original database
// iterate through the database to filter the id of the note you want to delete
// Push the notes that shouldn't be deleted to a separate array
// write to the file the notes that shouldnt be deleted
