const express = require("express");
const ideas = require("./data/ideas");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

app.get("/", (req, res) => {
  res.send("API is running");
});

app.get("/api/ideas", (req, res) => {
  res.json(ideas);
});

app.get("/api/ideas/:id", (req, res) => {
  const idea = ideas.find((i) => i._id === req.params.id);
  res.json(idea);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
