/// <reference types="core-js" />
import { BundlesService } from '../services';
export declare class TranslatePipe {
    private bundle;
    constructor(bundle: BundlesService);
    transform(key: string, parameters?: Object | any[], lang?: string): string;
}
