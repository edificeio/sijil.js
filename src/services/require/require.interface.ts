/**
 * Service used to fetch bundles.
 * 
 * @export
 * @abstract
 * @class RequireService
 */
export abstract class RequireService {
    /**
     * Fetch a bundle. 
     * @memberOf RequireService
     */
    load: (from: any) => Promise<Object>
}