(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/http'), require('rxjs/add/operator/toPromise')) :
    typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/http', 'rxjs/add/operator/toPromise'], factory) :
    (factory((global.SijilModule = global.SijilModule || {}),global.ng.core,global.ng.http,global.Rx));
}(this, (function (exports,_angular_core,_angular_http,rxjs_add_operator_toPromise) { 'use strict';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}

/**
 * Fetches a bundle from a target url.
 *
 * @export
 * @class HttpRequireService
 * @implements {RequireService}
 */
var HttpRequireService = (function () {
    function HttpRequireService(http) {
        this.http = http;
    }
    HttpRequireService.prototype.load = function (url) {
        return this.http.get(url).toPromise()
            .then(function (data) { return data.json(); });
    };
    HttpRequireService = __decorate([
        _angular_core.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof _angular_http.Http !== 'undefined' && _angular_http.Http) === 'function' && _a) || Object])
    ], HttpRequireService);
    return HttpRequireService;
    var _a;
}());

/**
 * Service used to fetch bundles.
 *
 * @export
 * @abstract
 * @class RequireService
 */
var RequireService = (function () {
    function RequireService() {
    }
    return RequireService;
}());

var ParserError = (function (_super) {
    __extends(ParserError, _super);
    function ParserError(message, fragment) {
        _super.call(this, message);
        this.message = message;
        this.fragment = fragment;
    }
    return ParserError;
}(Error));
/**
 * Parses logic inside translations.
 *
 * @export
 * @abstract
 * @class Parser
 */
var Parser = (function () {
    function Parser() {
    }
    return Parser;
}());

/**
 * The default Sijil parser.
 *
 * - Input : bundle value (translation) + parameters (Object or Array)
 * - Output : compiled translation
 *
 * Logic is contained inside mustache blocks : {{ LOGIC BLOCK }}
 *
 * There are two variants :
 *  - A single parameter key (when the params are contained inside an object) or index (params contained inside an array)
 *
 * Examples:
 *
 * {{ key }} + { "key" : "my key" } = my key
 *
 * {{ 1 }} + [1, 2] = 2
 *
 *  - A ternary-like condition
 *
 * {{ condition ? trueValue : falseValue }}
 * Where condition may be : a single parameter key/index, or 2 clauses with the following operators : ==, >, =>, <=, <
 *
 * Examples:
 *
 * (the $ sign to refer to a variable is mandatory when a clause contains more than 1 word)
 *
 * {{ count > 1 ? $count cats : 1 cat }} + {"count": 10} = 10 cats
 * {{ 1 < count ? $count cats : 1 cat }} + {"count": 1} = 1 cat
 *
 * @export
 * @class FragmentsParser
 * @implements {Parser}
 */
