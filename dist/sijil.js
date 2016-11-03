(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './services/bundles.service', './services/parser/fragments.parser', './services/require/xhrrequire.service', './services/sijil.opts'], factory);
    }
})(function (require, exports) {
    "use strict";
    var bundles_service_1 = require('./services/bundles.service');
    var fragments_parser_1 = require('./services/parser/fragments.parser');
    var xhrrequire_service_1 = require('./services/require/xhrrequire.service');
    var sijil_opts_1 = require('./services/sijil.opts');
    var bundlesService = new bundles_service_1.BundlesService(new xhrrequire_service_1.XHRRequire(), new fragments_parser_1.FragmentsParser(), sijil_opts_1.defaultSijilOpts);
    bundlesService['factory'] = function (require, parser, opts) {
        return new bundles_service_1.BundlesService(require || new xhrrequire_service_1.XHRRequire(), parser || new fragments_parser_1.FragmentsParser(), opts || sijil_opts_1.defaultSijilOpts);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = bundlesService;
});
//# sourceMappingURL=sijil.js.map