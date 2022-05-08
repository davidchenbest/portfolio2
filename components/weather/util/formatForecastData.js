const formatForecastData = (obj) => {
    const { list } = obj
    const newObj = {}
    list.forEach(item => {
        const dateTime = item['dt_txt']
        const dateTimeSplit = dateTime.split(' ')
        const date = dateTimeSplit[0]
        const time = dateTimeSplit[1]
        item.time = time
        if (!newObj[date]) newObj[date] = [item]
        else newObj[date].push(item)

    });
    return newObj
}

export { formatForecastData }