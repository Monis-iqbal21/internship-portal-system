import {User} from "../models/schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExits = await User.findOne({ email: req.body.email });
    if (userExits) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });


  } catch (err) {
    res
      .status(500)
      .json({ message: "register : Server error from controller" + err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({ email: email});
    if(!user){
        return res.status(400).json({message: "Invalid email or password"});
    }

    const passMatch = await bcrypt.compare(password, user.password);
    if(!passMatch){
        return res.status(400).json({message: "Invalid email or password"});
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,   
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  }
  catch (err) {
    res
      .status(500)
      .json({ message: "login : Server error from controller" + err.message });
  }
};

export default { registerUser, loginUser };
