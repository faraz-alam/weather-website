const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiZmFyYXotYWxhbSIsImEiOiJjanpoZzllazgwY3psM2xtemZncjRvZDRuIn0.vrHzTRJJkxPx_xiweH9Z_w&limit=1'
// using object property shorthand for url.
// Destructuring response argument{} in the callback function.
    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Network Problem, Unable to connect to location services!!', undefined)
        } else if(body.features.length === 0){
            callback('Wrong Location, Try again with different address!!', undefined)
        } else {
            callback(undefined, { 
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode