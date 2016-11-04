import { BundlesService } from '../services';
import { Pipe, PipeTransform } from '@angular/core'

@Pipe({name: 'translate', pure: false})
export class TranslatePipe {
    
    constructor(private bundlesService: BundlesService){}

    transform(key: string, parameters?: Object | any[], lang?: string) : string {
        return this.bundlesService.translate(key, parameters, lang)
    }
    
}