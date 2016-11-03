(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var BundlesService = (function () {
        function BundlesService(requireService, parser, sijilOpts) {
            this.requireService = requireService;
            this.parser = parser;
            this.bundles = {};
            this.defaultLanguage = sijilOpts.defaultLanguage || window.navigator.language.split('-')[0];
            this.currentLanguage = this.defaultLanguage;
        }
        BundlesService.prototype.addToBundle = function (bundle, lang) {
            var targetLanguage = lang || this.currentLanguage;
            if (!this.bundles[targetLanguage])
                this.bundles[targetLanguage] = {};
            for (var key in bundle) {
                this.bundles[targetLanguage][key] = bundle[key];
            }
        };
        BundlesService.prototype.loadBundle = function (where, lang) {
            var _this = this;
            return this.requireService.load(where)
                .then(function (bundle) {
                _this.addToBundle(bundle, lang);
            });
        };
        BundlesService.prototype.loadBundles = function (specs) {
            var _this = this;
            return Promise.all(specs.map(function (spec) {
                return _this.loadBundle(spec.where, spec.lang);
            }));
        };
        BundlesService.prototype.unloadBundle = function (lang) {
            delete this.bundles[lang];
        };
        BundlesService.prototype.getLoadedLanguages = function () {
            return Object.keys(this.bundles);
        };
        BundlesService.prototype.translate = function (key, parameters, lang) {
            var targetLanguage = lang || this.currentLanguage;
            var rawTranslation = this.bundles[targetLanguage] &&
                this.bundles[targetLanguage][key] ||
                this.defaultLanguage &&
                    this.bundles[this.defaultLanguage] &&
                    this.bundles[this.defaultLanguage][key] ||
                key;
            if (rawTranslation !== key && parameters) {
                return this.parser.compile(rawTranslation, parameters, function (e) { console.error(e); return key; });
            }
            else {
                return rawTranslation;
            }
        };
        return BundlesService;
    }());
    exports.BundlesService = BundlesService;
});
//# sourceMappingURL=bundles.service.js.map