import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    // req.cookies.nomDuCookie
    const token = req.cookies.jwt; // on importe le middlware cookieParser pour lire le cookie

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized, no token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next(); // sendMessage par exemple
  } catch (error) {
    res
      .status(401)
      .json({ message: "You are not authorized to access this route" });
  }
};

export default protectRoute;
