import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import { multibanner, onebanner } from 'bannerjs';
import pkg from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/index.ts',
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
