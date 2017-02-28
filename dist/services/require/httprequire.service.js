import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
var HttpRequireService = (function () {
    function HttpRequireService(http) {
        this.http = http;
    }
    HttpRequireService.prototype.load = function (url) {
        return this.http.get(url).toPromise()
            .then(function (data) { return data.json(); });
    };
    return HttpRequireService;
}());
export { HttpRequireService };
HttpRequireService.decorators = [
    { type: Injectable },
];
HttpRequireService.ctorParameters = function () { return [
    { type: Http, },
]; };
//# sourceMappingURL=httprequire.service.js.map