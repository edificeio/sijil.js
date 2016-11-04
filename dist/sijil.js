import { BundlesService } from './services/bundles.service';
import { FragmentsParser } from './services/parser/fragments.parser';
import { XHRRequire } from './services/require/xhrrequire.service';
import { defaultSijilOpts } from './services/sijil.opts';
var bundlesService = new BundlesService(new XHRRequire(), new FragmentsParser(), defaultSijilOpts);
bundlesService['factory'] = function (require, parser, opts) {
    return new BundlesService(require || new XHRRequire(), parser || new FragmentsParser(), opts || defaultSijilOpts);
};
export default bundlesService;
//# sourceMappingURL=sijil.js.map