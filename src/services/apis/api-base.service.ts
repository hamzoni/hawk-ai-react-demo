import axios, {AxiosInstance} from 'axios';
import * as $ from '@types/jquery';

const API_HOST = 'http://localhost:9000';

export class BaseApi {
    protected xhr!: AxiosInstance;

    // controller name
    protected name: string;

    constructor(name: string) {
        this.name = name;
        this.recreateAxios();
    }

    recreateAxios() {
        const baseURL = `${API_HOST}/${this.name}`;

        let headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };

        const bearerToken = BaseApi.getBearerToken();
        if (bearerToken) {
            headers = {...headers, ...bearerToken};
        }

        this.xhr = axios.create({
            baseURL,
            withCredentials: false,
            headers,
        });

        return this.xhr;
    }

    static getBearerToken(token: string = '') {
        token = token ? token : axios.defaults.headers.common.Authorization;
        return token ? {
            Authorization: `${token}`
        } : null;
    }

    // basic methods
    async post(url: string, params: any = null): Promise<any> {
        const xhr = this.recreateAxios();
        return xhr.post(url, params);
    }

    async get(url: string, query: any = null): Promise<any> {
        const xhr = this.recreateAxios();
        if (query) url += `?${$.param(query)}`;
        return xhr.get(url);
    }

    async put(url: string, params: any): Promise<any> {
        this.recreateAxios();
        return this.xhr.put(url, params);
    }

    async delete(url: string, params: any): Promise<any> {
        this.recreateAxios();
        return this.xhr.delete(url, params);
    }

}
