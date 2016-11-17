import { Component, Input, ElementRef, ViewChild, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'
import { BundlesService } from '../services'

@Component({
    selector: 's5l',
    template: `
    <span #wrapper>
        <ng-content></ng-content>
    </span>`,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class S5lComponent implements AfterViewInit {

    constructor(private bundlesService: BundlesService,
        private changeDetectorRef: ChangeDetectorRef){}

    @ViewChild("wrapper") wrapperRef: ElementRef

    private value: string
    private loaded: boolean

    @Input("s5l-params")
    private parameters: Object | any[]
    @Input("s5l-lang")
    private fixedLanguage: string

    private bundleRef = null

    private refreshTranslation() {
        this.wrapperRef.nativeElement.innerHTML = this.bundlesService.translate(this.value, this.parameters, this.fixedLanguage)
    }

    ngAfterViewInit() : void {
        this.value = this.wrapperRef.nativeElement.innerHTML.trim()
        this.loaded = true
        this.bundleRef = this.bundlesService['bundles'][this.fixedLanguage || this.bundlesService.currentLanguage]
        this.refreshTranslation()
    }

    ngDoCheck() {
        let newBundleRef = this.bundlesService['bundles'][this.fixedLanguage || this.bundlesService.currentLanguage]
        if(!this.loaded || this.bundleRef === newBundleRef)
            return
        this.bundleRef = newBundleRef
        this.refreshTranslation()
    }
}