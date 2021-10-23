const express = require("express");
const data = require("./data.json");

//calls express
const app = express();

//sets up pug
app.set("view engine", "pug");

//serves static files to be read by user's browser
app.use(express.static("public"));

/* =======

  ROUTES

======= */

//app.get("/", (req, res) => {});

app.get("/", (req, res) => {
  res.render("index");
  res.locals = data.projects;
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects", (req, res) => {
  res.render("project");
});

app.get("/projects/:id", (req, res) => {
  const { id } = req.params;
  const project = data.projects[id];
  res.render("project", project);
});

/* =======

  SERVER

======= */

app.listen(3000, () => {
  console.log("The application is running on localhost:3000.");
});
