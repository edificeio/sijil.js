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

    constructor(private bundlesService: BundlesService){}

    @ViewChild("wrapper") wrapperRef: ElementRef

    private value: string
    private loaded: boolean

    @Input("s5l-params") parameters: Object | any[]
    @Input("s5l-lang") fixedLanguage: string

    private refreshTranslation() {
        this.wrapperRef.nativeElement.innerHTML = this.bundlesService.translate(this.value, this.parameters, this.fixedLanguage)
    }

    ngAfterViewInit() : void {
        this.value = this.wrapperRef.nativeElement.innerHTML.trim()
        this.loaded = true
        this.refreshTranslation()
    }

    ngDoCheck() {
        if (!this.loaded)
            return
        this.refreshTranslation()
    }
}