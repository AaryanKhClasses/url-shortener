const express = require('express') // Imports Express.
const router = express.Router() // Creates an Express Router.

const urlModel = require('../models/urlModel') // Imports the URL model.

router.get('/:code', async(req, res) => { // Defines the route.
    try {
        const url = await urlModel.findOne({ urlCode: req.params.code }) // Gets the URL.
        
        if(url) {
            return res.redirect(url.longUrl) // Redirects to the URL.
        } else {
            return res.status(404).json('URL not found.') // Sends a 404 error.
        }
    } catch (err) {
        console.log(err) // Logs any errors.
        res.status(500).send(err) // Sends a 500 error.
    }
})

module.exports = router // Exports the router.