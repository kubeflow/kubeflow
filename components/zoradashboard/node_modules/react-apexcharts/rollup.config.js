import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify'

let pluginOptions = [
  resolve({
    browser: true
  }),
  babel({
    exclude: 'node_modules/**'
  }),
  uglify()
];

module.exports = {
  input: './src/react-apexcharts.jsx',
  output: [{
    name: 'ReactApexChart', 
    file: 'dist/react-apexcharts.iife.min.js',
    format: 'iife',
    globals: {
      react: "React",
      apexcharts: "ApexCharts",
      'prop-types': "PropTypes"
    }
  }],
  external: ['react', 'apexcharts', 'prop-types'],
  plugins: pluginOptions
}