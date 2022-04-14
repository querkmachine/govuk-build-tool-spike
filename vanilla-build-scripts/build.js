const paths = require("../paths.json")
const fs = require('fs')
const ncp = require('ncp').ncp

const sass = require('sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const oldie = require('oldie')

function jsCompile () {
  require('esbuild').build({
    entryPoints: [paths.src + 'all.js'],
    bundle: true,
    minify: true,
    outfile: './output/all.js'
  }).catch((e) => console.error(e.message)) 
}

function scssCompile () {
  // SCSS compile to CSS
  let result = sass.compile(paths.src + 'all.scss')
  // PostCSS processes
  postcss([autoprefixer, cssnano])
    .process(result.css, { from: paths.src + 'all.scss', to: './output/all.css' })
    .then(result => {
      fs.writeFile('./output/all.css', result.css, null, () => true)
    })
  // Minify
}

function scssCompileOldIE () {
  // SCSS compile to CSS
  let result = sass.compile(paths.src + 'all-ie8.scss')
  // PostCSS processes
  postcss([autoprefixer, cssnano, oldie])
    .process(result.css, { from: paths.src + 'all-ie8.scss', to: './output/all-ie8.css' })
    .then(result => {
      fs.writeFile('./output/all-ie8.css', result.css, null, () => true)
    })
}

function copyAssets () {
  ncp(paths.src + 'assets/', './output/assets/', (err) => {
    if(err) console.error(err)
  })
}

jsCompile()
scssCompile()
scssCompileOldIE()
copyAssets()