const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const SaasCustUser = require("../models/SaasCustUser");
const JWT_SECRET = process.env.JWT_SECRET || "yourSuperSecretKey12345";

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.send(users);
  } catch (err) {
    console.error("Get Users Error:", err.message);
    res.status(500).send({ message: "Error retrieving users" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { fullname, email, mobile } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash("Ravi@555", 10);
    const role_id = 1;

    // Save user with hashed password
    const newUser = await User.create({
      fullname,
      email,
      password: hashedPassword,
      mobile,
      role_id,
    });
    await SaasCustUser.create({ saas_cust_id: newUser.id });

    // Respond with user data including hashed password
    res.status(200).send({
      message: "User created",
      user: {
        id: newUser.id,
        fullname: newUser.fullname,
        email: newUser.email,
        mobile: newUser.mobile,
        role_id: newUser.role_id,
        password: hashedPassword,
      },
    });
  } catch (err) {
    console.error("Create User Error:", err.message);
    res
      .status(500)
      .send({ message: "Error creating user", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(404).send({ message: "User not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }

    const token = jwt.sign({ user_id: user.id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.send({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        mobile: user.mobile,
        role_id: user.role_id,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).send({ message: "Error logging in", error: err.message });
  }
};
