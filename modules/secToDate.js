function secToDate(secs) {
    secs *= 1
    let time = new Date(secs)
    time = time.toString().split(' ')
    const month = time[1]
    const date = time[2]
    let year = time[3].split('')
    year = year.slice(year.length-2, year.length).join('')
    return `${month}/${date}/${year}` ;
}

export default secToDate;