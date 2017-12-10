const gulp = require('gulp');
const {Transform} = require('stream');

class Belyegzo extends Transform {
    constructor() {
	super({
		objectMode: true,
	});
	this.now = new Date();
    }
    _transform(chunk, encoding, callback) {
	console.log("processing ", chunk.path);
	chunk.contents = new Buffer("// date: " + this.now.toISOString() + "\n" + chunk.contents);
	this.push(chunk);
	callback();
    }
}

gulp.task('default', () => {
    gulp.src('lib/**/*.ts')
	.pipe(new Belyegzo())
        .pipe(gulp.dest('dist'));
});

gulp.watch('lib/**/*.ts', ['default']);

