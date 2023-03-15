const mongoose = require("mongoose");
const announcementSchema = mongoose.Schema({
  announcement: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("Announcement", announcementSchema);
