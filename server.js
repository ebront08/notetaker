// uses express to interact with the front end
const express = require("express");
// finds path for filename paths
const path = require("path");
const dataBase = require("./db/db.json");
// fs reads and writes to files
const fs = require("fs");
// initial port for app listeners
const PORT = process.env.PORT || 3001;
// creates the server for "express"
const app = express();
// helps set up data parsing so that express will interpret and format the data properly as json. This is needed for API calls.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Static link
app.use(express.static("public"));
// routes important for HTMl requests
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// API call response for all notes. Also sends results to browser in an array.
app.get("/api/notes", (req, res) => {
  res.json(dataBase.slice(1));
});

app.post("/api/notes", (req, res) => {
  const newNote = createNote(req.body, dataBase);
  res.json(newNote);
});
// This function creates a new note and count ID for each note
const createNote = (body, notesArray) => {
  const newNote = body;
  if (!Array.isArray(notesArray)) notesArray = [];
  if (notesArray.length === 0) notesArray.push(0);

  body.id = notesArray.length;
  notesArray[0]++;
  notesArray.push(newNote);

  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesArray, null, 2)
  );
  return newNote;
};

app.delete("/api/notes/:id", (req, res) => {
  deleteNote(req.params.id, dataBase);
  res.json(true);
});
// A const function that will delete notes if needed
const deleteNote = (id, notesArray) => {
  for (let i = 0; i < notesArray.length; i++) {
    let note = notesArray[i];
    if (note.id == id) {
      notesArray.splice(i, 1);
      fs.writeFileSync(
        path.join(__dirname, "./db/db.json"),
        JSON.stringify(notesArray, null, 2)
      );
      break;
    }
  }
};
// Where the app will listen
app.listen(PORT, () => {
  console.log(`App listens here http://localhost:${PORT}`);
});
