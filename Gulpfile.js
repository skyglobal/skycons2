const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
const svgmin = require('gulp-svgmin');

const fontName = 'skycons2';

gulp.task('svgs', () => {
   return gulp.src(['src/svgs/*.svg'])
        .pipe(svgmin())
        .pipe(gulp.dest('build/svgs/'));
});

gulp.task('build', ['svgs'], () => {
    return gulp.src(['build/svgs/*.svg'])
        .pipe(iconfont({
            fontName: fontName,
            formats: ['ttf', 'eot', 'woff', 'svg'],
            fontHeight: 1001,
            normalize: true
        }))
        .on('glyphs', function(glyphs, options) {
            const model = {
                glyphs: glyphs,
                fontName: fontName,
                fontPath: '../fonts/',
                className: 'skycons2'
            };

            gulp.src('src/font.css')
                .pipe(consolidate('lodash', model))
                .pipe(gulp.dest('build/css/'));

            gulp.src('src/index.html')
                .pipe(consolidate('lodash', model))
                .pipe(gulp.dest('build/'));
        })
        .pipe(gulp.dest('build/fonts/'));
});