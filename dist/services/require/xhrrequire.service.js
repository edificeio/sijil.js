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
export { XHRRequire };
//# sourceMappingURL=xhrrequire.service.js.map