const postmodel = require("../models/post-model");

const createpost = async (req, res) => {
  const { title, content } = req.body;
  const { userid, username } = req.user;
  console.log(userid, username);
  if (!title || !content) {
    return res
      .status(400)
      .json({ sucess: false, message: "missing fields rquired" });
  }
  try {
    const post = await postmodel.create({
      title,
      content,
      authorID: userid,
    });

    return res.status(200).json({
      sucess: true,
      message: `A post was create by ${username}`,
      data: post,
    });
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({ message: `internal server error ${error}` });
  }
};
const getApost = async (req, res) => {
  try {
    const postid = req.params.postid;
    if (!postid) {
      return res.status(404).json({ sucess: false, message: "id not found" });
    }
    const post = await postmodel.findById(postid);
    console.log(post);
    if (!post) {
      return res.status(404).json({ sucess: false, error: "post not found" });
    }
    return res.status(200).json({
      sucess: true,
      message: `post with id ${postid} found successfully`,
      post,
    });
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .json({ message: `internal server error `, error: error.message });
  }
};
const getPostByAuthor = async (req, res) => {
  try {
    const { userid, username } = req.user;
    console.log(userid, username);
    const id = req.params.id;
    if (!id || !userid) {
      return res
        .status(404)
        .json({ success: false, error: "Invalid user id or post id" });
    }

    const post = await postmodel.findOne({ authorID: userid, _id: id });
    if (!post) {
      return res.status(404).json({ sucess: false, error: "post not found" });
    }
    return res.status(200).json({
      success: true,
      message: `Post with id ${id} made by ${username} was found successfully`,
      post,
    });
  } catch (error) {
    console.log(error.stack);
    return res
      .status(500)
      .json({ message: `internal server error `, error: error.message });
  }
};
module.exports = { createpost, getApost, getPostByAuthor };
