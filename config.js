const {
    PRIVATE_KEY,
    CLIENT_EMAIL,
    MAIN_CALENDAR_ID,
    CALENDAR_IDS
} = process.env

export const CREDENTIALS = {
    "private_key": PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": CLIENT_EMAIL,
}

export const CALENDAR = {
    MAIN_ID: MAIN_CALENDAR_ID,
    IDS: CALENDAR_IDS.split(','),
}