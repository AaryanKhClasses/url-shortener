const mongoose = require('mongoose') // Imports mongoose

const urlSchema = new mongoose.Schema({ // Creates a schema
    urlCode: String, 
    longURL: String,
    shortURL: String,
    date: { type: String, default: Date.now() }
})

module.exports = mongoose.model('url', urlSchema) // Creates a model using the schema and exportd it.