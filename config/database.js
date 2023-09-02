const mongoose = require("mongoose");


connectDb = () => {
  //Connect to the db with the db name 

  mongoose.connect("mongodb://127.0.0.1:27017/Ops");
  let db = mongoose.connection;
  db.on("error", (error) => {

    //displaying success or error db connection 
    console.log("DB not connected ERROR");
  });

  db.on("open", () => {

    console.log("DB Connection Successfull ");

  });
};


module.exports = connectDb();
