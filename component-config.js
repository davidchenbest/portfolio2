const data = {
    nba: {
        url: {
            scoreUrl: `/api/nba/score`,
            standingsUrl: `/api/nba/standings`
        },
        standingKeys: [
            'seed',
            'team',
            'wins',
            'losses',
            'pct',
            'gb',
            'ppg',
            'oppg',
            'diff',
            'home',
            'road',
            'div',
            'conf',
            'strk',
            'l10',
        ],
        playoffSpots: 8
    }
}

export default data