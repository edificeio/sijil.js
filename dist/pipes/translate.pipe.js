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
        define(["require", "exports", '../services', '@angular/core'], factory);
    }
})(function (require, exports) {
    "use strict";
    var services_1 = require('../services');
    var core_1 = require('@angular/core');
    var TranslatePipe = (function () {
        function TranslatePipe(bundle) {
            this.bundle = bundle;
        }
        TranslatePipe.prototype.transform = function (key, parameters, lang) {
            return this.bundle.translate(key, parameters, lang);
        };
        TranslatePipe = __decorate([
            core_1.Pipe({ name: 'translate', pure: false }), 
            __metadata('design:paramtypes', [services_1.BundlesService])
        ], TranslatePipe);
        return TranslatePipe;
    }());
    exports.TranslatePipe = TranslatePipe;
});
//# sourceMappingURL=translate.pipe.js.map