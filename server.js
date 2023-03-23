const DATABASE_URL =
  'mongodb+srv://shreyanshandilya:hackfest@cluster0.a2pgynk.mongodb.net/HackFest23'
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./schemas/teams');
// const User = require('./schemas/testteam')
const Organizers = require('./schemas/organizing')
const Announcements = require('./schemas/announcement')
const app = express()
app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
//database
mongoose
  .connect(DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('database connected successfully'))
  .catch((err) => console.log('error connecting to mongodb' + err))
const PORT = process.env.PORT || 8000
// app.post('/register', function (req, res) {
//   const {
//     college,
//     team_captain,
//     team_captain_email,
//     team_captain_phone,
//     team_members,
//     password,
//     team_name,
//   } = req.body
//   const newUser = new User({
//     college,
//     team_captain,
//     team_captain_email,
//     team_captain_phone,
//     team_members,
//     team_name,
//     password,
//   })

//   newUser
//     .save()
//     .then(() => {
//       res.status(200).json({
//         message: 'Successfully registered',
//         // data: newUser,
//       })
//       console.log('New user ' + team_name + ' account has been registered')
//       console.log(newUser)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })
app.post("/change_password",async (req,res)=>{
  const { Player_Email, old_password , new_password} = req.body;
  const foundUser = await User.findOne({Player_Email});
  if(foundUser.password === old_password){
  await User.findOneAndUpdate({Player_Email},{password:new_password});
  return res.status(200).json({message:"OK"});
  }
  else
  {
    return res.status(400).json({message:"Incorrect password"});
  }
})
app.post('/login', (req, res) => {
  const { Player_Email, password} = req.body

  User.findOne({ Player_Email })
    .then((foundUser) => {
      if (foundUser.password === password) {
        console.log('User ' + foundUser.Team_Name + ' has been successfully logged in')
        res.status(200).json({
          message: 'Successfully logged in',
          data: foundUser,
        })
      } else {
        res.status(404).json({
          message: 'Incorrect password or username',
        })
        console.log('Incorrect password or username')
      }
    })
    .catch((err) => {
      console.log(err)
    })
});

app.get('/organizing', async (req, res) => {
  const organizing_members = await Organizers.find()
  // console.log(organizing_members);
  res.send(organizing_members)
})
app.get('/announcement', async (req, res) => {
  const announcement = await Announcements.find()
  res.send(announcement)
})
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`)
})
