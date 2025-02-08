const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, Budget } = require("../models/model");

module.exports = router;

//controllers
//middleware along with routes

// Add a new expense
router.post("/add-expense", async (req, res) => {
  try {
    const { title, price, date } = req.body;

    if (!title || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Budget({
      title,
      price,
      date,
    });

    await newExpense.save();

    res
      .status(201)
      .json({ message: "Expense added successfully", expense: newExpense });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-expense/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedExpense = await Budget.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/edit-expense/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, date } = req.body;

    // Check if the expense exists
    const existingExpense = await Budget.findById(id);

    if (!existingExpense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Update fields only if provided
    if (title) existingExpense.title = title;
    if (price) existingExpense.price = price;
    if (date) {
      const formattedDate = new Date(date)
        .toLocaleDateString("en-GB")
        .split("/")
        .join("-");
      existingExpense.date = formattedDate;
    }

    await existingExpense.save();

    res.status(200).json({
      message: "Expense updated successfully",
      expense: existingExpense,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const expenses = await Budget.find();

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login Method
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      token,
      user: {
        ...userWithoutPassword,
        fatherName: user.lastName + " James",
        aboutMe:
          "I am a software engineer, who loves to Code and build new things, i am a full stack developer, i have experience in building web applications using React, Node, Express, MongoDB, and other technologies. I am a quick learner and always ready to learn new things.",
        website: "www.Grateful.com",
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Signup Method
router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password, budgetLimit } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      budgetLimit,
    });

    // Save the user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        budgetLimit: newUser.budgetLimit,
        fatherName: newUser.lastName + " " + "James",
        aboutMe:
          "I am a software engineer, who loves to Code and build new things, i am a full stack developer, i have experience in building web applications using React, Node, Express, MongoDB, and other technologies. I am a quick learner and always ready to learn new things.",
        website: "www.Grateful.com",
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Logout Method
router.post("/logout", (res) => {
  // Invalidate the token on the client side
  res.status(200).json({ message: "Logged out successfully" });
});

// //Post Method
// router.post("/post", async (req, res) => {
//   const data = new Budget({
//     name: req.body.name,
//     age: req.body.age,
//   });

//   try {
//     const dataToSave = await data.save();
//     res.status(200).json(dataToSave);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
// //Get all Method
// router.get("/getAll", async (req, res) => {
//   try {
//     const data = await Model.find();
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// //Get by ID Method
// router.get("/getOne/:id", async (req, res) => {
//   try {
//     const data = await Budget.findById(req.params.id);
//     console.log("Get One request received");
//     res.json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// //Update by ID Method
// router.patch("/update/:id", (req, res) => {
//   res.send("Update by ID API");
// });

// //Delete by ID Method
// router.delete("/delete/:id", (req, res) => {
//   res.send("Delete by ID API");
// });
