import { BundlesService } from '../services';
export declare class TranslatePipe {
    private bundlesService;
    constructor(bundlesService: BundlesService);
    transform(key: string, parameters?: Object | any[], lang?: string): string;
}
