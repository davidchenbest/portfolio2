const getIconURL = (iconName) => `http://openweathermap.org/img/wn/${iconName}@2x.png`

const getData = {
    temp: (obj) => Math.round(obj['main']['temp']),
    description: (obj) => obj['weather'][0]['description'],
    minTemp: (obj) => Math.round(obj['main']['temp_min']),
    maxTemp: (obj) => Math.round(obj['main']['temp_max']),
    iconURL: (obj) => getIconURL(obj['weather'][0]['icon']),
    name: (obj) => (obj['name']),
    coord: (obj) => {
        const { lat, lon } = (obj['coord'])
        return `${lat},${lon}`
    },

}

export { getData }