// Importing Stuff
const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')
const config = require('../config.json')
const urlModel = require('./models/urlModel')

const app = express.Router() // Creates an Express Router.

app.get('/', async(req, res) => { // The route to the home page.
    const url = await urlModel.find() // Finds all the short URLs in the database.
    res.render('index.ejs', { shortURL: url }) // Renders the index.ejs page with the shortURL variable.
})

app.post('/shorten', async(req, res) => { // The route to create a new short URL.
    const { longURL } = req.body // Gets the longURL from the request.
    const baseURL = config.baseURL // The base URL of the URL Shortener.

    if (!validUrl.isUri(baseURL)) { // Checks the BaseURL
        return res.status(400).send('BaseURL is not a valid URL.') // Returns a 400 Bad Request Error.
    }

    const urlCode = shortid.generate() // Generates a new URL Code.

    // if (validUrl.isUri(longURL)) { // Checks the LongURL
        let url = await urlModel.findOne({ longURL: longURL }) // Finds the URL in the database.

        if(url) {
            res.send(url.shortURL) // Returns the URL if it exists.
        } else {
            const shortURL = baseURL + '/' + urlCode // Creates the ShortURL.
            url = new urlModel({ // Creates a new URL Object.
                longURL,
                shortURL,
                urlCode,
                date: new Date(),
                //clicks
            })

            await url.save() // Saves the URL.
            res.json(url) // Returns the URL.
            res.redirect('/') // Redirects to the home page.

        }
    // } else {
    //    res.status(400).send('LongURL is not a valid URL.') // Returns a 400 Bad Request Error.
    // }
})

app.get('/:urlCode', async(req, res) => {
    const url = await urlModel.findOne({ urlCode: req.params.urlCode }) // Finds the short URL in the database.
    if(url == null) return res.sendStatus(404) // If the short URL is not found, it sends a 404 error.
    res.redirect(url.longURL) // Redirects to the long URL.
})

module.exports = app