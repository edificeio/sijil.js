import { NgModule, ModuleWithProviders, Type } from '@angular/core'
import { HttpModule } from '@angular/http'

import { S5lComponent } from './components'
import { TranslatePipe } from './pipes/translate.pipe'
import { HttpRequireService, RequireService, BundlesService, 
    SijilOpts, defaultSijilOpts, Parser, FragmentsParser } from './services/index'
import './rxjs-includes'

let moduleProviders = [
    { provide: BundlesService, useClass: BundlesService, deps: [ RequireService, Parser, SijilOpts ] },
    { provide: RequireService, useClass: HttpRequireService },
    { provide: Parser, useClass: FragmentsParser },
    { provide: SijilOpts, useValue: defaultSijilOpts }
]

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
    providers: moduleProviders,
    exports: [ S5lComponent, TranslatePipe ]
})
export class SijilModule {

    static forRoot(require?: Type<RequireService>, parser?: Type<Parser>, options?: SijilOpts): ModuleWithProviders {
        moduleProviders[1]['useClass'] = require || HttpRequireService
        moduleProviders[2]['useClass'] = parser  || FragmentsParser
        moduleProviders[3]['useValue'] = options || defaultSijilOpts
        
        return {
            ngModule: SijilModule,
            providers: moduleProviders
        };
    }

}