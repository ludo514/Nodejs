const express = require('express') 
const http = require('http') 
const bodyParser = require('body-parser') 
const app = express()



const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs")

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Pas de nom renseigner"]
    },
    rating:{
        type: Number,
        min: 1,
        max: 10
    },
    review: String
})

const peopleSchema = new mongoose.Schema({
    name: String,
    age: Number
})

const Fruit = mongoose.model("Fruit", fruitSchema)
const People = mongoose.model("People", peopleSchema)
const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "kojdizjoifzj"
})

const banana = new Fruit({
    name: "Banana",
    rating: 3,
    review: "pokzojkdzo"
})

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "sjqodijzoij"
})

const people = new People({
    name: "Jhon",
    age: 37
})

//people.save()
/*Fruit.insertMany([kiwi, banana], function(err){
    if(err){
        console.log(err)
    }else{
        console.log("Saved all fruits")
    }
})*/

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function(req, res){

    var allFruit = []

    Fruit.find(function(err, fruits){
        if(err){
            console.log(err)
        }else{
            allFruit = fruits
        }
    })
    res.render("home", { fruitView: allFruit })
})
app.listen(3000, function(){
    console.log("Server on")
})
