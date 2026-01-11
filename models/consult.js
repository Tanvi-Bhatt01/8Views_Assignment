const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consultSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Consult = mongoose.model("Consult", consultSchema);
module.exports = Consult;
