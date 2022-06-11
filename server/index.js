const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const user = require("./model");
const auth = require('./models/authmodel');
const app = express();
app.use(express.json());
app.use(cors());
console.log(new Date())
const uri = "mongodb+srv://aswintony:aswintony2001@cluster0.fhmtc.mongodb.net/RPMS?retryWrites=true&w=majority";
//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
try{
mongoose.connect(uri,
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  },
  () => {console.log("DB Connected");}
);
}
catch(err){
    console.log(err);
}
app.get('/hello',(req,res)=>{
    res.send({
        doneBy: "Moniesh Ravichandran"
    })
    res.status(200);
})

app.post('/login',async(req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    try{
        const authentic = await auth.findOne({Email: email});
        if(!authentic)
            res.status(200).send({login:false});
        if(authentic.Password == password)
            res.status(200).send({login:true});
        else
            res.status(200).send({login:false});
    }
    catch(err){
        //console.log(err);
    }   
})

app.post('/user',async(req,res)=>{
    const userData = user(req.body);
    try{
        console.log(userData);
        await userData.save();
        res.status(201).send(userData);
    }
    catch(err){
        console.log(err);
        res.status(500).send(err);
    }
})
app.listen(5000,()=>{
    console.log("Listening on Port 8000");
})

