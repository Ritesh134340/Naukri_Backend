require("dotenv").config();
const express = require("express");
const app = express();
const cors=require("cors")
const {connection}=require("./config/db")



const PORT=process.env.PORT || 8080

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to the jobkar app");
});




app.listen(PORT, async () => {

  try {
    await connection
    console.log("database connected")

  } catch (err) {
    console.log("databse connecting failed")
    console.log(err);
  }
  console.log("listening on " + PORT);
});

