const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, Budget } = require("../models/model");

module.exports = router;

//controllers
//middleware along with routes

// Add a new expense
router.post("/expenses", async (req, res) => {
  try {
    const { userId, title, price, category } = req.body;

    if (!userId || !title || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Budget({
      userId,
      title,
      price,
      category,
    });

    await newExpense.save();

    res
      .status(201)
      .json({ message: "Expense added successfully", expense: newExpense });
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

    console.log(newUser);
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
