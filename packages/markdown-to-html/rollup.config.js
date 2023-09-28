import path from 'path';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import { multibanner, onebanner } from 'bannerjs';
import pkg from './package.json' assert { type: 'json' };

// const onwarn = (warning, rollupWarn) => {
//   // Silence circular dependency warning for moment package
//   // if (
//   //   warning.code === 'CIRCULAR_DEPENDENCY'
//   //   && !warning.ids.indexOf(path.normalize('node_modules/hast-util-select/lib/'))
//   // ) {
//   //   return
//   // }

//   console.warn(`Circular dependency: ${warning.message}`);
// }

export default [
  {
    input: 'src/index.ts',
    // onwarn,
    output: [
      {
        file: pkg.unpkg,
        format: 'umd',
        exports: 'named',
        name: 'markdown',
        banner: multibanner(),
        sourcemap: true,
      },
    ],
    plugins: [
      json(),
      nodeResolve({
        browser: true,
      }),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          outDir: 'dist',
          declarationDir: '.',
        },
      }),
      commonjs(),
    ],
  },
  {
    input: 'src/index.ts',
    // onwarn,
    output: [
      {
        file: pkg.unpkg.replace(/.js$/, '.min.js'),
        format: 'umd',
        exports: 'named',
        name: 'markdown',
        banner: onebanner(),
        sourcemap: true,
      },
    ],
    plugins: [
      json(),
      nodeResolve({
        browser: true,
      }),
      typescript({
        tsconfig: './tsconfig.json',
        compilerOptions: {
          outDir: 'dist',
          declarationDir: '.',
        },
      }),
      terser({}),
      commonjs(),
    ],
  },
];
