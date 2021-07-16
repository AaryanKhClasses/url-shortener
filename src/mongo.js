// Importing Stuff
const mongoose = require('mongoose')
const { mongoURI } = require('../config.json')

const mongo = async() => { // Declaring the function to connect to the mongoDB Database.
    try {
        await mongoose.connect(mongoURI, { // Connecting to the Database.
             // Database config.
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('MongoDB Connected!') // Logs that the Database is connected.
    } catch(err) {
        console.error(err.message) // Gives out an error in the console, if any
        process.exit(1) // Exits the process.
    }
}

module.exports = mongo // Exports the function.