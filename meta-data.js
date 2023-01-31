const TITLE_NAME = process.env.TITLE_NAME

const data = {
    index: {
        title: TITLE_NAME,
        description: 'Jia Chen is a software engineer from New York.',
        keywords: 'Jia Chen, Software Engineer, Web, Developer, JavaScript, React, Node, New York',
    },
    blog: {
        title: `Blog by`,
        description: 'Blog app for expressing thoughtful ideas.',
        keywords: 'Blog, Idea, Thought',
    },
    gallery: {
        title: `Gallery`,
        description: 'Gallery app for displaying photographic photos.',
        keywords: 'Gallery, Photo, Art',
    },
    'nba scores': {
        title: `Nba Scores`,
    },
    'nba standings': {
        title: `Nba Standings`,
    },
    'videoroom': {
        title: `Videoroom`,
        description: 'Video chat app for connecting with friend and family.',
        keywords: 'Videochat, friend, family',
    },
    'weather': {
        title: `Weather`,
        description: 'Weather app for checking current, hourly, and forecast weather.',
        keywords: 'weather, forecast',
    },
    'sierpinski': {
        title: `Sierpinski`,
        description: 'Sierpinski demonstration app for visualizing pattern.',
        keywords: `sierpinski, triangle`,
    },

    'calendar': {
        title: `Meet with ${TITLE_NAME}`,
        description: `Schedule a meeting with ${TITLE_NAME}`,
        keywords: `calendar, meet`,
    },

    'bill-split': {
        title: `Split Bills`,
        description: `split bills with others payers or participants`,
        keywords: `split, bill`,
    },

    'countdown': {
        title: `Countdown`,
        description: `Calculate days, hours, minutes and seconds ticking down to 0`,
        keywords: `countdown, day, hour, minute, second, between dates,`,
    },

}

export default data