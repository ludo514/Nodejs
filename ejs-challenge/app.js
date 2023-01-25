//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const _ = require("lodash")
const schemaBlog = require("./schema")

const contactContent1 = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

mongoose.connect('mongodb://127.0.0.1:27017/BlogDB', {useNewUrlParser: true, useUnifiedTopology: true});


const app = express();
const post = []

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/post/:id", function (req, res) {
  schemaBlog.Text.findById(req.params.id, function(err, results) {
    if(err){
      console.log("Erreur")
    }else{
      res.render("post", { post: results })
    }
  })
})

app.get("/addPost", function(req, res) {
  res.render("addPost")
})

app.get("/", function(req, res) {
  schemaBlog.Text.find({}, function(err, results) {
    if(err){
      console.log("Erreur affichage")
    }else{
      res.render("home", { blogNews: results })
    }
  })
})

app.get("/about", function (req, res) {
  schemaBlog.About.find({}, function(err, results) {
    if(err){
      console.log("Erreur about")
    }else{
      res.render("about", { about: results[0] })
    }
  })
})

app.get("/contact", function (req, res) {
  res.render("contact", { contatContent: contactContent1 })
})

app.post("/addNewPost", function(req, res) {

  let newPost = new schemaBlog({
    title: req.body.title,
    text: req.body.text
  })

  schemaBlog.Text.create(newPost,function(err) {
    if(err){
      console.log("Erreur entrée")
    }else{
      res.redirect("/")
    }
  })
  
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
