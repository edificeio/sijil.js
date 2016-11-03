/// <reference types="core-js" />
import { RequireService } from './require.interface';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
export declare class HttpRequireService implements RequireService {
    private http;
    constructor(http: Http);
    load(url: any): Promise<Object>;
}
