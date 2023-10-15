import axios from "axios";

export const instance = axios.create({
    baseURL: 'http:/\/127.0.0.1:5000/hack/API/v1.0/',
    timeout: 10000,
    // headers: {'X-Custom-Header': 'foobar'}
});