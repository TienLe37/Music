const Comment = require("../../models/Comment");

module.exports.CreateComment = async (req, res) => {
  const { UserCommentId, SongId, Content } = req.body;
  try {
    const comment = await Comment({
      UserCommentId: UserCommentId,
      SongId: SongId,
      Content: Content,
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    });
    const savedComment = await comment.save();
    res.status(200).send(savedComment);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports.GetComment = async (req, res) => {
  const { SongId } = req.body;
  try {
    const comments = await Comment.find({ SongId: SongId }).populate('UserCommentId').sort({ createdAt: 1 });

    res.status(200).json(comments);
  } catch (error) {
    res
      .status(500)
      .json(error);
  }
};

module.exports.UpdateComment = async (req, res) => {
  const { UserCommentId, SongId, Content } = req.body;
  const updateComment = await Comment.findOneAndUpdate(
    {
      UserCommentId: UserCommentId,
      SongId: SongId,
    },
    { Content: Content },
    { new: true }
  )
    .then(() => {
      res.status(200).send("Updated comment successfully");
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

module.exports.DeleteComment = async (req, res) => {
  const { commentId } = req.body;
  await Comment.findByIdAndDelete({ _id: commentId })
    .then(() => {
      res.status(200).send("Delete Successful");
    })
    .catch((err) => res.status(500).send(err.message));
};
