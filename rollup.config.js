import ts from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import { peerDependencies } from './package.json'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        dir: 'dist',
        format: 'esm'
      },
      {
        file: 'dist/index.cjs',
        format: 'cjs'
      }
    ],
    plugins: [ts({ include: ['./src/**/*.ts'] }), terser({ mangle: false }), filesize()],
    external: Object.keys(peerDependencies)
  }
]
