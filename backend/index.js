require("dotenv").config();
const routes = require("./routes/route");
const express = require("express");
const mongoose = require("mongoose");
const mongoString = process.env.DATABASE_URL;
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [
      " https://budget-tracker-frontend-rbx9nx3iy-ayaz-ahmeds-projects-8adb8a57.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/budgets", routes);

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
