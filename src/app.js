const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

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
    res.send({
        forecast: 'Little Drizzle in the morning!',
        location: 'Bangalore'
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

app.listen(3000, () => {
    console.log('Server is up and running on port 3000.')
})