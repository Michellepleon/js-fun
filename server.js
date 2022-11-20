//------------------------------------------------------------------------------
// IMPORTING PACKAGES & DECLARATIONS OF CONSTANTS
//------------------------------------------------------------------------------
const path = require("path");
const express = require("express");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
var app = express();
app.use(express.json());
app.use(express.urlencoded());

const port = 8000;
//------------------------------------------------------------------------------
// DATABASE FUNCTIONS
//------------------------------------------------------------------------------
// Initialize dataBase connection on dataBase.db with SQLite3
function openDataBaseConnection() {
  let dataBase = new sqlite3.Database(
    path.join(__dirname + "/data/dataBase.db"),
    "OPEN_READWRITE | OPEN_CREATE",
    (error) => {
      if (error) {
        return console.error(error.message);
      }
      console.log("Connected to the dataBase.db SQlite database.");
    }
  );
  return dataBase;
}

// Close the connection on dataBase.db with SQLite3
function closeDataBaseConnection(dataBase) {
  dataBase.close((error) => {
    if (error) {
      console.error(error.message);
    }
    console.log("Close the database connection.");
  });
}

function insertIntoDataBaseTable(dataBase, newObjectData) {
  dataBase.run(
    `INSERT INTO Clients(catName, personName, catAge) VALUES(?,?,?)`,
    [newObjectData.catName, newObjectData.personName, newObjectData.catAge]
  );
}

function createDataBaseTable(dataBase) {
  dataBase.run(
    "CREATE TABLE IF NOT EXISTS Clients(id INTEGER PRIMARY KEY AUTOINCREMENT, catName text, personName text, catAge integer)"
  );
}
//------------------------------------------------------------------------------
// DECLARATIONS OF FUNCTIONS
//------------------------------------------------------------------------------
//no functions here for now
//------------------------------------------------------------------------------
// INITIALIZING THE LISTEN ON PORT WITH EXPRESS APP
//------------------------------------------------------------------------------
app.listen(port, () => {
  console.log("My project app listening on port 8000!");
});
//------------------------------------------------------------------------------
// SERVICES FOR GET HTTP METHOD REQUESTS
//------------------------------------------------------------------------------
app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname + "/index.html"));
});
//------------------------------------------------------------------------------
// SERVICES FOR POST HTTP METHOD REQUESTS
//------------------------------------------------------------------------------
app.post("/", (request, response) => {
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  let newObjectData = request.body;
  let dataBase = openDataBaseConnection();
  createDataBaseTable(dataBase);
  insertIntoDataBaseTable(dataBase, newObjectData);
});
