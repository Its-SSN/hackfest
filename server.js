const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
dotenv.config();
const { readdirSync } = require("fs");
const app = express();
app.use(express.json());
app.use(cors());
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r))); // remeber this syntax for creating routes dynamically
app.use(bodyParser.urlencoded({ extended: true }));
//database
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb" + err));
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
// console.log((+new Date() * Math.random()).toString().substring(0, 1));
