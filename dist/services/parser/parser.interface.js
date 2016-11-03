var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    var ParserError = (function (_super) {
        __extends(ParserError, _super);
        function ParserError(message, fragment) {
            _super.call(this, message);
            this.message = message;
            this.fragment = fragment;
        }
        return ParserError;
    }(Error));
    exports.ParserError = ParserError;
    var Parser = (function () {
        function Parser() {
        }
        return Parser;
    }());
    exports.Parser = Parser;
});
//# sourceMappingURL=parser.interface.js.map