var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { S5lComponent } from './components';
import { TranslatePipe } from './pipes/translate.pipe';
import { HttpRequireService, RequireService, BundlesService, SijilOpts, defaultSijilOpts, Parser, FragmentsParser } from './services/index';
import './rxjs-includes';
var moduleProviders = [
    { provide: BundlesService, useClass: BundlesService, deps: [RequireService, Parser, SijilOpts] },
    { provide: RequireService, useClass: HttpRequireService },
    { provide: Parser, useClass: FragmentsParser },
    { provide: SijilOpts, useValue: defaultSijilOpts }
];
var SijilModule = SijilModule_1 = (function () {
    function SijilModule() {
    }
    SijilModule.forRoot = function (require, parser, options) {
        moduleProviders[1]['useClass'] = require || HttpRequireService;
        moduleProviders[2]['useClass'] = parser || FragmentsParser;
        moduleProviders[3]['useValue'] = options || defaultSijilOpts;
        return {
            ngModule: SijilModule_1,
            providers: moduleProviders
        };
    };
    return SijilModule;
}());
SijilModule = SijilModule_1 = __decorate([
    NgModule({
        imports: [HttpModule],
        declarations: [S5lComponent, TranslatePipe],
        providers: moduleProviders,
        exports: [S5lComponent, TranslatePipe]
    }),
    __metadata("design:paramtypes", [])
], SijilModule);
export { SijilModule };
var SijilModule_1;
//# sourceMappingURL=sijil.module.js.map