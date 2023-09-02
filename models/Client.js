const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
let Schema = mongoose.Schema;


// create the schema for the db 
const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    trim: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 8 },
 
 
},  {
  timestamps: true,
});

clientSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const Client = mongoose.model("client", clientSchema);
module.exports = Client;
