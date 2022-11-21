import User from "../models/userModel.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

//REGISTER
export const signupController = async (req, res) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    // Encrypt
    password: CryptoJS.AES.encrypt(
      password,
      process.env.SECERET_KEY
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//LOGIN
export const signinController = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json({ error: "Wrong password or username!" });

    // Decrypt
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECERET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json({ error: "Wrong password or username!" });

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;
    res.status(200).json({...info, accessToken});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
