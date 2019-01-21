const api = (method, email, password, hash, id) => {

    let options = {
        method: 'GET' //в документации хттп протокола method по умолчанию get
    }
    if (method) {
        options.method = method
    }
    if (hash) {
        options.headers = {
            'accept': 'application/json',
            'authorization': hash
        }
        //options.headers = JSON.stringify({ authorization: hash })
    }
    if (email && password) {
        options.body = JSON.stringify({ email: email, password: password })
        options.headers = {
            'Content-Type': 'application/json' // postman
        }
    }
    if (id) {
        return fetch(`http://std.powercode.pro:5000/api/v1/${method === 'POST' ? 'token' : 'user/' + id}`, options)
            .then(res => {
                return res.json()
            })
    } else {
        return fetch(`http://std.powercode.pro:5000/api/v1/${method === 'POST' ? 'token' : 'user/'}`, options)
            .then(res => {
                return res.json()
            })
    }
    // .then(json => { //если без return
    //     console.log(json)
    // })
}

export default api