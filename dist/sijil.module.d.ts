import { ModuleWithProviders, Type } from '@angular/core';
import { RequireService, SijilOpts, Parser } from './services/index';
import './rxjs-includes';
export declare class SijilModule {
    static forRoot(require?: Type<RequireService>, parser?: Type<Parser>, options?: SijilOpts): ModuleWithProviders;
    static forChild(): ModuleWithProviders;
}
