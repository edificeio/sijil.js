/// <reference types="core-js" />
import { RequireService, SijilOpts, Parser } from './index';
export declare class BundlesService {
    private requireService;
    private parser;
    constructor(requireService: RequireService, parser: Parser, sijilOpts: SijilOpts);
    private bundles;
    defaultLanguage: string;
    currentLanguage: string;
    addToBundle(bundle: Object, lang?: string): void;
    loadBundle(where: any, lang?: string): Promise<void>;
    loadBundles(specs: {
        lang: string;
        where: any;
    }[]): Promise<void[]>;
    unloadBundle(lang: string): void;
    getLoadedLanguages(): string[];
    translate(key: string, parameters?: Object | any[], lang?: string): string;
}
