const express=require("express");
const app=express();
require("dotenv").config()

const PORT=process.env.PORT || 8080
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Welcome to Naukri ")
})

app.listen(PORT,(req,res)=>{
    console.log("Listining in port ",PORT)
})