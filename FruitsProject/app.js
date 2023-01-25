const express = require('express') 
const http = require('http') 
const bodyParser = require('body-parser') 
const app = express()

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/fruitsDB', {useNewUrlParser: true, useUnifiedTopology: true});

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))

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
    age: Number,
    favotiteFruit: fruitSchema
})

const Fruit = mongoose.model("Fruit", fruitSchema)
const People = mongoose.model("People", peopleSchema)

const pruneau = new Fruit({
    name: "Pruneau",
    rating: 8,
    review: "djlooklk"
})

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

const michel = new People({
    name: "Michel",
    age: 10,
    favotiteFruit: pruneau
})


/*Fruit.insertMany([kiwi, banana], function(err){
    if(err){
        console.log(err)
    }else{
        console.log("Saved all fruits")
    }
})*/

/*Fruit.deleteOne({_id:"63c9b3edad9726396869d941"}, function(err) {
    if(err){
        console.log(err)
    }else{
        console.log("Deleted")
    }
})*/

/*Fruit.deleteMany({name : "Kiwi"},function(err){
    if(err){
        console.lpg(err)
    }else{
        console.log("Tout les élements ont étaits suprimé")
    }
})*/

People.updateOne({_id:"63c9b6a390163726ac8d858a"}, {favotiteFruit: banana}, function(err){
    if(err){
        console.log(err)
    }else{
        console.log("John bien mis à jour")
    }
})

/*People.updateOne({_id: "63c9b6760588043864b23861"}, {name: "jack"}, function(err) {
    if(err){
        console.log(err)
    }else{
        console.log("Updated")
    }
})*/

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
