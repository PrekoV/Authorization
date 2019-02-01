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

    return fetch(`http://std.powercode.pro:5000/api/v1/${url}`, options)
}

export default api


// import axios from 'axios'

// const API = axios.create({
//     baseURL: 'http://std.powercode.pro:5000/api/v1/'
// })

// API.interceptors.request.use(function (config) {
//     config.headers.common['authorization'] = localStorage.getItem('hash')
//     return config
// }, function (error) {
//     return Promise.reject(error)
// })

// API.interceptors.response.use(function (response) {
//     if (response.data.token) {
//         localStorage.setItem('hash', response.data.token.hash)
//         localStorage.setItem('id', response.data.user.id)
//     }
//     return response
// }, function (error) {
//     return Promise.reject(error)
// })


// export default API
// const api = (method, url, body) => {

//     const hash = localStorage.getItem("hash");

//     axios.defaults.baseURL = `http://std.powercode.pro:5000/api/v1/`
//     axios.defaults.headers.common['Authorization'] = hash
//     axios.defaults.headers.post['Content-Type'] = 'application/json'

//     let options = {
//         method: method,
//         url: url,
//         data: body
//     }

//     return axios(options)
// }

// export default api

// const api = () => {
//     // const hash = localStorage.getItem("hash");
//     axios.defaults.baseURL = `http://std.powercode.pro:5000/api/v1/`
//     // axios.defaults.headers.common['Authorization'] = hash
//     axios.defaults.headers.post['Content-Type'] = 'application/json'

//     axios.interceptors.request.use(function (config) {
//         // Do something before request is sent
//         const hash = localStorage.getItem("hash");
//         config.auth = hash;
//         return config;
//       }, function (error) {
//         // Do something with request error
//         return Promise.reject(error);
//       });

//     // Add a response interceptor
//     axios.interceptors.response.use(function (response) {
//         // Do something with response data
//         return response;
//       }, function (error) {
//         // Do something with response error
//         return Promise.reject(error);
//       });
//     return axios
// }

// export default api

