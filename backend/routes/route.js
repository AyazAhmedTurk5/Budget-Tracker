const express = require("express");
const router = express.Router();
const {
  addExpense,
  editExpense,
  deleteExpense,
  getExpenses,
} = require("../controllers/budgetController");
const { login, signup } = require("../controllers/userController");
const authenticateToken = require("../middleware/authmiddleware");

// Budget Routes
router.post("/add-expense", authenticateToken, addExpense);
router.patch("/edit-expense/:id", authenticateToken, editExpense);
router.delete("/delete-expense/:id", authenticateToken, deleteExpense);
router.get("/", authenticateToken, getExpenses);

// User Routes
router.post("/login", login);
router.post("/signup", signup);

module.exports = router;
