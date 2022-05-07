const TITLE_NAME = process.env.TITLE_NAME

const data = {
    index: {
        title: TITLE_NAME,
        description: 'Jia Chen is a software engineer from New York.',
        keywords: 'Software Engineer, Web, Developer, JavaScript, React, New York',
    },
    blog: {
        title: `Blog by ${TITLE_NAME}`,
        description: 'Blog app for expressing thoughtful ideas.',
        keywords: 'Blog, Idea, Thought',
    },
    gallery: {
        title: `Gallery by ${TITLE_NAME}`,
        description: 'Gallery app for displaying photographic photos.',
        keywords: 'Gallery, Photo, Art',
    },
    'nba scores': {
        title: `Nba Scores by ${TITLE_NAME}`,
    },
    'nba standings': {
        title: `Nba Standings by ${TITLE_NAME}`,
    },

}

export default data