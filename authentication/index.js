//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.set('strictQuery', false);
mongoose.connect("// add our db link", { useNewUrlParser: true });


//Replace this with our schema
const userSchema = {
    email: String,
    password: String
}

const User = mongoose.model(" ", userSchema); //add collection name here

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save().then(()=>{
        res.render("secrets");
        console.log("New user " + req.body.username + " account has been registered");
    }).catch((err)=>{
        console.log(err);
    })
});

app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username}).then((foundUser)=>{
        if(foundUser.password === password) {
            res.render("secrets");
            console.log("User " + username + " has been successfully logged in");
        }
        else {
            console.log("Incorrect password or username");
        }
    }).catch((err)=>{
        console.log(err);
    })

});


app.listen(3000, function() {
    console.log("Server starting on port 3000");
});



