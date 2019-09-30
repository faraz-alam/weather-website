const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Faraz Alam'
    })
})

app.get("/about", (req, res) => {
    res.render('about', {
        title: 'About Me!',
        name: 'Faraz Alam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'I am here to help you with anything and everything!!',
        title: 'Help!',
        name: 'Faraz Alam'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'Address is required!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, place} = {} ) => {
        if(error){
            return res.send({ error })
        } else {
            forecast(latitude, longitude, (error, data) => {
                if(error){
                    return res.send({ error })
                } else {
                    return res.send({
                        forecast: data,
                        address: req.query.address,
                        location: place                        
                    }) 
                }
            })
        }
    })
})

app.get('/products', (req, res) => {
    
    if(!req.query.search){
        return res.send({
            error: 'Please provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        message: 'Help article not found!!!!',
        title: 'Help Error!',
        name: 'Faraz Alam'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        message: 'Page not found!!!!',
        title: '404',
        name: 'Faraz Alam'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port '+port)
})