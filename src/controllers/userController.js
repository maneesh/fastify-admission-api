const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const SaasCust = require("../models/SaasCust");
const JWT_SECRET = process.env.JWT_SECRET || "yourSuperSecretKey12345";
const connection = require('../db/connection'); 
const SaasCustUser = require("../models/SaasCustUser.js");

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
    const { fullname='', email, mobile,name } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const password = "Ravi@555";
    const role_id = 2;

    const newUser = await User.create({
      fullname,
      email,
      password,
      mobile,
      role_id,
    });
    const newSaasCust =  await SaasCust.create(name);

    const newSaasCustUser = await SaasCustUser.create({
      user_id: newUser.id,
      saas_cust_id: newSaasCust.id,
    });
    
    console.log('Created SaasCustUser:', newSaasCustUser);    console.log('Created SaasCust:', newSaasCust);
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
       [user.role_id]
    );
    const [[scuRow]] = await connection.query(
      `SELECT saas_cust_id FROM saas_cust_user WHERE user_id = ?`,
      [user.id]
    );

    // Check if scuRow exists, if not, send an error
    if (!scuRow || !scuRow.saas_cust_id) {
      return res.status(400).send({ message: "No SaaS customer associated with this user" });
    }

    // Step 6: Fetch additional info like role_name
    const [[extraInfo]] = await connection.query(
      `SELECT 
         (SELECT name FROM role WHERE id = ?) AS role_name,
         (SELECT name FROM saas_cust WHERE id = ?) AS school_name`,
      [user.role_id, scuRow.saas_cust_id]
    );

    
    res.send({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullname: user.fullname,
        email: user.email,
        mobile: user.mobile,
        role_id: user.role_id,
        name:user.name,
        role_name: extraInfo.role_name,
        school_name: extraInfo.school_name,
        features: features.map(f => f.name)      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).send({ message: "Error logging in", error: err.message });
  }}
