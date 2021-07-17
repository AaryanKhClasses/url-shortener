// Import Stuff
const mongoose = require('mongoose')
const shortId = require('shortid')

const urlSchema = new mongoose.Schema({ // Creates a schema
    urlCode: { type: String, default: shortId.generate() },
    longURL: String,
    shortURL: String,
    date: { type: String, default: Date.now() },
    clicks: { type: Number, default: 0 }
})

module.exports = mongoose.model('url', urlSchema) // Creates a model using the schema and exportd it.