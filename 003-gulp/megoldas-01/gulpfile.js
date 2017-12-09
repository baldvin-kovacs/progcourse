const gulp = require('gulp');
const {Writable} = require('stream');

class Loggolo extends Writable {
    constructor() {
	super({
		objectMode: true,
	});
    }
    _write(chunk, encoding, callback) {
	console.log(chunk);
	callback();
    }
}

function valamiSajatCucc() {
    return new Loggolo();
}

gulp.task('default', () => {
    gulp.src('*.ts')
	.pipe(valamiSajatCucc())
});

