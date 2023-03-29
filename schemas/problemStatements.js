const mongoose = require("mongoose");
const problemSchema = mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  problem_url: {
    type: String,
    default: "",
  },
  image_logo: {
    type: String, //drive link
    required: true,
  },
});
module.exports = mongoose.model("Problem", problemSchema);
