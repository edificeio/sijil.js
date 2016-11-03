(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './require/httprequire.service', './require/require.interface', './parser/fragments.parser', './parser/parser.interface', './bundles.service', './sijil.opts'], factory);
    }
})(function (require, exports) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(require('./require/httprequire.service'));
    __export(require('./require/require.interface'));
    __export(require('./parser/fragments.parser'));
    __export(require('./parser/parser.interface'));
    __export(require('./bundles.service'));
    __export(require('./sijil.opts'));
});
//# sourceMappingURL=index.js.map