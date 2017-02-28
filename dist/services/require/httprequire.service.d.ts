import { RequireService } from './require.interface';
import { Http } from '@angular/http';
export declare class HttpRequireService implements RequireService {
    private http;
    constructor(http: Http);
    load(url: any): Promise<Object>;
}
