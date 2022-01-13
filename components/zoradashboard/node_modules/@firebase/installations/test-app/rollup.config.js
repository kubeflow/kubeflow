/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import typescriptPlugin from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { uglify } from 'rollup-plugin-uglify';
import typescript from 'typescript';

/**
 * Creates an iife build to run with the Test App.
 */
export default [
  {
    input: 'src/functions/index.ts',
    output: {
      name: 'FirebaseInstallations',
      file: 'test-app/sdk.js',
      format: 'iife',
      sourcemap: true
    },
    plugins: [
      typescriptPlugin({
        typescript,
        tsconfigOverride: { compilerOptions: { declaration: false } }
      }),
      json(),
      resolve(),
      commonjs(),
      uglify()
    ]
  }
];
