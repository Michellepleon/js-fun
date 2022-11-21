//------------------------------------------------------------------------------
// IMPORTING PACKAGES & DECLARATIONS OF CONSTANTS
//------------------------------------------------------------------------------
const path = require("path");
const express = require("express");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
var express = express();
express.use(express.json());
express.use(express.urlencoded());

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

function closeDataBaseConnection(dataBase) {
  dataBase.close((error) => {
    if (error) {
      console.error(error.message);
    }
    console.log("Close the database connection.");
  });
}

function createDataBaseTable(dataBase) {
  dataBase.run(
    "CREATE TABLE IF NOT EXISTS Clients(id INTEGER PRIMARY KEY AUTOINCREMENT, catName text, personName text, catAge integer)"
  );
}

function insertIntoDataBaseTable(dataBase, newObjectData) {
  dataBase.run(
    `INSERT INTO Clients(catName, personName, catAge) VALUES(?,?,?)`,
    [newObjectData.catName, newObjectData.personName, newObjectData.catAge]
  );
}

function getIdFromDataBase(dataBase) {
  dataBase.each("SELECT * FROM Clients", function (error, row) {
    if (error) return console.log(error.message);
    console.log(row.id);
  });
}

function getCatNameFromDataBase(dataBase) {
  dataBase.each("SELECT * FROM Clients", function (error, row) {
    if (error) return console.log(error.message);
    console.log(row.catName);
  });
}

function getPersonNameFromDataBase(dataBase) {
  dataBase.each("SELECT * FROM Clients", function (error, row) {
    if (error) return console.log(error.message);
    console.log(row.personName);
  });
}

function getCatAgeFromDataBase(dataBase) {
  dataBase.each("SELECT * FROM Clients", function (error, row) {
    if (error) return console.log(error.message);
    console.log(row.catAge);
  });
}
//------------------------------------------------------------------------------
// DECLARATIONS OF FUNCTIONS
//------------------------------------------------------------------------------
//no functions here for now
//------------------------------------------------------------------------------
// INITIALIZING THE LISTEN ON PORT WITH EXPRESS
//------------------------------------------------------------------------------
express.listen(port, () => {
  console.log("The API is now listening on port 8000 on localhost!");
});
//------------------------------------------------------------------------------
// SERVICES FOR GET HTTP METHOD REQUESTS
//------------------------------------------------------------------------------
express.get("/", (request, response) => {
  response.sendFile(path.join(__dirname + "/index.html"));
  response.sendStatus(200);
});
//------------------------------------------------------------------------------
// SERVICES FOR POST HTTP METHOD REQUESTS
//------------------------------------------------------------------------------
express.post("/", (request, response) => {
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  let newObjectData = request.body;
  let dataBase = openDataBaseConnection();
  createDataBaseTable(dataBase);
  insertIntoDataBaseTable(dataBase, newObjectData);
  response.sendStatus(200);
  // close connection to dataBase if necessary
  // closeDataBaseConnection();
});
