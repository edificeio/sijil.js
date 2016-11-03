import { BundlesService } from './services/bundles.service'
import { RequireService}   from './services/require/require.interface'
import { FragmentsParser } from './services/parser/fragments.parser'
import { Parser } from './services/parser/parser.interface'
import { XHRRequire } from './services/require/xhrrequire.service'
import { defaultSijilOpts, SijilOpts } from './services/sijil.opts'

let bundlesService = new BundlesService(new XHRRequire(), new FragmentsParser(), defaultSijilOpts)
bundlesService['factory'] = (require: RequireService, parser: Parser, opts: SijilOpts) => {
    return new BundlesService(require || new XHRRequire(), parser || new FragmentsParser(), opts || defaultSijilOpts)
}
export default bundlesService