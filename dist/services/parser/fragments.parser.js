import { ParserError } from './parser.interface';
export var FragmentsParser = (function () {
    function FragmentsParser() {
    }
    FragmentsParser.prototype.getParameter = function (parameters, fragment, strict) {
        var splittedFrag = fragment.split(/\s+/);
        if (splittedFrag.length === 1) {
            return fragment[0] === "$" ?
                parameters[fragment.substr(1)] :
                strict ?
                    fragment :
                    parameters[fragment] || fragment;
        }
        return fragment.split(/\s+/).reduce(function (l, r) {
            l.push(r[0] === "$" ? parameters[r.substr(1)] : r);
            return l;
        }, []).join(' ');
    };
    FragmentsParser.prototype.compileFragment = function (fragment, parameters) {
        fragment = fragment.replace(/{{|}}/g, '');
        var interrogationIndex, dotsIndex;
        if ((interrogationIndex = fragment.indexOf('?')) > 0 && (dotsIndex = fragment.lastIndexOf(':')) > 1) {
            var condition = fragment.substring(0, interrogationIndex).trim();
            var trueReturn = fragment.substring(interrogationIndex + 1, dotsIndex).trim();
            var falseReturn = fragment.substring(dotsIndex + 1).trim();
            var computedTrueReturn = this.getParameter(parameters, trueReturn);
            var computedFalseReturn = this.getParameter(parameters, falseReturn);
            var splittedCondition = condition.split(/\s+/);
            if (splittedCondition.length === 1) {
                var variable = parameters[splittedCondition[0]];
                return variable ?
                    computedTrueReturn :
                    computedFalseReturn;
            }
            else if (splittedCondition.length === 3) {
                var leftHandParam = this.getParameter(parameters, splittedCondition[0], parameters instanceof Array);
                var rightHand = this.getParameter(parameters, splittedCondition[2], parameters instanceof Array);
                var comparisonOperator = splittedCondition[1];
                switch (comparisonOperator) {
                    case '==':
                        return leftHandParam == rightHand ?
                            computedTrueReturn :
                            computedFalseReturn;
                    case '>':
                        return leftHandParam > rightHand ?
                            computedTrueReturn :
                            computedFalseReturn;
                    case '>=':
                        return leftHandParam >= rightHand ?
                            computedTrueReturn :
                            computedFalseReturn;
                    case '<':
                        return leftHandParam < rightHand ?
                            computedTrueReturn :
                            computedFalseReturn;
                    case '<=':
                        return leftHandParam <= rightHand ?
                            computedTrueReturn :
                            computedFalseReturn;
                    default:
                        throw new ParserError("Invalid conditional operator for fragment : " + fragment, fragment);
                }
            }
            else {
                throw new ParserError("Invalid condition for fragment : " + fragment, fragment);
            }
        }
        else {
            fragment = fragment.trim();
            return parameters[fragment];
        }
    };
    FragmentsParser.prototype.compile = function (rawTranslation, parameters, onError) {
        var parts = rawTranslation.split(FragmentsParser.delimRegexp);
        var fragments = rawTranslation.match(FragmentsParser.delimRegexp);
        var compiledTranslation = "";
        if (!onError)
            onError = FragmentsParser.defaultErrorCallback;
        if (!fragments) {
            compiledTranslation += rawTranslation;
        }
        else {
            for (var i = 0; i < parts.length; i++) {
                compiledTranslation += parts[i];
                if (i > fragments.length - 1)
                    continue;
                try {
                    compiledTranslation += this.compileFragment(fragments[i], parameters);
                }
                catch (e) {
                    compiledTranslation += onError(e);
                }
            }
        }
        return compiledTranslation;
    };
    FragmentsParser.delimiters = ['{{', '}}'];
    FragmentsParser.delimRegexp = new RegExp(FragmentsParser.delimiters[0] + "[^}]+" + FragmentsParser.delimiters[1], 'gm');
    FragmentsParser.defaultErrorCallback = function (e) {
        console.error(e);
        return e.fragment;
    };
    return FragmentsParser;
}());
//# sourceMappingURL=fragments.parser.js.map