const mongoose = require("mongoose");
const teamSchema = mongoose.Schema({
  team_name: {
    type: String,
    required: [true, "team name is required"],
    trim: true,
    text: true,
  },
  team_members: {
    type: Array,
    default: [],
  },
  team_leader: {
    name: String,
    email: String,
    phone_number: String,
  },
  QRCode: {
    type: String,
    required: true,
  },
  penalty: {
    type: Number,
    default: 0,
  },
  college: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Team", teamSchema);
