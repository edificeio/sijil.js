import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var HttpRequireService = (function () {
    function HttpRequireService(httpClient) {
        this.httpClient = httpClient;
    }
    HttpRequireService.prototype.load = function (url) {
        return this.httpClient.get(url).toPromise()
            .then(function (data) { return data; });
    };
    HttpRequireService.decorators = [
        { type: Injectable },
    ];
    HttpRequireService.ctorParameters = function () { return [
        { type: HttpClient, },
    ]; };
    return HttpRequireService;
}());
export { HttpRequireService };
//# sourceMappingURL=httprequire.service.js.map