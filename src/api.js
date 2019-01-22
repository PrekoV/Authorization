const api = (method, url, body) => {

    const hash = localStorage.getItem("hash");

    let options = {
        method: method,
        headers: {
            'accept': 'application/json',
            'authorization': hash,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    try {
        return fetch(`http://std.powercode.pro:5000/api/v1/${url}`, options)
            .then(res => {
                return res.json()
            })
    } catch (e) {
        console.log(e.message)
    }
}

export default api