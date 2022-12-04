const get = async (url) => {
    const res = await fetch(url)
    if ((res.status + '').startsWith(4)) {
        throw new Error('Bad Request');

    }
    return await res.json();
}

async function request(type, url, body) {
    const res = await fetch(url, {
        method: type,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    if ((res.status + '').startsWith(4)) {
        throw new Error('Bad Request');

    }
    return await res.json();
}

const post = async (url, body) => {
    try {
        return await request('POST', url, body)
    } catch (error) {
        console.error(error)
    }
}

const DELETE = async (url, body = {}) => {
    try {
        return await request('DELETE', url, body)
    } catch (error) {
        console.error(error)
    }
}


export { get, post, DELETE }