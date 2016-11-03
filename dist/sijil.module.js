var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '@angular/http', './components', './pipes/translate.pipe', './services/index'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var http_1 = require('@angular/http');
    var components_1 = require('./components');
    var translate_pipe_1 = require('./pipes/translate.pipe');
    var index_1 = require('./services/index');
    var moduleProviders = [
        { provide: index_1.BundlesService, useClass: index_1.BundlesService, deps: [index_1.RequireService, index_1.Parser, index_1.SijilOpts] },
        { provide: index_1.RequireService, useClass: index_1.HttpRequireService },
        { provide: index_1.Parser, useClass: index_1.FragmentsParser },
        { provide: index_1.SijilOpts, useValue: index_1.defaultSijilOpts }
    ];
    var SijilModule = (function () {
        function SijilModule() {
        }
        SijilModule.forRoot = function (require, parser, options) {
            moduleProviders[1]['useClass'] = require || index_1.HttpRequireService;
            moduleProviders[2]['useClass'] = parser || index_1.FragmentsParser;
            moduleProviders[3]['useValue'] = options || index_1.defaultSijilOpts;
            return {
                ngModule: SijilModule,
                providers: moduleProviders
            };
        };
        SijilModule = __decorate([
            core_1.NgModule({
                imports: [http_1.HttpModule],
                declarations: [components_1.S5lComponent, translate_pipe_1.TranslatePipe],
                providers: moduleProviders,
                exports: [components_1.S5lComponent, translate_pipe_1.TranslatePipe]
            }), 
            __metadata('design:paramtypes', [])
        ], SijilModule);
        return SijilModule;
    }());
    exports.SijilModule = SijilModule;
});
//# sourceMappingURL=sijil.module.js.map