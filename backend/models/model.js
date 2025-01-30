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
  limit: {
    required: true,
    type: Number, // The budget limit for each category
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
  // Additional fields
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  // budgets: [budgetSchema], // Embedding an array of budget categories
});

module.exports = {
  Budget: mongoose.model("Budget", budgetSchema), // This can still be used for budget-specific actions if needed
  User: mongoose.model("User", userSchema),
};
