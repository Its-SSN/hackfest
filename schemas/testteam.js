const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
    // username: String,
    // password:String
    college:String,
    team_captain:String,
    team_captain_email:String,
    team_captain_phone:Number,
    team_members: {
        type: Array,
        default: [],
      },
    team_name:String,
    password:String
});

module.exports = mongoose.model('Test',testSchema)