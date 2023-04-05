const mongoose = require("mongoose");
const teamSchema = mongoose.Schema({
  Team_Id: String,
  Team_Name: String,
  Player_Type: String,
  Player_Name: String,
  Player_Email: String,
  Player_Mobile: String,
  Player_Gender: String,
  Country: String,
  Domain: String,
  Course_Pursuing: String,
  Course_Stream: String,
  Specialization: String,
  Course_Programme: String,
  Year_of_Study: String,
  Passing_Out_Year: Number,
  Player_Organisation: String,
  Work_Experience: String,
  Reg: {
    Status: String,
  },
  problem_statement_and_solution: String,
  password: {
    type: String,
    default: "hackfest",
    required: true,
  },
  attendance_counter: {
    type: Number,
    default: 0,
  },
  refreshment_counter: {
    type: Number,
    default: 0,
  },
  refreshment_counter_two: {
    type: Number,
    default: 0,
  },
  current_absent: {
    type: [Number],
    default: [0],
    required: true,
  },
  timesarray: {
    type: [Date],
    default: [],
    required: true,
  },
  announcement: [
    {
      title: String,
      description: String,
    },
  ],
});
module.exports = mongoose.model("Team", teamSchema);
