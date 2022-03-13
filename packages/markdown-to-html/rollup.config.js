import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import banner from 'bannerjs';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        name: 'markdown',
        exports: 'auto',
        banner: banner.multibanner(),
        sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'es',
        name: 'markdown',
        banner: banner.multibanner(),
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
      }),
      commonjs(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.unpkg,
        format: 'umd',
        // format: 'iife',
        name: 'markdown',
        banner: banner.multibanner(),
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
        // format: 'iife',
        name: 'markdown',
        banner: banner.onebanner(),
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
      }),
      terser({}),
      commonjs(),
    ],
  },
];
