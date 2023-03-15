const DATABASE_URL =
  "mongodb+srv://shreyanshandilya:NcjtCDV5by816iMH@cluster0.a2pgynk.mongodb.net/HackFest23";
// const DATABASE_URL = "mongodb://localhost:27017/hackfest23";
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
// const User = require('./schemas/teams');
const User = require("./schemas/testteam");
const Organizers = require("./schemas/organizing");
const Announcements = require("./schemas/announcement");
const app = express();
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
//database
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb" + err));
const PORT = process.env.PORT || 8000;
app.post("/register", function (req, res) {
  const {
    college,
    team_captain,
    team_captain_email,
    team_captain_phone,
    team_members,
    password,
    team_name,
  } = req.body;
  const newUser = new User({
    college,
    team_captain,
    team_captain_email,
    team_captain_phone,
    team_members,
    team_name,
    password,
  });

  newUser
    .save()
    .then(() => {
      res.status(200).json({ ...newUser, message: "Successfully Registered!" });
      console.log("New user " + team_name + " account has been registered");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/login", (req, res) => {
  const { team_name, password } = req.body;

  User.findOne({ team_name: team_name })
    .then((foundUser) => {
      if (foundUser.password === password) {
        console.log("User " + team_name + " has been successfully logged in");
        res.status(200).json({
          message: "Successfully logged in",
        });
      } else {
        res.status(404).json({
          message: "Incorrect password or username",
        });
        console.log("Incorrect password or username");
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/organizing", async (req, res) => {
  const organizing_members = await Organizers.find();
  // console.log(organizing_members);
  res.send(organizing_members);
});
app.get("/announcement", async (req, res) => {
  const announcement = await Announcements.find();
  res.send(announcement);
});
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});