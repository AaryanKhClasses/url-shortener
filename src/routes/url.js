// Importing Stuff
const express = require('express')
const router = express.Router()
const validURL = require('valid-url')
const shortid = require('shortid')
const config = require('../config')

const urlModel = require('../models/urlModel') // Imports the URL Model.

router.post('/shorten', async(req, res) => { // Creates a new URL.
    const { longURL } = req.body // Gets the longURL from the request.
    const baseURL = config.baseURL // The base URL of the URL Shortener.

    if (!validURL.isUri(baseURL)) { // Checks the BaseURL
        return res.status(400).send('BaseURL is not a valid URL.') // Returns a 400 Bad Request Error.
    }

    const urlCode = shortid.generate() // Generates a new URL Code.

    // Checks the LongURL
    if (validURL.isUri(longURL)) {
        try {
            let url = await urlModel.findOne({ longURL })

            if(url) {
                res.json(url) // Returns the URL if it exists.
            } else {
                const shortURL = baseURL + '/' + urlCode // Creates the ShortURL.
                url = new urlModel({ // Creates a new URL Object.
                    longURL,
                    shortURL,
                    urlCode,
                    date: new Date()
                })

                await url.save() // Saves the URL.
                res.json(url) // Returns the URL.
            }
        } catch (err) {
            return res.status(500).send('An error occurred.') // Returns a 500 Internal Server Error.
        }
    } else {
        res.status(401).send('LongURL is not a valid URL.') // Returns a 401 Unauthorized Error.
    }
})

module.exports = router // Exports the router.