const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

const connectToDatabase = require("./config/database");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    return res.status(200).json({});
  }
  next();
});

connectToDatabase;

app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));


app.listen(8081, () => {
 
  try{
    console.log("http://localhost:8081");
  }
  catch (err){
    console.log("error", err);
  }
 
});
