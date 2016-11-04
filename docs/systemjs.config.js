/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        transpiler: "ts",
        typescriptOptions: {
            module: "system",
            noImplicitAny: true,
            sourceMap: true,
            emitDecoratorMetadata: true,
            experimentalDecorators: true
        },
        paths: {
            'npm:': 'node_modules/',
            'libs:': '../docs/libs/',
            'rxjs/*': 'https://cdnjs.cloudflare.com/ajax/libs/rxjs/5.0.0-rc.1/Rx.min.js',
        },
        packages: {
            'demo': {
                main: 'test',
                defaultExtension: 'ts',
                deps: [ 'Rx' ]
            },
            'ts': {
                main: 'plugin.js'
            },
            'typescript': {
                "main": "typescript.js",
                "meta": {
                    "typescript.js": {
                        "exports": "ts"
                    }
                }
            }
        },
        map: {
            demo: '../docs/',
            'sijil': '../dist/bundles/sijil.module.umd.js',
            '@angular/core': 'libs:core.umd.min.js',
            '@angular/common': 'libs:common.umd.min.js',
            '@angular/compiler': 'libs:compiler.umd.min.js',
            '@angular/platform-browser': 'libs:platform-browser.umd.min.js',
            '@angular/platform-browser-dynamic': 'libs:platform-browser-dynamic.umd.min.js',
            '@angular/http': 'libs:http.umd.min.js',
            '@angular/forms': 'libs:forms.umd.min.js',
            'ts': 'libs:',
            'typescript': 'libs:'
        },
         meta: {
            'src/services/require/require.interface.ts': { format: 'esm' },
            'src/services/parser/parser.interface.ts': { format: 'esm' }
         }
    });
})(this);