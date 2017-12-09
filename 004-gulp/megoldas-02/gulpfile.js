const gulp = require('gulp');
const util = require('util');
const {Writable} = require('stream');

class Loggolo extends Writable {
    constructor() {
	super({
		objectMode: true,
	});
    }
    _write(chunk, encoding, callback) {
	console.info('chunk:',
		     util.inspect(chunk,
				  {
				      customInspect: false,
				      showHidden: true,
				      depth: null,
				      colors: true,
				  }));
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

