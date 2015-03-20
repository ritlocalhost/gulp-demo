// create a variable for each module you need like this
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var jshint = require('gulp-jshint')

// tasks are defined like this
// the first parameter is the name of the task, followed by a function that defines what the task does
gulp.task('css', function() {
  // the src method reads files matching a certain pattern or regular expression
  gulp.src('*.css')
  // .pipe passes the results from the previous task to the next one
  // concat is a module that combines files, so here we are combining all css files into one
  // css file called all.css
  .pipe(concat('all.css'))
  // now we minify the css using the gulp-minify-css module
  .pipe(minifyCSS())
  // .dest is a method that writes the results to a directory
  // here, we're writing our previously created file (all.css) to a css directory
  // so after it runs we'll have a file called all.css in a css directory
  .pipe(gulp.dest('css'))
});

// optionally, you can define dependencies as an array of task names before your function
// here, we have a task called js that will run our other task, jshint, before it runs
gulp.task('js', ['jshint'], function() {
  gulp.src(['*.js', '!gulpfile.js'])
  .pipe(concat('all.js'))
  // uglify is a javascript minifier / uglifier so we're combining and minifying our javascript
  // and making it less readable, which is useful for protecting your source code when you don't
  // want anyone to open up the dev tools and read it
  .pipe(uglify())
  .pipe(gulp.dest('js'))
});

gulp.task('jshint', function() {
    return gulp.src(['*.js', '!gulpfile.js'])
        // js hint is a javascript linter that helps enforces best practices and helps catch errors
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// watch is an awesome automated task that's really useful
// here, we define rules for watching css files and the tasks to run when they change
// so when you run 'gulp watch', the css task will run everytime you save a change to a css file
gulp.task('watch', function() {
  gulp.watch('*.css', ['css']);
})

// the default task runs when you simply type "gulp" as your command
gulp.task('default', ['css', 'js']);
