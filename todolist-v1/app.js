const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const app = express()
const date = require(__dirname + "/date.js")


app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({ extended: true }))
app.use("/public",express.static("public"))

const items = []
const workItems = []

app.get("/", function(req, res){
    let day = date.getDay()

    res.render("list", { ListTitle: day, newItem: items })
})


app.post("/", function(req, res) {

    let item = req.body.add

    if (req.body.list === "Work") {
        workItems.push(item)
        res.redirect("/work")
    }else{
        items.push(item)
        res.redirect("/")
    }
})

app.get("/work", function(req, res) {
    res.render("list", { ListTitle: "Work", newItem: workItems})
})

app.listen(3000, function(){
    console.log("Server is runing")
})
