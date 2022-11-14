const path = require("path");
const express = require("express");
const fs = require("fs");
// const hostname = "127.0.0.1";
const port = 8000;
var newJsonDataToAppend;

var app = express();

app.listen(port, () => {
  console.log("My project app listening on port 8000!");
});

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname + "/index.html"));
  // // response.set({'Content-Type': 'image/jpg'});
  // response.sendFile(path.join(__dirname + "/images/cat-upside-down.jpg"));
});

app.post("/", (request, response) => {
  newJsonDataToAppend = request;
  fs.appendFile("data.json", newJsonDataToAppend);
});
