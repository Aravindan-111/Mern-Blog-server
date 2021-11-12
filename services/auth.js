const bcrypt = require("bcrypt");
const User = require("../models/User");

const auth = {
  async register(req, res) {
    try {
      console.log("rrgister success");
      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      const hashedPass = await bcrypt.hash(req.body.password, salt);
      console.log(hashedPass);

      //   user schema
      const newUser = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPass,
      });
      const user = await newUser.save();
      res
        .status(200)
        .send({ register: "user registered successfully", details: user });
    } catch (err) {
      console.log(err);
      res.status(500).send({ Error: "Error in register", err });
    }
  },
  async login(req, res) {
    try {
      const userExist = await User.findOne({ userName: req.body.userName });
      !userExist &&
        res.status(400).send({ message: "User not exist, try register" });

      //   compare password
      const isValid = await bcrypt.compare(
        req.body.password,
        userExist.password
      );
      !isValid &&
        res
          .status(400)
          .send({ message: "Password is incorrect, try with another one" });

      const { password, ...others } = userExist._doc;
      res
        .status(200)
        .send({ Message: "user logged in successfull", details: others });
    } catch (err) {
      console.log(err);
      res.status(400).send({ Error: "Error in login", Details: err });
    }
  },
};

module.exports = auth;
