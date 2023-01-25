const mongoose = require('mongoose');
const textSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "No name"]
    },
    text: {
        type: String,
        required: [true, "Pas de texte entree"]
    }
})

const aboutSchema = new mongoose.Schema({
    text:{
        type: String,
        required: [true, "No text"]
    }
})

const About = mongoose.model("About", aboutSchema)
const Text = mongoose.model("Text", textSchema)

module.exports = {Text, About}