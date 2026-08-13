import jwt from "jsonwebtoken";

// Creates a JWT and sets it as an HTTP-only cookie (safer than storing in localStorage)
const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    httpOnly: true,                                   // JS on the frontend cannot read this cookie (XSS protection)
    secure: process.env.NODE_ENV === "production",     // HTTPS only in production
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,                  // 30 days in milliseconds
  });

  return token;
};

export default generateToken;