var FragmentsParser = (function () {
    function FragmentsParser() {
    }
    FragmentsParser.prototype.getParameter = function (parameters, fragment) {
        var splittedFrag = fragment.split(/\s+/);
        if (splittedFrag.length === 1) {
            return fragment[0] === "$" ? parameters[fragment.substr(1)] : parameters[fragment] || fragment;
        }
        return fragment.split(/\s+/).reduce(function (l, r) {
            l.push(r[0] === "$" ? parameters[r.substr(1)] : r);
            return l;
        }, []).join(' ');
    };
    FragmentsParser.prototype.compileFragment = function (fragment, parameters) {
        fragment = fragment.replace(/{{|}}/g, '');
        var interrogationIndex, dotsIndex;
        if ((interrogationIndex = fragment.indexOf('?')) > 0 && (dotsIndex = fragment.lastIndexOf(':')) > 1) {
            var condition = fragment.substring(0, interrogationIndex).trim();
            var trueReturn = fragment.substring(interrogationIndex + 1, dotsIndex).trim();
            var falseReturn = fragment.substring(dotsIndex + 1).trim();
            var computedTrueReturn = this.getParameter(parameters, trueReturn);
            var computedFalseReturn = this.getParameter(parameters, falseReturn);
            var splittedCondition = condition.split(/\s+/);
            if (splittedCondition.length === 1) {
                // Single variable case
                var variable = parameters[splittedCondition[0]];
                return variable ?
                    computedTrueReturn :
                    computedFalseReturn;
            }
            else if (splittedCondition.length === 3) {
                // Operator case
                var leftHandParam = parameters[splittedCondition[0]] || splittedCondition[0];
                var rightHand = parameters[splittedCondition[2]] || splittedCondition[2];
                var comparisonOperator = splittedCondition[1];
                switch (comparisonOperator) {
                    case '==':
                        return leftHandParam == rightHand ?
                            computedTrueReturn :
                            computedFalseReturn;
                    case '>':
                        return leftHandParam > rightHand ?
                            computedTrueReturn :
                            computedFalseReturn;
                    case '>=':
                        return leftHandParam >= rightHand ?
                            computedTrueReturn :
                            computedFalseReturn;
                    case '<':
                        return leftHandParam < rightHand ?
                            computedTrueReturn :
                            computedFalseReturn;
                    case '<=':
                        return leftHandParam <= rightHand ?
                            computedTrueReturn :
                            computedFalseReturn;
                    default:
                        throw new ParserError("Invalid conditional operator for fragment : " + fragment, fragment);
                }
            }
            else {
                throw new ParserError("Invalid condition for fragment : " + fragment, fragment);
            }
        }
        else {
            fragment = fragment.trim();
            return parameters[fragment];
        }
    };
    FragmentsParser.prototype.compile = function (rawTranslation, parameters, onError) {
        var parts = rawTranslation.split(FragmentsParser.delimRegexp);
        var fragments = rawTranslation.match(FragmentsParser.delimRegexp);
        var compiledTranslation = "";
        if (!onError)
            onError = FragmentsParser.defaultErrorCallback;
        if (!fragments) {
            compiledTranslation += rawTranslation;
        }
        else {
            for (var i = 0; i < parts.length; i++) {
                compiledTranslation += parts[i];
                if (i > fragments.length - 1)
                    continue;
                try {
                    compiledTranslation += this.compileFragment(fragments[i], parameters);
                }
                catch (e) {
                    compiledTranslation += onError(e);
                }
            }
        }
        return compiledTranslation;
    };
    FragmentsParser.delimiters = ['{{', '}}'];
    FragmentsParser.delimRegexp = new RegExp(FragmentsParser.delimiters[0] + "[^}]+" + FragmentsParser.delimiters[1], 'gm');
    FragmentsParser.defaultErrorCallback = function (e) {
        console.error(e);
        return e.fragment;
    };
    return FragmentsParser;
}());

/**
 * Defines a BundlesService, whice is the main entry point for Sijil operations.
 *
 * A BundlesServices has three dependencies :
 * - RequireService : Used to fetch bundles
 * - Parser : Used to parse logic inside bundle values
 * - SijilOpts : An object containing custom settings
 */
