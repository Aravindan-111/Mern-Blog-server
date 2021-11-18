const Post = require("../models/Post");
const User = require("../models/User");
const { get } = require("./user");

const post = {
  // create post
  async create(req, res) {
    const newPost = new Post(req.body);
    try {
      const post = await newPost.save();
      res.status(200).send({ message: "created post", post });
    } catch (err) {
      console.log("error in ", err);
      res.status(500).send({ message: "error in create post", details: err });
    }
  },

  //   update post
  async update(req, res) {
    try {
      const updatePost = await Post.findById(req.params.id);
      console.log(updatePost);
      if (updatePost.userName === req.body.userName) {
        try {
          const updation = await Post.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
          );
          res.status(200).send({ message: "updated successfully", updation });
        } catch (err) {
          console.log(err);
          res
            .status(500)
            .send({ message: "error in post updation", details: err });
        }
      } else {
        res.status(500).send("you can update only your post");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "error in updation", details: err });
    }
  },

  //   delete post
  async delete(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userName === req.body.userName) {
        try {
          // delete one post
          await post.delete();
          res.status(200).send("successfully deleted");
        } catch (err) {
          res.status(401).send("error in delete post");
        }
      } else {
        res.status(401).send("you can delete only your post");
      }
    } catch (err) {
      res.status(500).send("error in delete");
    }
  },

  //   get post
  async get(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      console.log(post);
      res.status(200).send({ message: "get post done", post: post });
    } catch {
      res.status(500).send({ message: "error in get post" });
    }
  },

  // get all posts or specific user's all posts
  async getAll(req, res) {
    // getting query /?username=value
    const username = req.query.user;
    console.log(username);
    if (username) {
      try {
        let posts;
        if (username) {
          posts = await Post.find({ username });
          console.log("posts by user", posts);
        } else {
          posts = await Post.find();
          console.log("all posts", posts);
        }
        res.status(200).send({ message: "get posts", posts });
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      let posts = await Post.find();
      console.log("posts all:", posts);
      res.status(200).send({ message: "get posts", posts: posts });
    }
  },
};
module.exports = post;
