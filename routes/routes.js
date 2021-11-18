const router = require("express").Router();
const auth = require("../services/auth");
const user = require("../services/user");
const post = require("../services/post");

router.get("/post", post.getAll);
router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/:id", user.get);
router.put("/:id", user.put);
router.delete("/:id", user.delete);
router.post("/post/:id", post.create);
router.put("/post/:id", post.update);
router.delete("/post/:id", post.delete);
router.get("/post/:id", post.get);
// router.get("/post", post.getAll);

module.exports = router;
