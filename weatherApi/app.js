const express = require("express")
const http = require("http")
const bodyParser = require("body-parser")

const app = express()


app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
    const town = req.body.ville
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${town}&appid=65600a7eb6b51d498fb0cd3895134c54&units=metric&lang=fr`
    http.get(url, function(response){

        response.on("data", function(data){
            const weatherdata = JSON.parse(data)
            const temp = weatherdata["main"]["temp"]
            const description = weatherdata["weather"][0]["description"]
            const img = weatherdata["weather"][0]["icon"]
            const name = weatherdata["name"]
            const urlImg = `http://openweathermap.org/img/wn/${img}@2x.png`
            
            res.write("<h1> La température à "+ name + " est de " + temp + " degrés </h1>")
            res.write("<p>"+ description + "</p>")
            res.write(`<img src=${urlImg}>`)
            res.send()
        })
    })
})



app.listen(3000, function(){
    console.log("Server started on port 3000")
})