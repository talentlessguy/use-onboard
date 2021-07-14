import ts from '@rollup/plugin-typescript'
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
    plugins: [ts({ include: ['./src/**/*.ts'] })],
    external: Object.keys(peerDependencies)
  }
]
