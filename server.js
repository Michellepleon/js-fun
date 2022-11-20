const path = require("path");
const express = require("express");
const fs = require("fs");
// const hostname = "127.0.0.1";
const port = 8000;
var dataBase = [];

var app = express();
app.use(express.json());
app.use(express.urlencoded());

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

app.listen(port, () => {
  console.log("My project app listening on port 8000!");
});

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/", (request, response) => {
  response.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  let newObjectData = request.body;
  writeToFile(newObjectData);
});
