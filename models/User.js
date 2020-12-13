const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const momemt = require('moment');

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profile_pic: {
    type: String,
    default: "empty-avatar.jpg"
  },
  createdAt: {
    type: String,
    default: momemt().format("DD/MM/YYYY") + ";"+ momemt().format("hh:mm:ss")
  },
  updatedAt: {
    type: String,
    default: momemt().format("DD/MM/YYYY") + ";"+ momemt().format("hh:mm:ss")
  }
});

// create user model
mongoose.model("users", userSchema);

// export user model
module.exports = mongoose.model("users");