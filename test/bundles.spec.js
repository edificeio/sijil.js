import { Reflect } from 'core-js'
import { simpleRequire } from './simple.require'
import { FragmentsParser } from '../dist/services/parser/fragments.parser'
import { BundlesService } from '../dist/services/bundles.service'

let assert = require('assert')

describe('Sijil', function() {

    let service

    before(function(){
        service = new BundlesService(simpleRequire, new FragmentsParser(), {})
        service.defaultLanguage = 'en'
        return service.loadBundles([{lang: 'fr', where: 'fr'}, { lang: 'en', where: 'en' }])
            .then(service.currentLanguage = 'en')
    })

    it('should produce a list of loaded languages', function() {
        let loaded = service.getLoadedLanguages()
        let reference = ['en', 'fr']
        assert(reference.length === loaded.length)
        loaded.forEach(function(l){
            assert(reference.indexOf(l) >= 0)
        })
    })

    it('should translate a plain string', function() {
        assert.equal(service.translate('simple.string'), 'A simple test')
    })

    it('should translate a plain string in multiple languages', function() {
        assert.equal(service.translate('simple.string', null, 'fr'), 'Un simple test')
    })

    it('should properly fallback when language support is missing', function() {
        assert.equal(service.translate('simple.string', 'es'), 'A simple test')
    })

    it('should compute a fragment containing a single [object reference]', function(){
        let parameters = { param: 'Igor' }

        assert.equal(service.translate('simple.object.parameter', parameters), `A parameter named ${parameters['param']}`)
    })

    it('should compute a fragment containing a single [array index]', function(){
        let parameters = [ 'Thomas' ]

        assert.equal(service.translate('simple.array.parameter', parameters), `A parameter named ${parameters[0]}`)
    })

    it('should compute a fragment containing a true/false condition with [object references]', function(){
        let parametersTrue = { check : true, "true": "true", "false": "false"}
        let parametersFalse = { check : false, "true": "true", "false": "false"}

        let trueRef = "it's true"
        let falseRef = "it's false"

        for(let i = 1; i < 4; i++){
            assert.equal(service.translate(`true.false.object.check${i}`, parametersTrue), trueRef)
            assert.equal(service.translate(`true.false.object.check${i}`, parametersFalse), falseRef)
        }
    })

    it('should compute a fragment containing a simple ternary with [array indexes]', function(){
        let parametersTrue = [true, "true", "false"]
        let parametersFalse = [false, "true", "false"]

        let trueRef = "it's true"
        let falseRef = "it's false"

        for(let i = 1; i < 4; i++){
            assert.equal(service.translate(`true.false.array.check${i}`, parametersTrue), trueRef)
            assert.equal(service.translate(`true.false.array.check${i}`, parametersFalse), falseRef)
        }
    })

    it('should compute a fragment containing a simple ternary with [object references]', function(){
        let parametersTrue = { check : true, "true": "true", "false": "false"}
        let parametersFalse = { check : false, "true": "true", "false": "false"}

        let trueRef = "it's true"
        let falseRef = "it's false"

        for(let i = 1; i < 4; i++){
            assert.equal(service.translate(`true.false.object.check${i}`, parametersTrue), trueRef)
            assert.equal(service.translate(`true.false.object.check${i}`, parametersFalse), falseRef)
        }
    })

    it('should compute a fragment containing a complex ternary with [object references]', function(){
        let params = { check : 1, check2: 1 }

        let trueRef = "it's true"
        let falseRef = "it's false"

        assert.equal(service.translate(`gt.object.check`, params), falseRef)
        assert.equal(service.translate(`gte.object.check`, params), trueRef)
        assert.equal(service.translate(`lt.object.check`, params), falseRef)
        assert.equal(service.translate(`lte.object.check`, params), trueRef)
        assert.equal(service.translate(`eq.object.check`, params), trueRef)
    })

    it('should compute a fragment containing a complex ternary with [array indexes]', function(){
        let params = [1, 1]

        let trueRef = "it's true"
        let falseRef = "it's false"

        assert.equal(service.translate(`gt.array.check`, params), falseRef)
        assert.equal(service.translate(`gte.array.check`, params), trueRef)
        assert.equal(service.translate(`lt.array.check`, params), falseRef)
        assert.equal(service.translate(`lte.array.check`, params), trueRef)
        assert.equal(service.translate(`eq.array.check`, params), trueRef)
        assert.equal(service.translate(`eq.array.check2`, params), falseRef)
    })

    it('should properly unload a loaded language', function(){
        service.unloadBundle('en')
        assert.equal(service.translate('simple.string'), 'simple.string')
        assert.equal(service.translate('simple.string', null, 'fr'), 'Un simple test')
    })

})