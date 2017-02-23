import { NgModule, ModuleWithProviders, Type } from '@angular/core'
import { HttpModule } from '@angular/http'

import { S5lComponent } from './components'
import { TranslatePipe } from './pipes/translate.pipe'
import { HttpRequireService, RequireService, BundlesService,
    SijilOpts, defaultSijilOpts, Parser, FragmentsParser } from './services/index'
import './rxjs-includes'

/**
 * Sijil angular2 module.
 *
 * Usage :
 *
 * ```typescript
 * import { SijilModule } from 'sijil/dist'
 *
 * @NgModule({
 *   imports: [
 *       // ... //
 *      SijilModule
 *       // ... //
 *    ]
 * })
 * ```
 */
@NgModule({
    imports: [ HttpModule ],
    declarations: [ S5lComponent, TranslatePipe ],
    providers: [],
    exports: [ S5lComponent, TranslatePipe ]
})
export class SijilModule {

    static forRoot(require?: Type<RequireService>, parser?: Type<Parser>, options?: SijilOpts) : ModuleWithProviders {
        return {
            ngModule: SijilModule,
            providers: [
                { provide: BundlesService, useClass: BundlesService, deps: [ RequireService, Parser, SijilOpts ] },
                { provide: RequireService, useClass: require || HttpRequireService },
                { provide: Parser, useClass: parser || FragmentsParser },
                { provide: SijilOpts, useValue: options || defaultSijilOpts }
            ]
        }
    }

    static forChild() : ModuleWithProviders {
        return {
            ngModule: SijilModule,
            providers: []
        }
    }

}