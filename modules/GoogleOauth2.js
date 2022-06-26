const { google } = require('googleapis');
const { GOOGLE_CLIENT_ID, GOOGLE_REDIRECT_URI, GOOGLE_CLIENT_SECRET } = process.env

export default class GoogleOauth2 {
    constructor(access_token) {
        this.oAuth2Client = new google.auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI)
        this.oAuth2Client.setCredentials({ access_token })
    }

    generateAuthUrl() {
        return this.oAuth2Client.generateAuthUrl({ scope: ['https://www.googleapis.com/auth/calendar'] })
    }

    async verifyAccessToken(access_token) {
        if (!access_token) throw new Error('Invalid Access Token')
        const { email } = await this.oAuth2Client.getTokenInfo(access_token)
        return !!email
    }
}