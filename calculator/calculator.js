//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))


// GET
app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html")
})

app.get("/bmicalculator", function(request, response){
    response.sendFile(__dirname + "/bmiCalculator.html")
})


//POST
app.post("/", function(request, response){

    let num1 = Number(request.body.num1)
    let num2 = Number(request.body.num2)

    let result = num1 + num2
    response.send("Le résultat est : " + result)
})

app.post("/bmicalculator", function(request, response){

    let weight = parseFloat(request.body.weight)
    let height = parseFloat(request.body.height)

    let result = weight / (height * height)
    
    response.send("Le résultat est : " + result)
})


app.listen(3000, function(){
    console.log("Server started on port 3000")
})