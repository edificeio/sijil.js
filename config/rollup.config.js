import typescript from 'rollup-plugin-typescript'
import uglify from 'rollup-plugin-uglify'

export default {
    entry: './src/sijil.ts',
    dest: './dist/bundles/sijil.js',
    format: 'iife',
    moduleName: 'Sijil',
    sourceMap: true,
    plugins: [
        typescript({
            tsconfig: false,
            sourceMap: true
        }),
        uglify()
    ]
}