const express = require("express");

const app = express();

const port = 8080;

const path = require("path");

const { v4: uuidv4 } = require("uuid");

const methodOverride = require("method-override");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(path.join(__dirname, "photo")));

app.listen(port, () => {
  console.log(`app is listening to the port ${port}`);
});

let posts = [
  {
    id: uuidv4(),
    username: "sashank",
    content: "i love coding",
  },
  {
    id: uuidv4(),
    username: "saswat",
    content: "i love to bark",
  },
  {
    id: uuidv4(),
    username: "sino",
    content: "i love to play",
  },
];

app.get("/instagram", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/instagram/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/instagram", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/instagram");
});

app.get("/instagram/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});
app.patch("/instagram/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/instagram");
});

app.get("/instagram/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.delete("/instagram/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id != p.id);
  res.redirect("/instagram");
});
