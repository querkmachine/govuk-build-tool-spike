const paths = require("../paths.json")
const { src, dest, parallel } = require('gulp')

const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const oldie = require('oldie')
// const postcsspseudoclasses = require('postcss-pseudo-classes')({
//   // Work around a bug in pseudo classes plugin that badly transforms
//   // :not(:whatever) pseudo selectors
//   blacklist: [':not(', ':disabled)', ':last-child)', ':focus)', ':active)', ':hover)']
// })

const rollup = require('gulp-better-rollup')
const uglify = require('gulp-uglify')

function jsCompile (cb) {
  src(paths.src + 'all.js')
  .pipe(rollup({
    name: 'GOVUKFrontend',
    format: 'umd'
  }))
  .pipe(uglify())
  .pipe(dest('./output/'))
  cb()
}

function scssCompile (cb) {
  src(paths.src + 'all.scss')
  .pipe(sass())
  .pipe(postcss([
    autoprefixer,
    cssnano
  ]))
  .pipe(dest('./output/'))
  cb()
}

function scssCompileOldIE (cb) {
  src(paths.src + 'all-ie8.scss')
  .pipe(sass())
  .pipe(postcss([
    autoprefixer,
    cssnano,
    oldie
  ]))
  .pipe(dest('output/'))
  cb()
}

function copyAssets (cb) {
  return src(paths.src + 'assets/**/*')
    .pipe(dest('./output/assets/'))
  cb()
}

exports.copyAssets = copyAssets
exports.scripts = jsCompile
exports.styles = parallel(scssCompile, scssCompileOldIE)
exports.default = parallel(copyAssets, jsCompile, scssCompile, scssCompileOldIE)