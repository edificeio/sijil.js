import { ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { BundlesService } from '../services';
export declare class S5lComponent implements AfterViewInit {
    private bundlesService;
    private changeDetectorRef;
    constructor(bundlesService: BundlesService, changeDetectorRef: ChangeDetectorRef);
    wrapperRef: ElementRef;
    private value;
    private loaded;
    private parameters;
    private fixedLanguage;
    private bundleRef;
    private refreshTranslation();
    ngAfterViewInit(): void;
    ngDoCheck(): void;
}
