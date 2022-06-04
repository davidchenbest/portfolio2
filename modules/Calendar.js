const { google } = require('googleapis');
import CREDENTIALS from '../privatekey'
export default class Calendar {
    constructor(keyPath) {
        if (this.constructor.instance) return this.constructor.instance
        if (!keyPath) throw 'missing keyPath'
        this.auth = new google.auth.GoogleAuth({
            credentials: CREDENTIALS,
            scopes: ['https://www.googleapis.com/auth/calendar'],
        });
        this.calendar = google.calendar('v3')
    }

    async listAllEvents(calendarId) {
        try {
            const { data } = await this.calendar.events.list({
                auth: this.auth,
                calendarId
            })
            return data
        } catch (error) {
            throw error
        }

    }

    async createEvent(calendarId, event) {
        try {
            const { data } = await this.calendar.events.insert({
                auth: this.auth,
                calendarId,
                resource: event,
            })
            return data
        } catch (error) {
            throw error
        }
    }

    async deleteEvent(calendarId, eventId) {
        try {
            const { data } = await this.calendar.events.delete({
                auth: this.auth,
                calendarId,
                eventId
            })
            return data === ''
        } catch (error) {
            throw error
        }
    }

    async patchEvent(calendarId, eventId, event) {
        try {
            const { data } = await this.calendar.events.patch({
                auth: this.auth,
                calendarId,
                eventId,
                resource: event,
            })
            return data
        } catch (error) {
            throw error
        }
    }

}