import { RequireService, SijilOpts, Parser } from './index'

/**
 * Defines a BundlesService, whice is the main entry point for Sijil operations.
 *
 * A BundlesServices has three dependencies :
 * - RequireService : Used to fetch bundles
 * - Parser : Used to parse logic inside bundle values
 * - SijilOpts : An object containing custom settings
 */
export class BundlesService {

    constructor(private requireService: RequireService, private parser: Parser, sijilOpts: SijilOpts) {
        this.defaultLanguage = sijilOpts.defaultLanguage
        if(!this.defaultLanguage && typeof window !== 'undefined'){
            this.defaultLanguage = window.navigator.language.split('-')[0]
        }
        this.currentLanguage = this.defaultLanguage
    }

    private bundles: Object = {}
    /**
     * Fallback language.
     */
    defaultLanguage : string
    /**
     * Current language.
     */
    currentLanguage : string

    /**
     * Add keys/values to an existing bundle, or create it if missing.
     *
     * @param {Object} bundle An object containing translations as key / values.
     * @param {string} [lang] The language to map the bundle with, or the current langugage if omitted.
     */
    addToBundle(bundle: Object, lang?: string) : void {
        let targetLanguage = lang || this.currentLanguage || this.defaultLanguage || 'en'

        if(!this.bundles[targetLanguage])
            this.bundles[targetLanguage] = {}

        this.bundles[targetLanguage] = Object.assign({}, this.bundles[targetLanguage], bundle);

        if(!this.currentLanguage)
            this.currentLanguage = lang
    }

    /**
     * Loads a bundle and associates it with a language.
     * If the target language already contains key/values, then we mixin the new bundle and the existing one.
     *
     * @param {any} where The path, or whatever the RequireService needs to fetch the bundle.
     * @param {string} [lang] The target language, or the current language if omitted.
     * @returns {Promise<void>} A Promise, because the RequireService can be (is - by default) asynchronous.
     */
    loadBundle(where, lang?: string) : Promise<void> {
        return this.requireService.load(where)
            .then(bundle => {
                this.addToBundle(bundle, lang)
            })
    }
    /**
     * Loads multiple bundles and associates then with a language.
     *
     * @see {@link loadBundle}
     */
    loadBundles(specs: { lang: string, where: any }[]): Promise<void[]> {
        return Promise.all(specs.map((spec) => {
            return this.loadBundle(spec.where, spec.lang)
        }))
    }

    /**
     * Removes a bundle from the bundles list.
     *
     * @param {string} lang Language to remove.
     */
    unloadBundle(lang: string) : void {
        delete this.bundles[lang]
    }

    /**
     * @returns {string[]} Returns a list of all loaded languages.
     */
    getLoadedLanguages() : string[] {
        return Object.keys(this.bundles)
    }

    /**
     * Translates a single key into a target language, using the parameters provided if needed.
     *
     * @param {string} key Key to translate
     * @param {(Object | any[])} [parameters] Parameters to use if the translation contains logic.
     * @param {string} [lang] Target language, of the current language if omitted.
     * @returns {string} The computed translation, or the key if no match was found in the bundles (including the fallback language bundle).
     */
    translate(key: string, parameters?: Object | any[], lang?: string) : string {
        let targetLanguage = lang || this.currentLanguage

        let rawTranslation : string = this.bundles[targetLanguage] &&
            this.bundles[targetLanguage][key] ||
            this.defaultLanguage &&
            this.bundles[this.defaultLanguage] &&
            this.bundles[this.defaultLanguage][key] ||
            key

        if(rawTranslation !== key && parameters) {
            return this.parser.compile(rawTranslation, parameters, (e) => { console.error(e); return key })
        } else {
            return rawTranslation
        }

    }

}