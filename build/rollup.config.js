import path from 'path'
import babel from 'rollup-plugin-babel'
import VuePlugin from 'rollup-plugin-vue'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import { camelCase } from 'lodash'
import { name, dependencies } from '../package.json'

const base = path.resolve(__dirname, '..')
const src = path.resolve(base, 'src')
const dist = path.resolve(base, 'dist')

const externals = [...Object.keys(dependencies)]

const baseConfig = {
  input: path.resolve(src, 'index.js'),
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    VuePlugin({
      css: true,
      compileTemplate: true
    })
  ]
}

export default [
  // UMD
  {
    ...baseConfig,
    output: {
      format: 'umd',
      name: camelCase(name),
      file: path.resolve(dist, `${name}.js`),
      exports: 'named',
      globals: {
        vue: 'Vue'
      }
    },
    plugins: [
      ...baseConfig.plugins,
      resolve()
    ]
  },

  // UMD min
  {
    ...baseConfig,
    output: {
      format: 'umd',
      name: camelCase(name),
      file: path.resolve(dist, `${name}.min.js`),
      exports: 'named',
      globals: {
        vue: 'Vue'
      },
      plugins: [
        terser()
      ]
    },
    plugins: [
      ...baseConfig.plugins,
      resolve()
    ]
  },

  // COMMON
  {
    ...baseConfig,
    external: externals,
    output: {
      format: 'cjs',
      name: camelCase(name),
      file: path.resolve(dist, `${name}.common.js`),
      exports: 'named'
    }
  },

  // COMMON min
  {
    ...baseConfig,
    external: externals,
    output: {
      format: 'cjs',
      name: camelCase(name),
      file: path.resolve(dist, `${name}.common.min.js`),
      exports: 'named',
      plugins: [
        terser()
      ]
    }
  },

  // ESM
  {
    ...baseConfig,
    external: externals,
    output: {
      format: 'es',
      file: path.resolve(dist, `${name}.esm.js`)
    }
  },

  // ESM min
  {
    ...baseConfig,
    external: externals,
    output: {
      format: 'es',
      file: path.resolve(dist, `${name}.esm.min.js`),
      plugins: [
        terser()
      ]
    }
  }
]
