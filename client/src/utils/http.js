import axios from "axios";

export default function request(params){
    return new Promise((resolve, reject) => {
        axios({
            method: params.method,
            headers: params.headers,
            url: params.url,
            data: params.data ? params.data : ''
        }).then(response => {
            return response.data;
        }).then(data => {
            resolve(data);
        }).catch(err => {
            reject((err.response && err.response.data) || err);
        });
    });
}