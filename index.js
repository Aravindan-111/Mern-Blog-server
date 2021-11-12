const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const app = express();

const router = require("./routes/routes");
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
app.use(cors());
app.use(express.json());
// middlewares
app.use("/", router);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server running at port 3001");
});
