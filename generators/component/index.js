const gulp = require('gulp');
const replace = require('gulp-replace');
const rename = require('gulp-rename');
const utils = require("../utils");

module.exports = function createComponent({cwd = __dirname, name = ''}) {
    utils.log.info(`Creating angular component ${name}:`);

    const {camelCase, kebabCase, upperCasedCamelCase} = utils.getNames(name);

    gulp.src([`${__dirname}/**/*`, '!**/index.js'])
        .pipe(replace('<%= camel-case-name =>', camelCase))
        .pipe(replace('<%= upper-cased-camel-case-name =>', upperCasedCamelCase))
        .pipe(replace('<%= kebab-case-name =>', kebabCase))
        .pipe(rename((path) => {
            path.basename = path.basename.replace('kebab-case-name', kebabCase);
            utils.log.info(`    ${path.basename.padStart(4)}`);
        }))
        .pipe(gulp.dest(cwd))
};