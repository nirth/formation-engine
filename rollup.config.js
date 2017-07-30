
export default {
  entry: 'src/index.js',
  format: 'cjs',
  dest: './lib/lib.js',
  external: [
    'ramda',
  ],
}
