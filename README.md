# GOV.UK Frontend build tool spike

A comparison of different build tool/task runner pipelines and how they might be used on [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend).

Each build tool is expected to complete four tasks:

- Bundling and minifying `all.js`.
- Compiling `all.scss` into CSS, minifying it, and running it through Autoprefixer.
- Compiling `all-ie8.scss` into CSS, minifying it, and running it through Autoprefixer and Oldie.
- Copying the `assets` directory (containing images and font files) to a new location, whilst maintaining the existing directory structure. 

Each build tool should achieve all four tasks when `npm run build` is ran in its respective directory.

> Note that Sass compilation is tested using Dart Sass, instead of Node Sass as GOV.UK Frontend currently uses.

## Build tools tested

- [x] Gulp
- [ ] Parcel
- [x] (Vanilla JS) Node scripts
- [x] (Vanilla JS) npm scripts
- [ ] Webpack

This list is incomplete, as other tools may still be considered.

## Comparisons

| |Gulp|Parcel|Node scripts|npm scripts|Webpack|
|Avg. build time||||||
|No. of dependencies needed to complete tasks||||||
|Ease of customisation||||||
|Ecosystem activity||||||
|Other notes||||||

## Kim's opinions

### Gulp

- Familiar to most of us and much of the wider web dev community.
- Frequently requires additional dependencies to make tools work within Gulp. Occasional need to jury-rig something into it leads to messy code.

### Parcel

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

### Webpack

- Generally quite widely adopted. 
- Extremely robust logging and error handling.
- Personally found the first-party documentation lacking and third-party documentation frequently out of date/incompatible with present Webpack version. 
- "Configuration over code" approach doesn't fit our play-style very well. We currently have instances where we want to do some things differently in different situations, and making Webpack accommodate those is very difficult.
- Difficult to know what's actually happening—a bit of a black box.
- Doing pretty much anything needs an additional loader dependency.
- Clearly oriented towards JS libraries and SPAs where CSS is included or imported via JavaScript.