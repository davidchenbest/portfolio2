const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const getDay = (date) => {
    const now = new Date();
    const today = { year: now.getFullYear(), month: now.getMonth() + 1, dateNum: now.getDate() }
    const dateSplit = date.split('-')
    const year = +dateSplit[0]
    const month = +dateSplit[1]
    const dateNum = +dateSplit[2]
    if (`${month}/${dateNum}/${year}` === `${today.month}/${today.dateNum}/${today.year}`) return 'Today'
    const dayNum = new Date(year, month - 1, dateNum).getDay()
    return WEEKDAY[dayNum]
}

export { getDay }