const WEATHER_API_KEY = process.env.WEATHER_API_KEY
if (!WEATHER_API_KEY) throw 'no WEATHER_API_KEY'
const BASE_URL = (forecast) => `https://api.openweathermap.org/data/2.5/${forecast ? 'forecast' : 'weather'}`

const getUnits = (unit) => {
    // standard = kelvin
    // Fahrenheit = imperial
    // Celcius = metric
    if (!unit || unit === 'K') return ''
    const unitSwitch = { F: 'imperial', C: 'metric' }
    return `units=${unitSwitch[unit]}`

}

const getUrls = {
    zip: (param, unit, forecast) => `${BASE_URL(forecast)}?zip=${param.zip}&appid=${WEATHER_API_KEY}&${getUnits(unit)}`,
    city: (param, unit, forecast) => `${BASE_URL(forecast)}?q=${param.city}&appid=${WEATHER_API_KEY}&${getUnits(unit)}`,
    cord: (param, unit, forecast) => `${BASE_URL(forecast)}?lat=${param.lat}&lon=${param.lon}&appid=${WEATHER_API_KEY}&${getUnits(unit)}`
}

export { getUrls }