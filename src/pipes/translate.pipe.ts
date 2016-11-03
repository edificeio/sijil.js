import { BundlesService } from '../services';
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'translate', pure: false})
export class TranslatePipe {
    
    constructor(private bundle: BundlesService){}

    transform(key: string, parameters?: Object | any[], lang?: string) : string {
        return this.bundle.translate(key, parameters, lang)
    }
    
}