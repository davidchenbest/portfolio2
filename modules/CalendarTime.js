export default class CalendarTime {
    constructor(start, end, unavailable) {
        if (unavailable) this.unavailable = this.formatData(unavailable)
        this.start = start
        this.end = end
    }

    formatData(data) {
        const unavailable = []
        for (const r of data) {
            for (const item of r.items) {
                const start = new Date(item.start.dateTime).getTime()
                const end = new Date(item.end.dateTime).getTime()
                unavailable.push([start, end])
            }
        }
        unavailable.sort((a, b) => a[0] - b[0])
        return unavailable
    }
    getAvailableTimes(interval, unavailable = this.unavailable, start = this.start, end = this.end) {
        if (unavailable.length === 0) return [[start, end]]
        const availables = []
        // add time from start to first unavailable
        if (unavailable[0][0] < end && unavailable[0][0] - start >= interval) availables.push([start, unavailable[0][0]])
        // add in between unavailable times
        let previous = null
        for (let i = 0; i < unavailable.length - 1; i++) {
            let first = null
            if (previous) {
                first = previous
                previous = null
            }
            else first = unavailable[i]
            const second = unavailable[i + 1];

            if (first[1] < second[0]) {
                // check if meeting end time pass start time check
                if (first[1] < start) {
                    if (second[0] - start >= interval) availables.push([start, second[0]])
                    continue
                }
                // check last available time
                if (second[0] >= end) {
                    availables.push([first[1], end])
                    break
                }
                //check available interval duration is long enough
                if ((first[1] + interval) <= second[0]) { availables.push([first[1], second[0]]) }
            }
            else if (first[1] > second[1]) previous = first
        }
        // add time from last unavailable to end
        let lastUnavailable = unavailable[unavailable.length - 1][1]
        lastUnavailable = lastUnavailable < start ? start : lastUnavailable
        if (lastUnavailable < end && (lastUnavailable + interval) <= end) availables.push([lastUnavailable, end])
        return availables

    }
    isTimeAvailable(time, interval, unavailable = this.unavailable) {
        if (time < this.start || time >= this.end) return false
        for (const un of unavailable) {
            const [start, end] = un
            const newT = time + interval
            if (time >= start && time < end || newT > start && newT <= end) return false
        }
        return true
    }

    timeToString(time) {
        const t = new Date(time)
        let hr = t.getHours()
        let m = 'AM'
        if (hr >= 12) {
            m = 'PM'
            if (hr > 12) hr -= 12
        }
        let min = t.getMinutes()
        if (min < 10) min = '0' + min
        return `${hr}:${min} ${m}`
    }

    printTimes(times = this.unavailable) {
        for (const time of times) {
            console.log(`${this.timeToString(time[0])} - ${this.timeToString(time[1])}`)
        }
    }
}