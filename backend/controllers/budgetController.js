const { Budget } = require("../models/model");

exports.addExpense = async (req, res) => {
  const { title, price, date } = req.body;

  if (!title || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newExpense = new Budget({ title, price, date });

  try {
    await newExpense.save();
    res
      .status(201)
      .json({ message: "Expense added successfully", expense: newExpense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.editExpense = async (req, res) => {
  const { id } = req.params;
  const { title, price, date } = req.body;

  try {
    const existingExpense = await Budget.findById(id);
    if (!existingExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (title) existingExpense.title = title;
    if (price) existingExpense.price = price;
    if (date) existingExpense.date = date;

    await existingExpense.save();
    res
      .status(200)
      .json({
        message: "Expense updated successfully",
        expense: existingExpense,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExpense = await Budget.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Budget.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
