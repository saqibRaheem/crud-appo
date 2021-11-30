
// there are all required variables 
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const server = require('http');
const app=express();
const port = process.env.PORT||3000;


// middle ware

app.use(cors());
app.use(morgan());
app.use(express.json());



let users=[];

app.use((req,res,next)=>{
    console.log('my first server');
    next();

})
app.post('/user',(req,res)=>{
    if(!req.body.userName || !req.body.email){
        res.send("invalid data");
        console.log("nh chalra")
    }else{
        const newUser={
            userName:req.body.userName,
            email:req.body.email
        };
        users.push(newUser);

    }
})
app.get("/users",(req,res)=>{
        if(!err){
            res.send(users)
        }
        else{
            res.status(500).send("Error ")
        }
    })
    

app.listen(port,()=>{
    console.log(`server is running on ${port} port`)
})