var BundlesService = (function () {
    function BundlesService(requireService, parser, sijilOpts) {
        this.requireService = requireService;
        this.parser = parser;
        this.bundles = {};
        this.defaultLanguage = sijilOpts.defaultLanguage || window.navigator.language.split('-')[0];
        this.currentLanguage = this.defaultLanguage;
    }
    /**
     * Add keys/values to an existing bundle, or create it if missing.
     *
     * @param {Object} bundle An object containing translations as key / values.
     * @param {string} [lang] The language to map the bundle with, or the current langugage if omitted.
     */
    BundlesService.prototype.addToBundle = function (bundle, lang) {
        var targetLanguage = lang || this.currentLanguage;
        if (!this.bundles[targetLanguage])
            this.bundles[targetLanguage] = {};
        for (var key in bundle) {
            this.bundles[targetLanguage][key] = bundle[key];
        }
    };
    /**
     * Loads a bundle and associates it with a language.
     * If the target language already contains key/values, then we mixin the new bundle and the existing one.
     *
     * @param {any} where The path, or whatever the RequireService needs to fetch the bundle.
     * @param {string} [lang] The target language, or the current language if omitted.
     * @returns {Promise<void>} A Promise, because the RequireService can be (is - by default) asynchronous.
     */
    BundlesService.prototype.loadBundle = function (where, lang) {
        var _this = this;
        return this.requireService.load(where)
            .then(function (bundle) {
            _this.addToBundle(bundle, lang);
        });
    };
    /**
     * Loads multiple bundles and associates then with a language.
     *
     * @see {@link loadBundle}
     */
    BundlesService.prototype.loadBundles = function (specs) {
        var _this = this;
        return Promise.all(specs.map(function (spec) {
            return _this.loadBundle(spec.where, spec.lang);
        }));
    };
    /**
     * Removes a bundle.
     *
     * @param {string} lang Language to remove.
     */
    BundlesService.prototype.unloadBundle = function (lang) {
        delete this.bundles[lang];
    };
    /**
     * @returns {string[]} Returns a list of all loaded languages.
     */
    BundlesService.prototype.getLoadedLanguages = function () {
        return Object.keys(this.bundles);
    };
    /**
     * Translates a single key, using the parameters provided in a target language.
     *
     * @param {string} key Key to translate
     * @param {(Object | any[])} [parameters] Parameters to use if the translation contains logic.
     * @param {string} [lang] Target language, of the current language if omitted.
     * @returns {string} The computed translation, or the key if no match was found in the bundles (including the fallback language bundle).
     */
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

/**
 * Contains Sijil options.
 *
 * @export
 * @abstract
 * @class SijilOpts
 */
var SijilOpts = (function () {
    function SijilOpts() {
    }
    return SijilOpts;
}());
var defaultSijilOpts = {
    defaultLanguage: window.navigator.language.split('-')[0]
};

var S5lComponent = (function () {
    function S5lComponent(bundlesService, changeDetectorRef) {
        this.bundlesService = bundlesService;
        this.changeDetectorRef = changeDetectorRef;
    }
    S5lComponent.prototype.refreshTranslation = function () {
        this.wrapperRef.nativeElement.innerHTML = this.bundlesService.translate(this.value, this.parameters, this.fixedLanguage);
    };
    S5lComponent.prototype.ngAfterViewInit = function () {
        this.value = this.wrapperRef.nativeElement.innerHTML.trim();
        this.loaded = true;
    };
    S5lComponent.prototype.ngDoCheck = function () {
        if (!this.loaded)
            return;
        this.refreshTranslation();
    };
    __decorate([
        _angular_core.ViewChild("wrapper"), 
        __metadata('design:type', (typeof (_a = typeof _angular_core.ElementRef !== 'undefined' && _angular_core.ElementRef) === 'function' && _a) || Object)
    ], S5lComponent.prototype, "wrapperRef");
    __decorate([
        _angular_core.Input("s5l-params"), 
        __metadata('design:type', Object)
    ], S5lComponent.prototype, "parameters");
    __decorate([
        _angular_core.Input("s5l-lang"), 
        __metadata('design:type', String)
    ], S5lComponent.prototype, "fixedLanguage");
    S5lComponent = __decorate([
        _angular_core.Component({
            selector: 's5l',
            template: "\n    <span #wrapper>\n        <ng-content></ng-content>\n    </span>",
            changeDetection: _angular_core.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof BundlesService !== 'undefined' && BundlesService) === 'function' && _b) || Object, (typeof (_c = typeof _angular_core.ChangeDetectorRef !== 'undefined' && _angular_core.ChangeDetectorRef) === 'function' && _c) || Object])
    ], S5lComponent);
    return S5lComponent;
    var _a, _b, _c;
}());

var TranslatePipe = (function () {
    function TranslatePipe(bundle) {
        this.bundle = bundle;
    }
    TranslatePipe.prototype.transform = function (key, parameters, lang) {
        return this.bundle.translate(key, parameters, lang);
    };
    TranslatePipe = __decorate([
        _angular_core.Pipe({ name: 'translate', pure: false }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof BundlesService !== 'undefined' && BundlesService) === 'function' && _a) || Object])
    ], TranslatePipe);
    return TranslatePipe;
    var _a;
}());

var moduleProviders = [
    { provide: BundlesService, useClass: BundlesService, deps: [RequireService, Parser, SijilOpts] },
    { provide: RequireService, useClass: HttpRequireService },
    { provide: Parser, useClass: FragmentsParser },
    { provide: SijilOpts, useValue: defaultSijilOpts }
];
/**
 * Sijil angular2 module.
 *
 * Usage :
 *
 * ```typescript
 * import { SijilModule } from 'sijil/dist'
 *
 * @NgModule({
 *   imports: [
 *       // ... //
 *      SijilModule
 *       // ... //
 *    ]
 * })
 * ```
 */
var SijilModule = (function () {
    function SijilModule() {
    }
    SijilModule.forRoot = function (require, parser, options) {
        moduleProviders[1]['useClass'] = require || HttpRequireService;
        moduleProviders[2]['useClass'] = parser || FragmentsParser;
        moduleProviders[3]['useValue'] = options || defaultSijilOpts;
        return {
            ngModule: SijilModule,
            providers: moduleProviders
        };
    };
    SijilModule = __decorate([
        _angular_core.NgModule({
            imports: [_angular_http.HttpModule],
            declarations: [S5lComponent, TranslatePipe],
            providers: moduleProviders,
            exports: [S5lComponent, TranslatePipe]
        }), 
        __metadata('design:paramtypes', [])
    ], SijilModule);
    return SijilModule;
}());

exports.RequireService = RequireService;
exports.BundlesService = BundlesService;
exports.Parser = Parser;
exports.SijilOpts = SijilOpts;
exports.SijilModule = SijilModule;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=sijil.module.umd.js.map
