const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./server/config/db");
const userRoutes = require("./server/routes/userRoutes");
const projectRoutes = require("./server/routes/projectRoutes");
const { notFound, errorHandler } = require("./server/middlewares/ErrorMW");
const path = require("path");

const app = express();

app.use(express.json());
dotenv.config();
connectDB();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get(
    "*",
    express.static(path.join(__dirname, "client", "build", "index.html"))
  );
  
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`
  )
);
