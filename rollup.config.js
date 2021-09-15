import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import vuePlugin from 'rollup-plugin-vue';
import eslint from '@rollup/plugin-eslint';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import analyzer from 'rollup-plugin-analyzer';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import multiInput from 'rollup-plugin-multi-input';
import nodeResolve from '@rollup/plugin-node-resolve';

import pkg from './package.json';

const name = 'fixed-table';
const externalDeps = Object.keys(pkg.dependencies);
const externalPeerDeps = Object.keys(pkg.peerDependencies);
const banner = `
/**
 * ${name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */
`;

const getPlugins = ({ env, isProd, analyze, vueOpt = { css: false } }) => {
  const plugins = [
    eslint({ include: 'src/**/*.js' }),
    nodeResolve(),
    commonjs(),
    vuePlugin(vueOpt),
    postcss({
      extract: `${isProd ? `${name}.min` : name}.css`,
      minimize: isProd,
      sourceMap: true,
      extensions: ['.sass', '.scss', '.css'],
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: [...DEFAULT_EXTENSIONS, '.vue', '.ts', '.tsx'],
    }),
    json(),
    url(),
  ];

  if (env) {
    plugins.push(replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(env),
      },
    }));
  }

  if (analyze) {
    plugins.push(analyzer({
      limit: 5,
      summaryOnly: true,
      ...analyze,
    }));
  }

  if (isProd) {
    plugins.push(terser({
      output: {
        ascii_only: true,
      },
    }));
  }

  return plugins;
};

const commonConfig = {
  multi: {
    input: ['src/**/*.js', '!src/**/*.test.js'],
    external: externalDeps.concat(externalPeerDeps),
    plugins: [multiInput()].concat(getPlugins({ isProd: false, vueOpt: { css: true } })),
    output: {
      banner,
      sourcemap: true,
    },
  },
  bundle: {
    input: 'src/index.js',
    external: externalPeerDeps,
    output: {
      name: 'TuaUI',
      banner,
      format: 'umd',
      exports: 'named',
      globals: { vue: 'Vue' },
      sourcemap: true,
    },
  },
};

export default [
  // esm
  {
    ...commonConfig.multi,
    output: {
      ...commonConfig.multi.output,
      dir: 'es/',
      format: 'esm',
    },
  },
  // cjs
  {
    ...commonConfig.multi,
    output: {
      ...commonConfig.multi.output,
      dir: 'lib/',
      format: 'cjs',
      exports: 'named',
    },
  },
  // umd
  {
    ...commonConfig.bundle,
    plugins: getPlugins({ isProd: false, env: 'development' }),
    output: {
      ...commonConfig.bundle.output,
      file: 'dist/TuaUI.umd.js',
    },
  },
  // umd.min
  {
    ...commonConfig.bundle,
    plugins: getPlugins({ isProd: true, env: 'production', analyze: true }),
    output: {
      ...commonConfig.bundle.output,
      file: 'dist/TuaUI.umd.min.js',
    },
  },
];
