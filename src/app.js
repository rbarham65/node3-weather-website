const path = require('path')  //Core Node Module
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Define Additional Routes 
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Robert Barham'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Robert Barham'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Click here for more help',
        name: 'Robert Barham'
    })
})

app.get('/weather', (req, res ) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {    
        if(error) {
            return res.send({
                errorMsg: error
            })            
        }

        forecast(longitude, latitude, (error, dataForecast) => {
            if(error) {
                return res.send({
                    errorMsg: error
                })   
            }

            res.send({
                locationValue: location,
                dataForcastValue: dataForecast,
                address: req.query.address
            })
          })    
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error',
        errorMessage: 'Help article not found',
        name: 'Robert Barham'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error',
        errorMessage: 'Page not found.',
        name: 'Robert Barham'
    })
})

//Start the Server
app.listen(3000, () => {
    console.log('Server is up on Port 3000.')
})