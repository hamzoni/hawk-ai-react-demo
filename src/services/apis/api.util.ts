import axios from "axios";

const API_HOST = 'http://localhost:9000';

export const createXhrClient = (name: string) => {
    const baseURL = `${API_HOST}/${name}`;
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    };
    return axios.create({
        baseURL, withCredentials: false,
        headers,
    });
};
