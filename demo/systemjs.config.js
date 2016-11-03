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
            'npm:': 'node_modules/'
        },
        packages: {
            'demo': {
                main: 'test',
                defaultExtension: 'ts'
            },
            "ts": {
                "main": "plugin.js"
            },
            "typescript": {
                "main": "lib/typescript.js",
                "meta": {
                    "lib/typescript.js": {
                        "exports": "ts"
                    }
                }
            },
            rxjs: {
                defaultExtension: 'js'
            }
        },
        map: {
            demo: '/demo',
            'sijil': '/dist/bundles/sijil.module.umd.js',
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            'rxjs': 'npm:rxjs',
            'ts': "npm:plugin-typescript/lib/",
            'typescript': 'npm:typescript/'
        },
         meta: {
            'src/services/require/require.interface.ts': { format: 'esm' },
            'src/services/parser/parser.interface.ts': { format: 'esm' }
         }
    });
})(this);