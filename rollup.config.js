import sass from 'rollup-plugin-sass'
import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

export default {
    input: 'src/index.tsx',
    output: [
      {
        file: 'dist/esm/index.js',
        format: 'module',
        exports: 'named',
        sourcemap: true,
        strict: false,
      },
      {
        file: 'dist/cjs/index.js',
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
        strict: false,
      }
    ],
    plugins: [
      sass({ insert: true }),
      typescript({ objectHashIgnoreUnknownHack: true }),
      resolve(),
      babel({babelHelpers: 'runtime', exclude: "node_modules/**" })
    ],
    external: ['react', 'react-dom']
  }