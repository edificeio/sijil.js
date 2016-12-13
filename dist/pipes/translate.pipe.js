var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BundlesService } from '../services';
import { Pipe } from '@angular/core';
var TranslatePipe = (function () {
    function TranslatePipe(bundlesService) {
        this.bundlesService = bundlesService;
    }
    TranslatePipe.prototype.transform = function (key, parameters, lang) {
        return this.bundlesService.translate(key, parameters, lang);
    };
    return TranslatePipe;
}());
TranslatePipe = __decorate([
    Pipe({ name: 'translate', pure: false }),
    __metadata("design:paramtypes", [BundlesService])
], TranslatePipe);
export { TranslatePipe };
//# sourceMappingURL=translate.pipe.js.map