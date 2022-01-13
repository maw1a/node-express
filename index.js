// config env
require("dotenv").config();

// importing express
const express = require("express");

const typeorm = require("typeorm");

const userRoutes = require("./routes/user");

// Create DB connection

typeorm
  .createConnection({
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: 5432,
    entities: [require("./entity/userSchema").userSchema], // all the entities
    synchronize: true, // dev: sync true
  })
  .then((conn) => console.log(">>> Database connected"));

// Creating Express Application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP Methods
app.get("/ping", (req, res) => res.send("pong"));

// User Routes
app.use("/user", userRoutes);

app.listen(8000, () => console.log(">>> Listening on port 8000"));
