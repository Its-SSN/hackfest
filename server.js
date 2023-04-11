const DATABASE_URL =
  "mongodb+srv://shreyanshandilya:hackfest@cluster0.a2pgynk.mongodb.net/HackFest23";
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./schemas/teams");
const Test = require('./schemas/testteam')
// const User = require('./schemas/testteam')
const Organizers = require("./schemas/organizing");
const Announcements = require("./schemas/announcement");
const Problems = require("./schemas/problemStatements");
const { clearCache } = require("ejs");
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

app.post("/change_password", async (req, res) => {
  const { Player_Email, old_password, new_password } = req.body;
  const foundUser = await User.findOne({ Player_Email });
  if (foundUser.password === old_password) {
    await User.findOneAndUpdate({ Player_Email }, { password: new_password });
    return res.status(200).json({ message: "OK" });
  } else {
    return res.status(400).json({ message: "Incorrect password" });
  }
});
app.post("/login", (req, res) => {
  const { Player_Email, password } = req.body;

  User.findOne({ Player_Email })
    .then((foundUser) => {
      if (foundUser.Player_Type == "team leader") {
        if (foundUser.password === password) {
          console.log(
            "User " + foundUser.Team_Name + " has been successfully logged in"
          );
          res.status(200).json({
            message: "Successfully logged in",
            data: foundUser,
          });
        } else {
          res.status(404).json({
            message: "Incorrect password or username",
          });
          console.log("Incorrect password or username");
        }
      } else {
        res.status(404).json({
          message: "Please login from Team leader's email address",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/attendance/:teamid", async (req, res) => {
  try {
    // console.log(req.params);
    const id = req.params.teamid;
    // console.log(id);
    // res.send("hello");
    const foundUser = await User.findOne({ Team_Id: id });
    let counter = foundUser.attendance_counter;
    counter = counter + 1;
    const teams = await User.find({ Team_Id: id });
    const teamsize = teams.length;
    // console.log(teamsize);
    if (teamsize < counter) {
      return res.status(400).json({ message: "Too many team members" });
    }
    await User.updateMany({ Team_Id: id }, { attendance_counter: counter });
    // await User.updateMany({Team_Id:id},{timesarray:[],current_absent:[0]});
    return res.status(200).json({ message: id });
  } catch (error) {
    return res.status(500).json({ message: error.mesaage });
  }
});

app.get("/refreshment_counter/:teamid", async (req, res) => {
  try {
    const id = req.params.teamid;
    const foundUser = await User.findOne({ Team_Id: id });
    let counter = foundUser.refreshment_counter;
    counter = counter + 1;
    const teams = await User.find({ Team_Id: id });
    const teamsize = teams.length;
    // console.log(teamsize);
    if (teamsize < counter) {
      return res.status(400).json({ message: "Too many refreshments" });
    }
    await User.updateMany({ Team_Id: id }, { refreshment_counter: counter });
    return res.status(200).json({ message: id });
  } catch (error) {
    return res.status(500).json({ message: error.mesaage });
  }
});
app.get("/refreshment_counter_two/:teamid", async (req, res) => {
  try {
    const id = req.params.teamid;
    const foundUser = await User.findOne({ Team_Id: id });
    let counter = foundUser.refreshment_counter_two;
    // res.json({ user: foundUser.refreshment_counter_two });
    counter = counter + 1;
    const teams = await User.find({ Team_Id: id });
    const teamsize = teams.length;
    if (teamsize < counter) {
      return res.status(400).json({ message: "Too many refreshments" });
    }
    const resp = await User.updateMany(
      { Team_Id: id },
      { refreshment_counter_two: counter }
    );
    // console.log(resp);
    return res.status(200).json({ message: `${id}` });
  } catch (error) {
    return res.status(500).json({ message: error.mesaage });
  }
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
app.get("/problem", async (req, res) => {
  const problem = await Problems.find();
  res.send(problem);
});
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});
app.get("/out/:teamid", async (req, res) => {
  try {
    const teamid = req.params.teamid;
    let { timesarray, current_absent } = await User.findOne({
      Team_Id: teamid,
    });
    let team = await User.find({ Team_Id: teamid });
    let teamSize = team.length - 1;
    console.log(teamSize);
    if (current_absent[current_absent.length - 1] > teamSize) {
      return res.status(404).json({
        message: "Too few members to get out",
      });
    }
    await User.updateMany(
      { Team_Id: teamid },
      {
        timesarray: [...timesarray, new Date()],
        current_absent: [
          ...current_absent,
          current_absent[current_absent.length - 1] + 1,
        ],
      }
    );
    res.status(200).json({ message: "out" });
  } catch (err) {
    console.log(err);
  }
});
app.get("/in/:teamid", async (req, res) => {
  try {
    const teamid = req.params.teamid;
    let { timesarray, current_absent } = await User.findOne({
      Team_Id: teamid,
    });
    if (current_absent[current_absent.length - 1] <= 0) {
      return res.status(404).json({
        message: "Too many members to get in",
      });
    }
    await User.updateMany(
      { Team_Id: teamid },
      {
        timesarray: [...timesarray, new Date()],
        current_absent: [
          ...current_absent,
          current_absent[current_absent.length - 1] - 1,
        ],
      }
    );
    res.status(200).json({ message: "in" });
  } catch (error) {
    console.log(error);
    return res.send(error.mesaage);
  }
  // const teams = await User.find({Team_id:teamid});
  // const d = new Date();
  // res.send({date:d});
});

app.post("/manHours", async(req, res) => {
  // const user = await User.findOne({Team_Name: "Cryptic Shadows"})
  const users = await User.find();

  // console.log(user.timesarray.length);
  users.map((user,i)=>{
    let time = user.timesarray ;
  let absent = user.current_absent;
  let timeDiff = [];
  for(let i = 1; i<time.length; i++){
    timeDiff.push(Math.abs(time[i] - time[i-1]))
  }
  let manHours = 0;
  for(let i = 0; i<timeDiff.length; i++){
    manHours+= (timeDiff[i]*absent[i+1]);
  }
  let totalHours = (manHours/3600000);
  let hours = Math.floor(totalHours);
let fraction = totalHours - hours;

let minutes = Math.round(fraction * 60);
console.log("Team:"+user.Team_Name+" Time:"+hours + " hours and " + minutes + " minutes");
  })
// res.send("Time:"+hours + " hours and " + minutes + " minutes");

})

app.get("/teams", async (req, res) => {
  const teams = (await User.find()).filter((item, i) => {
    return item.Player_Type === "team leader";
  });
  const teamNames = teams.map(({ Team_Name, Team_Id }, i) => ({
    Team_Name,
    Team_Id,
  }));
  // console.log(teamNames);
  res.json(teamNames);
});
app.get("/:teamid", async (req, res) => {
  const id = req.params.teamid;
  const resp = (await User.find({ Team_Id: id })).filter((item, i) => {
    return item.Player_Type === "team leader";
  })[0];
  console.log(resp);
  res.json(resp);
});
app.post("/splannouncements", async (req, res) => {
  try {
    const { title, description, team_selected } = req.body;
    let teamann = (await User.findOne({ Team_Id: team_selected })).announcement;
    // let id = (await User.findOne({ Team_Id: team_selected })).Team_Id;
    teamann = [...teamann, { title, description }];
    await User.updateMany({Team_Id:team_selected}, { announcement: teamann });
    res.status(200).json({ message: "ok" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post('/updating', async(req,res)=>{
  const hi = await User.updateMany({}, {attendance_counter:0});
  // console.log("hi");
  res.send("hi");
});