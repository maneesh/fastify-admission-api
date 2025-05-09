const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const SaasCust = require("../models/SaasCust");
const JWT_SECRET = process.env.JWT_SECRET || "yourSuperSecretKey12345";
const connection = require('../db/connection'); 

// GET all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).send(users);
  } catch (err) {
    console.error("Get Users Error:", err.message);
    res.status(500).send({ message: "Error retrieving users" });
  }
};

// CREATE a user
exports.createUser = async (req, res) => {
  try {
    const { full_name, email, mobile,name } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const password = "Ravi@555";
    const role_id = 1;

    const newUser = await User.create({
      full_name,
      email,
      password,
      mobile,
      role_id,
    });
    const newSaasCust =  await SaasCust.create(name);
    console.log('Created SaasCust:', newSaasCust);
    res.status(200).send({
      message: "User created successfully",
      user: newUser,
     //saasCust: newSaasCust
    });
  } catch (err) {
    console.error("Create User Error:", err.message);
    res.status(500).send({ message: "Error creating user", error: err.message });
  }
};

// LOGIN user
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
    const [features] = await connection.query(
      `SELECT DISTINCT f.name 
       FROM feature f
       JOIN role_feature rf ON rf.feature_id = f.id
       WHERE rf.role_id = ?`,
      {
        replacements: [user.role_id],
      }
    );
    
    res.send({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        mobile: user.mobile,
        role_id: user.role_id,
        name:user.name,
        features: features.map(f => f.name)      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).send({ message: "Error logging in", error: err.message });
  }}
