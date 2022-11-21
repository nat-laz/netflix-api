import User from "../models/userModel.js";
import CryptoJS from "crypto-js";

//UPDATE
export const updateUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString();
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ error: "You can update only your account!" });
  }
};

//DELETE
export const deleteUser = async (req, res) => {
  if (req.user.id === req.params.id || req.user.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "User has been deleted." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json({ error: "You can delete only your account!" });
  }
};

//GET ALL
export const getAllUser = async (req, res) => {
    const query = req.query.new
    if (req.user.isAdmin) {
        try {
          const users = query ? await User.find().limit(2) : await User.find()
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      } else {
        res.status(403).json({ error: "You are not allowed to see all users" });
      }
};

// GET
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserStats = async (req, res) => {};
