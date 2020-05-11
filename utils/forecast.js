const request = require('request')
const chalk = require('chalk')
/*
Weather API key 9d639d4c8844484bbec212459200905

http://api.weatherapi.com/v1/current.json?key=9d639d4c8844484bbec212459200905&q=32608

http://api.weatherapi.com/v1/forecast.json?key=9d639d4c8844484bbec212459200905&q=32608&days=10

MapBox  pk.eyJ1IjoiZ3lwc3k0bHlmIiwiYSI6ImNrYTA1YjBhNDBrcGwzbm5hM2dhcmJ6cHIifQ.UTI-TeyivcJ9y1Pvm3by5g

 */

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherapi.com/v1/forecast.json?key=9d639d4c8844484bbec212459200905&q=" + latitude + "," + longitude
    request({ url, json: true }, (error, { body }) => {
        // const body =response.body;
        if (error) {
            callback("Unable to get weather forecast!", undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'The temperature today is ' +body.current.temp_c+ ' degree celsius. It is ' + body.current.condition.text)
        }
    })
}

module.exports = forecast



// const forecast = (latitude, longitude, callback) => {
//     const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude

//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location', undefined)
//         } else {
//             callback(undefined, response.body.daily.data[0].summary + ' It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + '% chance of rain.')
//         }
//     })
// }






