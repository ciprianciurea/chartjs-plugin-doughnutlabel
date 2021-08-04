import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from '@rollup/plugin-json';
// import { babel } from "@rollup/plugin-babel";
// import * as path from "path";
import pkg from "./package.json";

const dependencies = Object.keys(pkg.devDependencies);
const peerDependencies = Object.keys(pkg.peerDependencies);
const allDependencies = dependencies.concat(peerDependencies);

const name = 'ChartDoughnutLabel';

const banner = `
  /**
   * ${pkg.name} v${pkg.version}
   * @license
   * author: ${pkg.author}
   * ${name}.js v${pkg.version}
   * Released under the ${pkg.license} license.
   */
`;

const globals = {
  'chart.js': 'Chart',
  'chart.js/helpers': 'Chart.helpers',
};
allDependencies.push('chart.js/helpers');

export default [
  {
    input: 'src/index.js',
    output: {
      name: name,
      file: `dist/${pkg.name}.js`,
      banner,
      format: "umd",
      indent: false,
      globals,
      sourcemap: "inline"
    },
    plugins: [
      typescript(),
      commonjs({
        include: 'node_modules/**',
        extensions: ['.js', '.ts']
      }),
      json(),
      // babel({
      //   babelHelpers: "bundled",
      //   configFile: path.resolve(__dirname, ".babelrc.js"),
      // }),
      nodeResolve(),
    ],
    external: allDependencies,
  },
  {
    input: 'src/index.js',
    output: {
      name,
      file: `dist/${pkg.name}.min.js`,
      banner,
      format: 'umd',
      indent: false,
      globals
    },
    plugins: [
      typescript(),
      commonjs({
        include: 'node_modules/**',
      }),
      json(),
      nodeResolve(),
      terser({output: {comments: 'some'}})
    ],
    external: allDependencies
  },
  {
    input: 'src/index.esm.js',
    plugins: [
      json(),
      nodeResolve()
    ],
    output: {
      name,
      file: `dist/${pkg.name}.esm.js`,
      banner,
      format: 'esm',
      indent: false
    },
    external: allDependencies
  }
];
