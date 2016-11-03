(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './sijil.module', './services/index'], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(require('./sijil.module'));
    var index_1 = require('./services/index');
    exports.RequireService = index_1.RequireService;
    exports.BundlesService = index_1.BundlesService;
    exports.Parser = index_1.Parser;
    exports.SijilOpts = index_1.SijilOpts;
});
//# sourceMappingURL=index.js.map