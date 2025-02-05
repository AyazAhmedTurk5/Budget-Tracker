const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },
  price: {
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
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
  },
  aboutMe: { type: String },
  website: { type: String },
  budgetLimit: {
    type: Number,
    required: true,
  },
});

module.exports = {
  Budget: mongoose.model("Budget", budgetSchema),
  User: mongoose.model("User", userSchema),
};
