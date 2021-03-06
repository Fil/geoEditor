import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import * as meta from './package.json'

const config = (file, plugins, format = 'umd') => ({
  input: 'src/index.js',
  output: {
    name: 'GeoEditor',
    format,
    indent: false,
    extend: true,
    file
  },
  plugins: [
    resolve(),
    commonjs({
      namedExports: { debounce: ['debounce'] }
    }),
    ...plugins
  ]
})

export default [
  config(`dist/${meta.name}.esm.js`, [], 'esm'),
  config(`dist/${meta.name}.js`, []),
  config(`dist/${meta.name}.min.js`, [
    terser({
      output: {
        preamble: `// ${meta.homepage} v${
          meta.version
        } Copyright ${new Date().getFullYear()} ${meta.author.name}`
      }
    })
  ])
]
