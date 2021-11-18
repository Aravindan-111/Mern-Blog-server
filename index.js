const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");

const router = require("./routes/routes");
const multer = require("multer");
const MONGO_URL =
  "mongodb+srv://aravindan:admin123@test-cluster-1.cho6i.mongodb.net/blog?retryWrites=true&w=majority";

// mongoose connect
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log("error", err);
  });

// image upload using multer

// chossing file location for storing
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());

// make public folder
app.use("/images", express.static(path.join(__dirname, "/images")));

app.use("/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).send("file has been uploaded");
  } catch (err) {
    res.send(500).send("erro in uploading");
  }
});

// middlewares
app.use("/", router);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server running at port 3001");
});
