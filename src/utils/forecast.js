const request = require("request");

const foreCast = (latitiude, longitude, callback) => {
    let url = `http://api.weatherstack.com/current?access_key=b2af8e035681ce358a8eca55f9a4b0dc&query=${latitiude},${longitude}`;

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback("No internet Connection", undefined)
        } else if (body.error) {
            callback("Wrong geodata", undefined)
        } else {

            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. There is a ${body.current.precip}% chances of rain`)
        }
    })
}

module.exports = foreCast;





// http://api.weatherstack.com/current?access_key=b2af8e035681ce358a8eca55f9a4b0dc&query=28.66667,77.21667;