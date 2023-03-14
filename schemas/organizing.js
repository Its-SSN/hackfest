const mongoose = require("mongoose");
const organizingSchema = mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  position: {
    type: String,
    required: true,
  },
  insta_url: {
    type: String,
    default: "",
  },
  linkedin_url: {
    type: String,
    default: "",
  },
  image: {
    type: String, //drive link
    required: true,
  },
});
module.exports = mongoose.model("Organizing", organizingSchema);
