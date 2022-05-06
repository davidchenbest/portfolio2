const data = {
    nba: {
        url: {
            score: `https://cdn.nba.com/static/json/liveData/scoreboard/todaysScoreboard_00.json`,
            standing: 'https://www.cbssports.com/nba/standings/'
        },
        numberOfTeams: 30,
        standingKeys: ['seed', 'team', 'wins', 'losses', 'pct', 'gb', 'ppg', 'oppg', 'diff', 'home', 'road', 'div', 'conf', 'strk', 'l10'],
        teamIds: {
            'miami': 1610612748
        }

    }
}
export default data