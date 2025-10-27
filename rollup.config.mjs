import json from '@rollup/plugin-json'
import terser from '@rollup/plugin-terser'

export default [
  {
    input: 'max/index.js',
    plugins: [
      json(),
      terser()
    ],
    output: {
      format: 'umd',
      name: 'libphonenumber',
      file: 'bundle/libphonenumber-max.js',
      sourcemap: true
    }
  }
]