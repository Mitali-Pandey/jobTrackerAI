import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protects routes — only lets the request through if a valid token exists
export const protect = async (req, res, next) => {
  let token;

  // Read token from cookie, or from Authorization header as backup
  if (req.cookies?.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    next(); // token valid, move on to the actual route handler
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};