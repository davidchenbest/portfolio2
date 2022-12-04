const KEY = 'location'

class LocalStorage {
    constructor() {
        if (this.constructor.instance) return this.constructor.instance
        this.constructor.instance = this
        this.key = KEY
    }

    get() {
        const data = localStorage.getItem(this.key)
        return JSON.parse(data)
    }

    remove() {
        localStorage.removeItem(this.key)
    }

    set(data) {
        const json = JSON.stringify(data)
        localStorage.setItem(this.key, json)
    }
}

export { LocalStorage }