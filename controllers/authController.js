import User from "../models/userModel.js";
import CryptoJS from "crypto-js";

export const signupController = async (req, res) => {
   const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.SECERET_KEY).toString()
   })
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(404).json(error)
  }
};
