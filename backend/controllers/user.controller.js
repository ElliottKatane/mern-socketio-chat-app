import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    // toujours grâce au middleware protectRoute, on est sûr d'obtenir l'id de l'utilisateur connecté
    const loggedInUserId = req.user._id;

    // fetching all the users from the db, except the logged in user
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select({ password: 0, gender: 0 }); // $ne = not equal
    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("error in getUsersForSidebar controller", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};
