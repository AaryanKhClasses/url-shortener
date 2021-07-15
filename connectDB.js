// Importing Stuff
const mongoose = require('mongoose')
const { mongoURI } = require('./config.json')

const connectDB = async() => { // Declaring the function to connect to the mongoDB Database.
    try {
        await mongoose.connect(mongoURI, { // Connecting to the Database.
            useNewUrlParser: true, // Database config.
        })

        console.log('MongoDB Connected!') // Logs that the Database is connected.
    } catch(err) {
        console.error(err.message) // Gives out an error in the console, if any
        process.exit(1) // Exits the process.
    }
}

module.exports = connectDB // Exports the function.