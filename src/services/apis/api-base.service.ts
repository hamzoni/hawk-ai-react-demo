import * as $ from 'jquery';
import {createXhrClient} from "./api.util";

const ApiClient = createXhrClient('transactions');

export class BaseApi {

    // basic methods
    async post(url: string, params: any = null): Promise<any> {
        return ApiClient.post(url, params);
    }

    async get(url: string, query: any = null): Promise<any> {
        if (query) url += `?${$.param(query)}`;
        return new Promise(resolve => {
            ApiClient.get(url).then(resolve);
        })
    }

    async put(url: string, params: any): Promise<any> {
        return ApiClient.put(url, params);
    }

    async delete(url: string, params: any): Promise<any> {
        return ApiClient.delete(url, params);
    }

}
