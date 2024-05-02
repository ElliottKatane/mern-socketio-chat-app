import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    // si les pw ne matchent pas, erreur
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    // on vérifie que l'utilisateur n'existe pas déjà
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // https://avatar-placeholder.iran.liara.run
    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // et maintenant, on fait un nouvel utilisateur
    const newUser = new User({
      // les valeurs proviennent de req.body
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePicture:
        gender === "male" ? boyProfilePicture : girlProfilePicture,
    });
    // on sauvegarde le nouvel utilisateur dans la DB.

    // si on a réussi à sauvegarder l'utilisateur, on renvoie un status 201 et les infos de l'utilisateur
    if (newUser) {
      // on va générer un JWT token
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePicture: newUser.profilePicture,
      }); // on renvoie les infos de l'utilisateur
    } else {
      //sinon on renvoie un status 400 et un message d'erreur
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // on vérifie que l'utilisateur existe
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // génère un token et set un cookie si l'utilisateur existe et que le mot de passe est correct
    generateTokenAndSetCookie(user._id, res);

    // si on a réussi à générer un token, on renvoie les infos de l'utilisateur
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: error.message });
  }
};
