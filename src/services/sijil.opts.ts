/**
 * Contains Sijil options.
 * 
 * @export
 * @abstract
 * @class SijilOpts
 */
export abstract class SijilOpts {
    /** Fallback language when a translation is not available in the current language. */
    defaultLanguage: string
}

export let defaultSijilOpts : SijilOpts = {
    defaultLanguage: typeof window !== 'undefined' ? window.navigator.language.split('-')[0] : undefined
}