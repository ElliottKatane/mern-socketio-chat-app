import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  }); // on génère un token
  // la valeur entre "" est le nom du cookie. Doit être le même que dans le middleware protectRoute à req.cookies.nomDuCookie
  res.cookie("jwt", token, {
    httpOnly: true, // le cookie ne sera pas accessible en JS. empêche les attaques XSS
    maxAge: 1000 * 60 * 60 * 24, // 1000ms * 60s * 60min * 24h = 1 jour
    sameSite: "strict", // le cookie ne sera pas envoyé avec les requêtes cross-origin
    secure: process.env.NODE_ENV !== "development",
  }); // on set le cookie
  // si secure est à true, le cookie ne sera envoyé que si la connexion est HTTPS. Et il ne se supprimera pas avec postman
};
export default generateTokenAndSetCookie;
