import { Component, Input, ElementRef, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core'
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
    private displayedValue: string

    @Input("s5l-params") parameters: Object | any[]
    @Input("s5l-lang") fixedLanguage: string

    private refreshTranslation() {
        const newDisplayedValue = this.bundlesService.translate(this.value, this.parameters, this.fixedLanguage)
        if (this.displayedValue !== newDisplayedValue) {
            this.displayedValue = newDisplayedValue
            this.wrapperRef.nativeElement.innerHTML = this.displayedValue
        }
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