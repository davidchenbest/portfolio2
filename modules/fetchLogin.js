async function fetchLogin(email, password) {
    const url = '/login'
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    };
    const res = await fetch(url, opts)
    const data = await res.json();
    return data
}

export default fetchLogin