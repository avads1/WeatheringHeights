const path = require('path')
const express = require('express')
const hbs = require('hbs')
const chalk = require('chalk')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
// const getForecast = require('./getForecast')
const app = express()

//Setting up port for heroku or default to 3000
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../WeatheringHeights/public')
const viewsPath = path.join(__dirname, '../WeatheringHeights/templates/views')
const partialsPath = path.join(__dirname, '../WeatheringHeights/templates/partials')
console.log(publicDirectoryPath)
// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weathering Heights',
        name: 'Greeshma'
    })
})

//req object has in built query object
// console.log(req.query) //prints the key pair values of the query string params
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        // console.log('Error', error)
        // console.log('Data', data)
        if (error) {
            // console.log(chalk.red.bold('Unable to find location!'))
            return res.send({})
        }

        forecast(latitude, longitude, (error, fData) => {
            // console.log('Error', error)
            // console.log('Data', data)
            // console.log('Weather in ' + chalk.cyan.bold(location) + ' : ', fData)
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: fData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Greeshma',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Greeshma',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})