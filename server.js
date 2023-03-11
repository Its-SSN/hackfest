const DATABASE_URL = "mongodb+srv://shreyanshandilya:NcjtCDV5by816iMH@cluster0.a2pgynk.mongodb.net/HackFest23"
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//database
mongoose
  .connect(DATABASE_URL, {
  
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb" + err));
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
