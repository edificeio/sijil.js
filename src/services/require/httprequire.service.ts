import { RequireService } from './require.interface'
import { Injectable } from '@angular/core'
import { Http } from '@angular/http'

/**
 * Fetches a bundle from a target url.
 * 
 * @export
 * @class HttpRequireService
 * @implements {RequireService}
 */
@Injectable()
export class HttpRequireService implements RequireService {

    constructor(private http: Http){}

    load(url) : Promise<Object> {
        return this.http.get(url).toPromise()
            .then(data => data.json())
    }

}