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
- [x] Vanilla (Node build scripts)
- [x] Vanilla (npm scripts)
- [ ] Webpack

This list is incomplete, as other tools may still be considered.