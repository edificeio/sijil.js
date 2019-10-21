import { RequireService } from './require.interface';
import { HttpClient } from '@angular/common/http';
export declare class HttpRequireService implements RequireService {
    private httpClient;
    constructor(httpClient: HttpClient);
    load(url: any): Promise<Object>;
}
