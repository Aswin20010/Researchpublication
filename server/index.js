const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors);

app.get('/hello',(req,res)=>{
    console.log("hello");
    res.send({
        doneBy: "Moniesh Ravichandran"
    })
    res.status(200);
})

app.listen(8000,()=>{
    console.log("Listening on Port 5000");
})