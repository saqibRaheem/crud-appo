// there are all required variables 
// const express = require('express');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const server = require('http');
const mongoose = require('mongoose');
const app = express();
// const { stringify } = require('querystring');
const port = process.env.PORT || 3000;

const dbURI = "mongodb+srv://saqib:saqib@cluster0.wdqfa.mongodb.net/saqib?retryWrites=true&w=majority"
//This lline connect with databased
mongoose.connect(dbURI)
    .then(() => {
        console.log("connected")
    }).catch((err) => {
        console.log(err)
    });
const CrudUser = mongoose.model('Cruduser', {
    userName: String,
    email: String

})
// middle ware
// const port = 'http://localhost/3000' || "https://new-crud-opperation.herokuapp.com"
// "
app.use(cors({"Access-Control-Allow-Origin":"*"}));
app.use(morgan());
app.use(express.json());



// let users=[];

app.use((req, res, next) => {
    console.log('my first server', req.body);
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
app.get('/user/:id', (req, res) => {
    CrudUser.findOne({ _id: req.params.id }, (err, data) => {
        if (!err) {
            res.send(data)

        }
        else {
            res.status(505).send("Invalid Data")
        }
    })

})

app.post('/user', (req, res) => {
    if (!req.body.userName || !req.body.email) {
        res.status(400).send("invalid data");
    } else {
        const newUser = new CrudUser({
            userName: req.body.userName,
            email: req.body.email
        });
        newUser.save().then(() => {
            console.log('user created success');
            res.send({ message: "users created" })
        })
    }

})

app.put('/user/:id', (req, res) => {
    let updateObj = {}
    if (req.body.userName) {
        updateObj.userName = req.body.userName
    }
    if (req.body.email) {
        updateObj.email = req.body.email
    }
    CrudUser.findByIdAndUpdate(req.params.id, updateObj, { new: true },
        (err, data) => {
            if (!err) {
                res.send(data)
            } else {
                res.status(500).send("error Responding")
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
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port} port`)
})