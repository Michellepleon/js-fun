//------------------------------------------------------------------------------
// IMPORTING PACKAGES & DECLARATIONS OF CONSTANTS
//------------------------------------------------------------------------------
const path = require("path");
const express = require("express");
const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
// const hostname = "127.0.0.1";
const port = 8000;
var app = express();
app.use(express.json());
app.use(express.urlencoded());
//------------------------------------------------------------------------------
// INITIALIZE DATABASE WITH SQLITE3
//------------------------------------------------------------------------------
let db = new sqlite3.Database(path.join(__dirname + "/data/dataBase.db"), (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQlite database.");
});
//------------------------------------------------------------------------------
// DECLARATIONS OF FUNCTIONS
//------------------------------------------------------------------------------
async function writeToFile(newObjectData) {
  const dataAsString = await fs.readFile(
    path.join(__dirname + "/data/data.json")
  );
  const dataAsObject = JSON.parse(data);
  dataAsJson.push(newObjectData);
  await fs.writeFile(
    path.join(__dirname + "/data/data.json"),
    JSON.stringify(dataAsJson)
  );
}
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
  writeToFile(newObjectData);
});
