const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f2baf01f9b17fef0a1e0b5eaea1c1e9d&query=' + latitude + ',' + longitude + '&units=f'

    request({url, json: true, strictSSL: false}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service.', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback( undefined, 'The current weather is ' + body.current.weather_descriptions[0] + '. The temperature is ' + body.current.temperature + ' degrees, but it feels like ' + body.current.feelslike + ' degrees.' )
        }
    })
}

module.exports = forecast