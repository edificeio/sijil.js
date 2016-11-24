var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { BundlesService } from '../services';
export var S5lComponent = (function () {
    function S5lComponent(bundlesService) {
        this.bundlesService = bundlesService;
    }
    S5lComponent.prototype.refreshTranslation = function () {
        this.wrapperRef.nativeElement.innerHTML = this.bundlesService.translate(this.value, this.parameters, this.fixedLanguage);
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
    __decorate([
        ViewChild("wrapper"), 
        __metadata('design:type', ElementRef)
    ], S5lComponent.prototype, "wrapperRef", void 0);
    __decorate([
        Input("s5l-params"), 
        __metadata('design:type', Object)
    ], S5lComponent.prototype, "parameters", void 0);
    __decorate([
        Input("s5l-lang"), 
        __metadata('design:type', String)
    ], S5lComponent.prototype, "fixedLanguage", void 0);
    S5lComponent = __decorate([
        Component({
            selector: 's5l',
            template: "\n    <span #wrapper>\n        <ng-content></ng-content>\n    </span>",
            changeDetection: ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [BundlesService])
    ], S5lComponent);
    return S5lComponent;
}());
//# sourceMappingURL=s5l.component.js.map