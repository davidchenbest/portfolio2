const get = async (url) => {
    const res = await fetch(url)
    if ((res.status + '').startsWith(4)) {
        throw new Error('Bad Request');

    }
    return await res.json();
}

const post = async (url, body) => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if ((res.status + '').startsWith(4)) {
            throw new Error('Bad Request');

        }
        console.log(res);
        return await res.json();
    } catch (error) {
        console.error(error)
    }
}


export { get, post }