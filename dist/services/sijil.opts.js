(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var SijilOpts = (function () {
        function SijilOpts() {
        }
        return SijilOpts;
    }());
    exports.SijilOpts = SijilOpts;
    exports.defaultSijilOpts = {
        defaultLanguage: window.navigator.language.split('-')[0]
    };
});
//# sourceMappingURL=sijil.opts.js.map