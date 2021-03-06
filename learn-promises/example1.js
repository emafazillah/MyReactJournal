const fetch = require('node-fetch');
 
const lat = 37;
const lon = 122;
 
const sevenTimerTemp = 
fetch(`http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=astro&output=json`)
.then(response => response.json())
.then(response => response.dataseries[0].temp2m);
console.log('sevenTimerTemp: ', sevenTimerTemp);
 
const fccWeatherTemp =
fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`)
.then(response => response.json())
.then(response => response.main.temp);
console.log('fccWeatherTemp: ', fccWeatherTemp);
 
Promise.all([sevenTimerTemp, fccWeatherTemp])
.then(responses => {
    let sum = 0;
    let count = 0;
    responses.forEach(response => {
        sum += response;
        count++;
    });
    return sum / count;
})
.then(average => console.log(`Average of reported temperatures is: ${average} C`))
.catch(() => console.log(`One of the APIs returned an error`));