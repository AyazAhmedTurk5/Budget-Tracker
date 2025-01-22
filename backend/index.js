const routes = require("./routes/route");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

// Middleware to parse JSON requests
app.use(express.json());

// Define your routes
app.use("/api", routes);

// Connect to MongoDB
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

// Start the server
app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
