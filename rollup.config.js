// see https://github.com/rozek/build-configuration-study

import commonjs   from '@rollup/plugin-commonjs'
import resolve    from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser'

export default {
  input:    './src/yjs-bundle.ts',
  output: [
    { 
      file:      './dist/yjs-bundle.umd.js',
      format:    'umd', // builds for both Node.js and Browser
      name:      'yjs', // required for UMD modules
      noConflict:true,
      sourcemap: true,
    },{
      file:      './dist/yjs-bundle.esm.js',
      format:    'esm',
      sourcemap: true,
    }
  ],
  plugins: [
    resolve(), commonjs(), typescript(),
    terser({ format:{ comments:false, safari10:true } })
  ],
};
