import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';

// import typescript from 'rollup-plugin-typescript2';

export function createRollupConfig(options, callback) {
  const name = options.name;
  const outputName = 'dist/' + [name, options.format, 'js'].join('.');

  const config = {
    input: options.input,
    output: {
      file: outputName,
      format: options.format,
      name: 'aha',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
      },
      exports: 'named',
    },
    plugins: [
      resolve({
        extensions: ['.js', 'jsx'],
      }),
      babel({
        babelHelpers: 'runtime',
        // skipPreflightCheck: true,
        exclude: '**/node_modules/**',
      }),
      commonjs(),

      external(),
      // typescript({
      //   tsconfig: options.tsconfig,
      //   clean: true,
      // }),

      sourcemaps(),
      options.format !== 'esm' &&
        terser({
          output: { comments: false },
          compress: {
            drop_console: true,
          },
        }),
    ].filter(Boolean),
  };

  return callback ? callback(config) : config;
}
