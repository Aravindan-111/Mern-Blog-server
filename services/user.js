const User = require("../models/User");
const Post = require("../models/Post");
const { put } = require("../routes/routes");
const bcrypt = require("bcrypt");

const user = {
  // get user details
  async get(req, res) {
    try {
      const user = await User.findById(req.params.id);
      console.log(user);
      const { password, ...others } = user._doc;
      res.status(200).send(others);
    } catch {
      res.status(500).send("Error in getting user");
    }
  },

  //   update user details
  async put(req, res) {
    if (req.body.userId === req.params.id) {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      try {
        const updateUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { returnDocument: "after" }
        );
        console.log("updated user is : ", updateUser);
        res.status(200).send({ Message: "Updated successfully", updateUser });
      } catch (err) {
        console.log("Error in : ", err);
        res.status(500).send("Error in updation");
      }
    } else {
      res.status(401).send("You can't update others posts");
    }
  },

  // delete
  async delete(req, res) {
    if (req.body.userId === req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        if (user) {
          try {
            //   delete user's all posts
            await Post.deleteMany({ userName: user.userName });
            // delete user
            await User.findByIdAndDelete(req.params.id);
            res.status(200).send({ Message: "user delete successfully", user });
          } catch (err) {
            res.status(404).send("error in delete");
          }
        } else {
          res.status(500).send("user does not exist");
        }
      } catch (err) {
        res.status(500).send("you r not permitted to delete others post");
      }
    } else {
      res.status(500).send("ID not found");
    }
  },
};

module.exports = user;
