async function fetchGraphQL(query) {
    // const url = `/graphql`
    const url = `https://jiachenblog.herokuapp.com/graphql`
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query })
    };
    const res = await fetch(url, opts)
    const data = await res.json();
    return data
}

export default fetchGraphQL