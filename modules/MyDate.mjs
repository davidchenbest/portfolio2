export default class MyDate {
    constructor() {
        this.date = new Date()
        this.year = this.date.getFullYear()
        this.month = this.date.getMonth()
        this.dateNum = this.date.getDate()
    }
    getFirstDateOfMonth = (month = this.month) => {
        this.validMonth(month)
        return new Date(this.year, month, 1)
    };
    getLastDateOfMonth = (month = this.month) => {
        this.validMonth(month)
        return new Date(this.year, month + 1, 0, 23, 59, 59)
    }

    getBeginDate = ({ date, month, year }) => {
        date = date ? date : this.dateNum
        month = month ? month : this.month
        year = year ? year : this.year
        this.validMonth(month)
        this.validDate(date)
        this.validYear(year)
        return new Date(year, month, date, 0, 0);
    }
    getEndDate = ({ date, month, year }) => {
        date = date ? date : this.dateNum
        month = month ? month : this.month
        year = year ? year : this.year
        this.validMonth(month)
        this.validDate(date)
        this.validYear(year)
        return new Date(year, month, date, 23, 59, 59)
    }

    validMonth(month) {
        if (!Number.isInteger(+month) || month > 11 || month < 0) throw 'invalid month'
    }
    validDate(date) {
        if (!Number.isInteger(+date)) throw 'invalid date'
    }
    validYear(year) {
        if (!Number.isInteger(+year)) throw 'invalid year'
    }

}