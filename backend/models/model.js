const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  age: {
    required: true,
    type: Number,
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  // ...other fields...
});

module.exports = {
  Budget: mongoose.model("Budget", budgetSchema),
  User: mongoose.model("User", userSchema),
};
