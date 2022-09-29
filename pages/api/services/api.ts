import Axios from "axios";

let urls = {
    test: `http://localhost:3000`,
    development: 'http://3.87.160.128/api/v1',
    production: 'http://3.87.160.128/api/v1'
}
const api = Axios.create({
    baseURL: urls[process.env.NODE_ENV],
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

export default api;