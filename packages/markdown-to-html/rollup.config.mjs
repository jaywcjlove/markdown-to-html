import path from 'path';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import sizes from 'rollup-plugin-sizes';
import json from '@rollup/plugin-json';
import { multibanner, onebanner } from 'bannerjs';
// import pkg from './package.json' assert { type: 'json' };

import fs from 'fs';
const pkg = JSON.parse(fs.readFileSync(path.resolve('./package.json'), 'utf8'));

const onwarn = (warning, rollupWarn) => {
  // 忽略来自第三方库的 "this" 重写警告
  if (warning.code === 'THIS_IS_UNDEFINED') {
    return;
  }

  // 忽略特定的循环依赖警告
  if (
    warning.code === 'CIRCULAR_DEPENDENCY' &&
    warning.ids.some(id => id.includes('node_modules/hast-util-select/lib/'))
  ) {
    return;
  }

  // 忽略来自 css-selector-parser 的 this 警告
  if (
    warning.code === 'THIS_IS_UNDEFINED' &&
    warning.loc &&
    warning.loc.file &&
    warning.loc.file.includes('css-selector-parser')
  ) {
    return;
  }

  // 显示其他警告
  rollupWarn(warning);
}

export default [
  {
    input: 'src/index.ts',
    onwarn,
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
          declarationDir: 'dist',
        },
      }),
      commonjs({
        transformMixedEsModules: true,
        ignoreTryCatch: false,
      }),
    ],
  },
  {
    input: 'src/index.ts',
    onwarn,
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
          declarationDir: 'dist',
        },
      }),
      terser({}),
      commonjs({
        transformMixedEsModules: true,
        ignoreTryCatch: false,
      }),
    ],
  },
];
