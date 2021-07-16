// Import Stuff
const express = require('express')
const config = require('./config.json')
const mongo = require('./src/mongo')

// Get the server.
const app = express()
app.use(express.json())

mongo() // Connect to the database.

// Define the routes.
app.use('/', require('./src/routes/index'))
app.use('/api/url', require('./src/routes/url'))

const port = config.port // Gets the "port" value from the "config.json"

app.listen(port, () => console.log(`Server running on port ${port}`)) // Starts the server and logs that the server has been started on port 5000