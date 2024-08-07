import { errorHandler } from "./customError.js";
import jwt from "jsonwebtoken";

export const verifyAuth = (req, res, next) => {
  //  first get the token
  const token = req.cookies.Authorization;
  if (!token) res.next(errorHandler(401, "Unauthorised"));

  //   here jwt will vwrify token for us
  jwt.verify(token, process.env.SECRET_KEY, (error, user) => {
    if (error) res.status(403).json("Invalid token");
    req.user = user;
    next();
  });
};
