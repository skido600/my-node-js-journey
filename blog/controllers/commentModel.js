const comment = require("../models/comment-model");

const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { userid, username } = req.user;
    const postid = req.params.postid;
    console.log(userid, username);
    if (!text) {
      return res
        .status(404)
        .json({ sucess: false, message: "missing fields rquired" });
    }
    const post = await comment.create({
      text,
      postid,
      authorID: userid,
    });

    return res.status(200).json({
      sucess: true,
      message: `commented`,
      data: post,
    });
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .json({ message: `internal server error `, error: error.message });
  }
};

module.exports = { createComment };
