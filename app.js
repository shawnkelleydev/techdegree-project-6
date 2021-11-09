const { response } = require("express");
const express = require("express");
const data = require("./data.json");

//calls express
const app = express();

//sets up pug
app.set("view engine", "pug");

//serves static files to be read by user's browser
app.use("/static", express.static("public"));
/* =======

  ROUTES

======= */

//app.get("/", (req, res) => {});

app.get("/", (req, res) => {
  res.locals.projects = data.projects;
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects", (req, res) => {
  res.render("project");
});

app.get("/projects/:id", (req, res, next) => {
  const { id } = req.params;
  const project = data.projects[id];
  res.locals.title = project.project_name;
  res.locals.description = project.description;
  res.locals.techs = project.technologies;
  res.locals.live = project.live_link;
  res.locals.github = project.github_link;
  res.locals.img = project.image_urls;
  res.locals.alts = project.image_alts;
  res.render("project");
});

app.use((req, res, next) => {
  const err = new Error("This is not the page you're looking for.");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.err = err;
  if (err.status === 404) {
    res.render("page-not-found");
    console.log("404 - please try again.");
  } else if (err.status === undefined) {
    res.render("error");
    console.log("Bad things just happened.  Please try again.");
  }
});

/* =======

  SERVER

======= */

const route = 3000;

app.listen(route, () => {
  console.log(`The application is running on localhost:${route}.`);
});
