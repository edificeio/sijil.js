(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var XHRRequire = (function () {
        function XHRRequire() {
        }
        XHRRequire.prototype.load = function (from, async) {
            return new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                request.open('GET', from, !async);
                request.responseType = "json";
                request.onload = function (e) {
                    if (request.status === 200) {
                        var json = request.response;
                        resolve(json);
                    }
                    else {
                        console.log('Unsupported language.');
                    }
                };
                request.onerror = function (e) {
                    console.error(e);
                };
                request.send();
            });
        };
        return XHRRequire;
    }());
    exports.XHRRequire = XHRRequire;
});
//# sourceMappingURL=xhrrequire.service.js.map