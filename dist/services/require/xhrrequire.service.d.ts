/// <reference types="core-js" />
import { RequireService } from './require.interface';
export declare class XHRRequire implements RequireService {
    load(from: string, async?: boolean): Promise<Object>;
}
