const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
  // username: String,
  // password:String
  college: String,
  team_captain: String,
  team_captain_email: String,
  team_captain_phone: Number,
  team_members: {
    type: Array,
    default: [],
  },
  team_name: String,
  password: String,
  hours: Number,
  attendance_counter: Number,
  in_counter: Number,
  out_counter: Number,
  announcement: [],
});

module.exports = mongoose.model("Test", testSchema);
