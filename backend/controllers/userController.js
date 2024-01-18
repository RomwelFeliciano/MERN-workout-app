const User = require("../models/userModel");
// npm i jsonwebtoken
const jwt = require("jsonwebtoken");

// Create Token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// console.log(createToken());

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    console.log(user);

    // Create a token inside here
    const token = createToken(user._id);
    console.log(token);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Signup User
const signupUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.signup(email, password);
    console.log(user);

    // Create a token inside here
    const token = createToken(user._id);
    console.log(token);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { loginUser, signupUser };
