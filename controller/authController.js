import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
// bycriptjs is used to encrypr the password it will hash the password, doubt: how to decrypt the hashed password

export const SignUp = async (req, res, next) => {
  const { username, email, password } = req;
  const hashedPass = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPass });
  try {
    await newUser.save();
    res.status(201).json({
      message: "User added successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
