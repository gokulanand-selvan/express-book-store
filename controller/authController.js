import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/customError.js";
// bycriptjs is used to encrypr the password it will hash the password, doubt: how to decrypt the hashed password
import jwt from "jsonwebtoken";

export const SignUp = async (req, res, next) => {
  const { username, email, password } = req.body;
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

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "Invalid credentials"));
    }
    const validPassword = bcryptjs.compare(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid Credentials"));
    }
    // in jwt.signin({USE UNIQUE THINGS LIKE id})
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // we can send data we can do like this as we destructures and taken the password out and we can send the rest to client
    const { password: hashedPassword, ...rest } = validUser._doc;
    // this is the cookie setting method to browser,we use httponly to deny 3rd party sites to set cookies and exipres for expiry date
    res
      .cookie("Authorization", token, {
        httpOnly: true,
        expires: Date(Date.now() + 3600000),
      })
      .status(200)
      .json({
        status: "success",
        rest,
      });
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
