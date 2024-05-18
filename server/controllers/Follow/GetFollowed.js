const Follow = require("../../models/Follow");

module.exports.GetFollowed = async (req, res) => {
  const UserId = req.query.UserId;

  try {
    const followedUsers = await Follow.find({ FollowUserId: UserId }).populate({
      path: "FollowedUserId", // Correct path as a string
      select: "username role", // Fields to populate
    });
    return res.status(200).send(followedUsers);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
