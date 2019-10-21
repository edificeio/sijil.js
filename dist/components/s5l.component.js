import { Component, Input, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { BundlesService } from '../services';
var S5lComponent = (function () {
    function S5lComponent(bundlesService) {
        this.bundlesService = bundlesService;
    }
    S5lComponent.prototype.refreshTranslation = function () {
        var newDisplayedValue = this.bundlesService.translate(this.value, this.parameters, this.fixedLanguage);
        if (this.displayedValue !== newDisplayedValue) {
            this.displayedValue = newDisplayedValue;
            this.wrapperRef.nativeElement.innerHTML = this.displayedValue;
        }
    };
    S5lComponent.prototype.ngAfterViewInit = function () {
        this.value = this.wrapperRef.nativeElement.innerHTML.trim();
        this.loaded = true;
        this.refreshTranslation();
    };
    S5lComponent.prototype.ngDoCheck = function () {
        if (!this.loaded)
            return;
        this.refreshTranslation();
    };
    S5lComponent.decorators = [
        { type: Component, args: [{
                    selector: 's5l',
                    template: "\n    <span #wrapper>\n        <ng-content></ng-content>\n    </span>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    S5lComponent.ctorParameters = function () { return [
        { type: BundlesService, },
    ]; };
    S5lComponent.propDecorators = {
        "wrapperRef": [{ type: ViewChild, args: ["wrapper",] },],
        "parameters": [{ type: Input, args: ["s5l-params",] },],
        "fixedLanguage": [{ type: Input, args: ["s5l-lang",] },],
    };
    return S5lComponent;
}());
export { S5lComponent };
//# sourceMappingURL=s5l.component.js.map