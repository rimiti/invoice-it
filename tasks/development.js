import gulp from 'gulp'
import babel from 'gulp-babel'
import sourcemaps from 'gulp-sourcemaps'
import path from 'path'
import del from 'del'
import {spawn} from 'child_process'
import mocha from 'gulp-mocha'
import gutil from 'gulp-util'
import istanbul from 'gulp-istanbul'
import {Instrumenter} from 'isparta'

const paths = {
  js: {
    src: 'src/**/*.js',
    dist: 'dist/'
  },
  test: {
    src: 'test/**/*.js',
    dist: 'dist/test/',
    run: 'dist/test/**/*.js'
  },
  sourceRoot: path.resolve('src')
}

/**
 * @description Clean test compiled files & sourcemaps
 * @ gulp babel:test
 */
gulp.task('babel:test', ['babel:src', 'clean:test'], () =>
  gulp.src(paths.test.src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.', {sourceRoot: paths.sourceRoot}))
    .pipe(gulp.dest(paths.test.dist))
)

/**
 * @description Compile es6 files to es5 and put them in dist directory
 * @example gulp babel:src
 */
gulp.task('babel:src', ['clean:dist'], () =>
  gulp.src(paths.js.src)
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.', {sourceRoot: paths.sourceRoot}))
    .pipe(gulp.dest(paths.js.dist))
)

/**
 * @description Compile all es6 files to es5 and put them in dist directories
 * @example gulp babel
 */
gulp.task('babel', ['babel:src', 'babel:test'])

/**
 * @description Cleans compiled test files
 * @example gulp clean:test
 **/
gulp.task('clean:test', () => del(paths.test.dist))

/**
 * @description Cleans dist directory
 * @example gulp clean:dist
 * */
gulp.task('clean:dist', [], () => del(paths.js.dist))

/**
 * @description Cleans all compiled files
 * @example gulp clean
 */
gulp.task('clean', ['clean:dist', 'clean:test'])

/**
 *$ gulp mocha
 * description: runs unit tests
 * */
gulp.task('mocha', ['pre-test', 'babel:test'], () => {
  return gulp.src([paths.test.run], {read: false})
    .pipe(mocha({reporter: 'spec'}))
    // Creating the reports after tests ran
    // .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 90%
    // .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
    .on('error', gutil.log)
})

gulp.task('pre-test', () => {
  return gulp.src(['src/**/*.js'])
    .pipe(istanbul({
      instrumenter: Instrumenter,
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire())
})

/**
 * @description Watches change in working files
 * @example gulp watch
 */
gulp.task('watch', () => {
  gulp.watch(paths.js.src, ['babel:src'])
  gulp.watch(paths.test.src, ['babel:test'])
})

gulp.task('watch:mocha', () => {
  gulp.watch(paths.test.src, ['mocha'])
})

/**
 * @description Start the development environment
 * @example gulp
 */
gulp.task('default', ['babel', 'mocha'])
