const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/3029efc430c6576047e8aacde8dbdb7c/'+latitude+','+longitude+'?units=si'
// using object property shorthand for url.
// Destructuring response argument{} in the callback function.
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location or ' +body.error, undefined)
        } else {
            callback(undefined, body.daily.data[0].summary +' It is currently '+ body.currently.temperature +' degrees out. There is a '+body.currently.precipProbability +' probability of rain. The maximum and minimum temperature for today is ' +body.daily.data[0].temperatureHigh+' and '+body.daily.data[0].temperatureLow+' respectively.')
        }
    })
}

module.exports = forecast