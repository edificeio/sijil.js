# Sijil
#### *[SI]mple [J]son [I]nternationalization [L]ibrary*

[![Build Status](https://travis-ci.org/web-education/sijil.js.svg)](https://travis-ci.org/web-education/sijil.js)

## Introduction

Sijil is a simple but powerful i18n library.
It can be used in conjunction with angular2, or as an old fashioned &lt;script&gt; inclusion.

Sijil is (very) basically a javascript object with one entry by language loaded, 
which contains all the translations available as key/values.

Like this :
```json
{
    "en": { "hello": "Hi", "bye": "Bye" },
    "fr": { "hello": "Salut !", "bye": "Au revoir" }
}
```

But the interesting part is that we can use parameters and combine them with the final output.

`Here is {{ name ? name : Nobody }} and {{ male ? his : her }} {{ 1 < bunnyCount ? $bunnyCount bunnies : bunny }}.`

The library is also completely customizable, from the Loader to the Parser.

*( [Demo](https://web-education.github.io/sijil.js/docs/) )*

## Installation

### Using npm

`npm install web-education/sijil.js --save-dev`

### Or bower

>bower cli

`bower install web-education/sijil.js`

>bower.json

```json
"dependencies": {
    "sijil": "web-education/sijil.js#master"
}
```

Then : `bower install`

### Or build it yourself

- clone this repo
- `npm install`
- `npm start` 

Distribution files will be located inside the `dist` folder.

## Use it

### *With angular2*

Use the es6 files ( `dist/index.js` as the entry point ) and d.ts definitions, or the umd.bundle located inside the `dist/bundles/sijil.module.umd.js`. 

For example, with SystemJs loader, inside the `systemjs.config.js` file :

```javascript
 System.config({
     // ... //
     map: {
         // ... //
         'sijil/dist': 'npm:sijil/dist/bundles/sijil.module.umd.js'
         // ... //
     }
     // ... //
 })
```

#### Import the module

```typescript
import { SijilModule } from 'sijil/dist'

@NgModule({
    imports: [
        /* ... */
        SijilModule
        /* ... */
     ]
})
```

*Alternative* : 

A `forRoot` method is provided to allow customization.

#### Inside a component

- Inject the main service :

```typescript
import { BundlesService } from 'sijil/dist'

/* ... */

constructor(..., private bundlesService: BundlesService, ...){}
```

- Load a bundle : 

```typescript
this.bundlesService.loadBundle('/path/to/the/language/file.json', 'en')
    .then(/* The bundle is loaded. */)
    .catch(...)
```

The default loader will perform an http request at the specified path to retrieve a json file.
The contents will be added to the current language bundle (or the specified language as the 2nd argument).

- Inside a template

```html
    <!-- USING THE S5L HTML TAG -->

    <s5l>hello</s5l>
    <!-- Force a language -->
    <s5l s5l-lang='en'>hello</s5l>
    <!-- With parameters -->
    <s5l [s5l-params]="{ itemNumber: 3 }">count.key</s5l>
    <!-- count.key being mapped to something like "There {{ itemNumber > 1 ? are $itemNumber items : is one item }} in the room" -->

    <!-- USING THE TRANSLATE PIPE -->

    {{ 'hello' | translate }}
    <!-- As an attribute -->
    <input attr.placeholder="{{ 'enter.your.name' | translate }}" />
    <!-- Force a language -->
    {{ 'hello' | translate:{}:'fr' }}
    <!-- With parameters -->
    {{ 'count.key' | translate:{itemNumber: 3} }}
```

#### forRoot

```typescript
static forRoot(require?: Type<RequireService>, parser?: Type<Parser>, options?: SijilOpts): ModuleWithProviders
```

The forRoot method can be used to override the default services :

```typescript
class DummyRequire implements RequireService {
    load(){ return new Promise(res => { res({ 'key': 'value'}) }) }
}

class DummyParser implements Parser {
    compile(text){ return text }
}

let dummyOpts = {  defaultLanguage: 'en' }

@NgModule({
    imports: [
        /* ... */
        SijilModule.forRoot(DummyRequire, DummyParser, dummyOpts)
        /* ... */
     ]
})
```

### *Without angular2*

Include via a `<script src="[your.sijil.path]/dist/bundles/sijil.js></script>` tag.

Then use the global `Sijil` object as needed.

```html
 <script src="../dist/bundles/sijil.js"></script>
```

```javascript
// Loads /docs/language.json file.
Sijil.loadBundle('/docs/' + Sijil.defaultLanguage + '.json').then(function(){
    // Adds the 'test' key to the bundle.
    Sijil.addToBundle({ 'test': '[OK] Sijil is now loaded.' })
    // Logs it.
    console.log(Sijil.translate('test'))
})
```

#### factory :

The factory method can be used to override the default services :

```javascript
// Declaration in the Sijil lib :
Sijil['factory'] = (require: RequireService, parser: Parser, opts: SijilOpts) => {
    return new BundlesService(require || new XHRRequire(), parser || new FragmentsParser(), opts || defaultSijilOpts)
}
```

```javascript
// Usage in your code :
let sijilInstance = Sijil.factory({
        // Dummy loader
        load: () => { return new Promise(res => { res({ 'key': 'value'}) }) },
    }, {
        // Dummy parser 
        compile: (text) => text
    }, {
        // Dummy options
        defaultLanguage: 'en'
    })
sijilInstance.loadBundle().then(() => { console.log(sijilInstance.translate('key')) })
// <-- Outputs 'value'
```

## Methods 

#### loadBundle
*or loadBundles for multiple bundles*

Loads a bundle and associates it with a language.
If the target language already contains key/values, then we mixin the new bundle and the existing one.

```typescript
loadBundle(where, lang?: string) : Promise<void>
```

#### translate
*the method called by the translate pipe and the s5l tag*

Translates a single key into a target language, using the parameters provided if needed.

```typescript
translate(key: string, parameters?: Object | any[], lang?: string) : string
```

#### unloadBundle

Removes a bundle from the bundles list.

```typescript
unloadBundle(lang: string) : void
```

#### getLoadedLanguages

Returns a list of all loaded languages.

```typescript
getLoadedLanguages() : string[]
```

## Architecture

### Require Service

A RequireService is used to fetch bundles. It contains a single `load: (from: any) => Promise<Object>` method, 
which loads the bundle according to its argument value.

The default RequireService provided (HttpRequireService for angular2 users, XhrRequireService otherwise) fetches the bundles from an url and parses json from the reponse. 

### Parser Service

A ParserService computes any logic provided in the translations.

- Input : 'raw' translation + parameters (Object or Array)
- Output : 'compiled' translation

The default provider instanciates a FragmentsParserService, which accepts the syntax described below.

#### FragmentsParserService

Logic is contained inside mustache blocks : `{{ logic block }}`

There are two variants :

##### A single parameter key or index

*A key when the parameters are contained inside an object or an index when the parameters are contained inside an array*
      
Examples: 
 
`{{ key }}` + `{ "key" : "my key" }` = `my key` 

`{{ 1 }}` + `[1, 2]` = `2`

##### A ternary-like condition
     
`{{ condition ? trueValue : falseValue }}`

`{{ leftClause operator rightClause ? trueValue : falseValue }}`

Where condition may be either a single parameter key/index, or 2 clauses with the following operators : `==, >, =>, <=, <` 

Examples: 
 
*the $ sign is used in ambiguous cases to refer to the parameter*

`{{ count > 1 ? $count cats : 1 cat }}` + `{"count": 10}` = `10 cats`

`{{ 1 < count ? $count cats : 1 cat }}` + `{"count": 1}` = `1 cat`

##### Parameters array or parameter objects ?

The syntax is the same, but with indexes instead of names :

`{{ $0 > 1 ? $0 cats : 1 cat }}` + `[10]` = `10 cats`

`{{ 1 < $0 ? $0 cats : 1 cat named $1 }}` + `[1, 'Albert']` = `1 cat named Albert`
