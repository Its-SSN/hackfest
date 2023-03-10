const mongoose = require("mongoose");
const organizingSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"]
  },
  role: {
    type: String,
    required: true
  },
  urls: {
    type: Array,
    default: []
  },
  photo: {
    type: String,//drive link
    required: true
  },
});
module.exports = mongoose.model("Ogranizing", organizingSchema);
