
import {Injectable} from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { objectToURLSearchParams } from './object_to_url_search_params';

function responseToJson<T> (resp: Response){
    return (resp.text() && resp.json()) || undefined as T;
}

@Injectable()
export class WebApi {
    constructor(
        private _http: Http
    ) { }

    /**
     * GET
     * @param url
     * @param query
     */
    get<T>(url: string, query: any = null) {
        let search = objectToURLSearchParams(query);
        return this._http.get(url, { search: search })
            .toPromise()
            .then(r => responseToJson<T>(r))
            .catch(e => responseToJson<any>(e));
    }

    /**
     * POST
     * @param url
     * @param body
     * @param queryParams
     */
    post<T>(url: string, body: any, queryParams: any = null) {
        let search = objectToURLSearchParams(queryParams);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers, search: search });

        return this._http.post(url, JSON.stringify(body || null), options)
            .toPromise()
            .then(r => responseToJson<T>(r))
            .catch(e => responseToJson<any>(e));
    }
}