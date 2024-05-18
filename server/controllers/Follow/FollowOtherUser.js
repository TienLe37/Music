const Follow = require("../../models/Follow");

module.exports.FollowOtherUser = async(req, res) => {
  const { FollowUserId, FollowedUserId } = req.body;
  const start = Date.now();

  const followed = await Follow.exists({
    FollowUserId: FollowUserId,
    FollowedUserId: FollowedUserId,
  });

  if (followed) {
    await Follow.deleteOne({
      FollowUserId: FollowUserId,
      FollowedUserId: FollowedUserId,
    });
  } else {
    const FollowOtherUser = await new Follow({
      FollowUserId: FollowUserId,
      FollowedUserId: FollowedUserId,
      CreatedAt: start
    });
     FollowOtherUser.save((err, savedFollow) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err.message);
      } else {
        return res.status(200).send(savedFollow);
      }
    });
  }
};
