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
export { TranslatePipe };
TranslatePipe.decorators = [
    { type: Pipe, args: [{ name: 'translate', pure: false },] },
];
TranslatePipe.ctorParameters = function () { return [
    { type: BundlesService, },
]; };
//# sourceMappingURL=translate.pipe.js.map