// there are all required variables 
// const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const server = require('http');
const express=require("express")
const app=express();
const mongoose = require('mongoose');
// const { stringify } = require('querystring');
const port = process.env.PORT||3000;

const dbURI = "mongodb+srv://saqib:saqib@cluster0.pvnsa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
//This lline connect with databased
mongoose.connect(dbURI);
const CrudUser = mongoose.model('CrudUser' , {
    userName: String,
    email:String,

})
// middle ware

app.use(cors());
app.use(morgan());
app.use(express.json());



// let users=[];

app.use((req,res,next)=>{
    console.log('my first server',req.body);
    next();

})
app.get("/users", (req, res) => {
    CrudUser.find({}, (err, data) => {
        if (!err) {

            res.send(data)
        }
        else {
            res.status(500).send("Error Excuted")
        }
    })
})
// app.post('/user',(req,res)=>{
//     if(!req.body.userName || !req.body.email){
//         res.send("invalid data");
//         console.log("nh chalra")
//     }else{
//         const newUser={
//             userName:req.body.userName,
//             email:req.body.email
//         };
//         users.push(newUser);

//     }
// })
app.get('/users/:id', (req, res) => {
    CrudUser.findOne({ _id: req.params.id }, (err, data) => {
        if (!err) {
            res.send(data)

        }
        else {
            res.status(505).send("Invalid Data")
        }
    })
    
})

app.post('/user',(req,res)=>{
    if(!req.body.userName || !req.body.email ) {
        res.status(400).send("invalid data");
    }else{
        const newUser = new CrudUser({
            userName:req.body.userName,
            email:req.body.email
        });
        newUser.save().then(()=>{
            console.log('user created success');
            res.send({message:"users created"})
        })
    }

})

app.post('/users/:id' , (req,res)=>{
let updateObj = {}
if (req.body.userName){
    updateObj.userName=req.body.userName
}
if(req.body.email){
    updateObj.email= req.body.email
}
CrudUser.findByIdAndUpdate(rwq.params.id,updateObj,{ new: true},
    (err,data)=>{
        if(!err){
            res.send(data)
        }else{
            res.status(500).send("error NOt REsponding")
        }
    })
})

app.delete('/user/:id', (req, res) => {

    CrudUser.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            res.send("user deleted")
        } else {
            res.status(500).send("error exicuted")
        }
    })

})
app.listen(port,()=>{
    console.log(`server is running on ${port} port`)
})