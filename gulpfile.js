const gulp = require('gulp');

gulp.task('copy:assets', () => gulp.src(['src/assets/**']).pipe(gulp.dest('core/assets')));
