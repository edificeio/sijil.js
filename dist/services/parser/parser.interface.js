var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
export var ParserError = (function (_super) {
    __extends(ParserError, _super);
    function ParserError(message, fragment) {
        _super.call(this, message);
        this.message = message;
        this.fragment = fragment;
    }
    return ParserError;
}(Error));
export var Parser = (function () {
    function Parser() {
    }
    return Parser;
}());
//# sourceMappingURL=parser.interface.js.map