const express = require("express");
const connectToDatabase = require("./db");
require("dotenv").config();

const app = express();

const cors = require("cors");

app.use(cors({
  origin: process.env.Frontend_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const host = process.env.HOST;
const port = process.env.PORT || 10000;

// app.use(express.static('public'));
app.get("/", (req, res) => {
  try {
    res.status(200).json({ message: "Backend is Working", status: "okay" });
  } catch (error) {
    res.status(400).json({ message: "Backend is off", status: "off" });
  }
});

app.get("/ping", (req, res) => {
  res.status(200).send("Server is Awake!");
});

app.use("/task_status", require("./routes/tasker_status.route"));
app.use("/task_category", require("./routes/tasker_category.route"));
app.use("/tasks", require("./routes/tasker_tasks.route"));

app.use("/users", require("./routes/user.route"));

app.use("/login", require("./routes/login.route"));
app.use("/signup", require("./routes/signup.route"));

app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

connectToDatabase()
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is listening on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to run database, and Express:", error.message);
  });
