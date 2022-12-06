import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import baseConfig from './rollup.config.base.js'

export default {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    serve({
      open: true,
      contentBase: '',
      port: 8020
    }),
    livereload('src')
  ]
}
