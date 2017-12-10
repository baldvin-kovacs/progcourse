const gulp = require('gulp');
const {Writable} = require('stream');

class Loggolo extends Writable {
    constructor() {
	super({
		objectMode: true,
	});
	this.total = 0;
    }
    _write(chunk, encoding, callback) {
	console.log(chunk);
	this.total += chunk.contents.length;
	callback();
    }
    _final(callback) {
	console.log("a ts fájlok összmérete: ", this.total);
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

