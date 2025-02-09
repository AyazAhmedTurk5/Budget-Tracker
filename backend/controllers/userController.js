const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/model");

exports.login = async (req, res) => {
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
};

exports.signup = async (req, res) => {
  const { firstName, lastName, email, password, budgetLimit } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      budgetLimit,
    });

    await newUser.save();
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
};
