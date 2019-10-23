import { terser } from 'rollup-plugin-terser'
import * as meta from './package.json'

const config = (file, plugins) => ({
  input: 'index.js',
  output: {
    name: 'GeoEditor',
    format: 'umd',
    indent: false,
    extend: true,
    file
  },
  plugins
})

export default [
  config(`${meta.name}.js`, []),
  config(`${meta.name}.min.js`, [terser({
    output: {
      preamble: `// ${meta.homepage} v${meta.version} Copyright ${(new Date()).getFullYear()} ${meta.author.name}`
    }
  })])
]
