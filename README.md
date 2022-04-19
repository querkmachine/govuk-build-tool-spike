# GOV.UK Frontend build tool spike

A comparison of different build tool/task runner pipelines and how they might be used on [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend).

Each build tool is expected to complete four tasks:

- Bundling and minifying `all.js`.
- Compiling `all.scss` into CSS, minifying it, and running it through Autoprefixer.
- Compiling `all-ie8.scss` into CSS, minifying it, and running it through Autoprefixer and Oldie.
- Copying the `assets` directory (containing images and font files) to a new location, whilst maintaining the existing directory structure. 

Each build tool should achieve all four tasks when `npm run build` is ran in its respective directory.

> Note that Sass compilation is tested using Dart Sass, instead of Node Sass as GOV.UK Frontend currently uses.

## Build tools considered

- [Gulp](https://gulpjs.com/) 4
- (Vanilla JS) [Node scripts](https://nodejs.org/en/)
- (Vanilla JS) [npm scripts](https://docs.npmjs.com/cli/v6/using-npm/scripts)
- [Webpack](https://webpack.js.org/) 5

### Still need investigation

- [Snowpack](https://www.snowpack.dev/) 3
- [Vite](https://vitejs.dev/) 2 
- [wmr](https://wmr.dev/) 3

### Tools not in consideration

These tools were looked into, but a spike into how they work was either not attempted or was abandoned early in the attempt. 

- [esbuild](https://esbuild.github.io) 0 — Too immature. Would prefer something with more stability. 
- [Parcel](https://parceljs.org) 2 — Parcel does not seem compatible with Frontend's existing CSS/JS architecture. 

These lists are incomplete, as other tools may still be considered.

## Comparisons

|                     |Gulp |Node |npm |Webpack |
|:--------------------|:----|:----|:---|:-------|
|Could complete tasks |✔    |✔    |✔   |✘ (2/4) |
|Avg. build time      |-|-|-|-|
|№ of dependencies    |484  |170  |341 |320     |
|MBs of deps. used    |70.0 |71.1 |82.1|79.8    |
|Usage                |1,259,955|-|-|20,995,333|
|Last release         |2019-05-06|-|-|2022-04-07|

- Average build time is a mean aveage of three runs (lower is better). 
- Number of dependencies needed measured by number of entries in `package-lock.json` file (lower is better). 
- MBs of dependencies measured by total size of `node_modules` folder (lower is better).
- Usage measured by number of downloads in last week (higher is better).

## Kim's opinions

### esbuild

- Immature. Support for plugins (including Sass compilation) is still experimental.
- Documentation feels like it could be better.

### Gulp

- Familiar to most of us and much of the wider web dev community.
- Frequently requires additional dependencies to make tools work within Gulp. Occasional need to jury-rig something into it leads to messy code.

### Parcel

- Oriented towards webapps with dynamic tree-shaking, bundling, etc. Not sure if/how the given tasks could be completed without modifying source files or defining new entry files. 
- Seemingly only works with a HTML or JS entry file (as is more common with SPAs).
- Requires "transformer" dependencies for everything not HTML/CSS/JS. 
- "Zero configuration" approach seems pretty much incompatible with how we operate.

### Node scripts

- Mostly familiar to front-end devs, barring elements specific to Node JS (e.g. file handling).
- The most unrestricted option available. If JavaScript can do it, we can make it happen.
- Lack of any rigid framework could lead to inconsistent development approaches.
- You get nothing for free. Error handling, file I/O, etc. all have to be programmed manually. 

### npm scripts

- Starts getting very repetitive very quickly.
- Seemingly little to no advantages over using Node scripts, unless doing something very simple. 
- Having scripts bundled in package.json file is harder to read/manage than separate files. 
- Dependent upon each platforms command lines, which are all different, may have been customised by user, etc. No guarantee they'll work consistently without extra work or dependencies to bridge the gaps. 

### Vite

- Very similar to Parcel in style. 

### Webpack

- Generally quite widely adopted. 
- Extremely robust logging and error handling.
- Personally found the first-party documentation lacking and third-party documentation frequently out of date/incompatible with present Webpack version. 
- "Configuration over code" approach doesn't fit our play-style very well. We currently have instances where we want to do some things differently in different situations, and making Webpack accommodate those is very difficult.
- Difficult to know what's actually happening—a bit of a black box.
- Doing pretty much anything needs an additional loader dependency.
- Clearly oriented towards JS libraries and SPAs where CSS is included or imported via JavaScript.