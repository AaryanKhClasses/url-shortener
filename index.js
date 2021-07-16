// Import Stuff
const express = require('express')
const config = require('./config.json')
const mongo = require('./src/mongo')

// Get the server.
const app = express() // Express app
const router = require('./src/router') // Router
app.set('view engine', 'ejs') // Set the view engine to ejs
app.use(express.urlencoded({ extended: false })) // Set the body parser to parse urlencoded bodies
app.use(router) // Add the router to the app

mongo() // Connect to the database.

const port = config.port // Gets the "port" value from the "config.json"
app.listen(port, () => console.log(`Server running on port ${port}`)) // Starts the server and logs that the server has been started on port 5000