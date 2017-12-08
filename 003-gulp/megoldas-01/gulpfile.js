const gulp = require('gulp');
const {Writable} = require('stream');
const util = require('util');

class Counter extends Writable {
    constructor() {
	super({
		objectMode: true,
	});
	this.count = 0;
    }
    _write(chunk, encoding, callback) {
	console.log('**************************************************');
	console.log('length:', chunk.contents.length,
		    'chunk:', util.inspect(
			chunk, {showHidden: true, customInspect: false}));
	this.count += chunk.contents.length;
	callback();
    }
    _final(callback) {
	console.log('**************************************************');
	console.log('total number of characters: ', this.count);
	console.log('**************************************************');
    }
}

gulp.task('default', () => {
    gulp.src('*.ts')
	.pipe(new Counter())
})

gulp.watch('*.ts', ['default']);
