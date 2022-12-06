import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import { babel } from '@rollup/plugin-babel'

import { createRequire } from 'module' // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url)
const pkg = require('./package.json')

// import pkg from "./package.json";

const formatName = 'utils'

export default {
  input: './src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: formatName // [!] RollupError: You must supply "output.name" for UMD bundles that have exports so that the exports are accessible in environments without a module loader.
    }
  ],
  plugins: [
    json(),
    commonjs({
      include: /node_modules/
    }),
    resolve({
      preferBuiltins: true,
      jsnext: true,
      main: true,
      browser: true
    }),
    typescript(),
    eslint(),
    babel({ babelHelpers: 'bundled', exclude: 'node_modules/**' })
  ]
}
