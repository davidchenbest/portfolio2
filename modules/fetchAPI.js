const get = async (url) => {
    const res = await fetch(url)
    if ((res.status + '').startsWith(4)) {
        throw new Error('Bad Request');

    }
    return await res.json();
}

export { get }