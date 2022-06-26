export function createConferenceObj(randomString) {
    return {
        "createRequest": {
            "conferenceSolutionKey": {
                "type": "hangoutsMeet"
            },
            "requestId": randomString
        }
    }
}
export function createEventObj({ startTime, endTime, summary, description, callType, attendees, phone }) {
    const isVideo = callType.toLowerCase() === 'video'
    if (phone) description = `phone: ${phone}\n` + description
    if (!attendees) attendees = []
    else if (!Array.isArray(attendees)) attendees = [attendees]
    attendees = attendees.map(a => ({ email: a }))
    return {
        "start": {
            "dateTime": new Date(+startTime).toISOString()
        },
        "end": {
            "dateTime": new Date(+endTime).toISOString()
        },
        summary,
        description,
        conferenceData: isVideo ? createConferenceObj(startTime) : {},
        attendees
    }

}

export function searchKeys(key) {
    switch (key) {
        case 'startTime':
            return 'event.start.dateTime'
            break;

        default:
            throw new Error('key does not exist')
            break;
    }

}
